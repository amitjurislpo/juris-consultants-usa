"use server";

import { prisma } from "@juris/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isSupportedTimeZone } from "../../src/lib/datetime";
import { requireAdmin } from "../../src/lib/guard";
import { TIME_ZONE_COOKIE } from "../../src/lib/timezone";

export interface ProfileResult {
  error: string | null;
  notice?: string | null;
}

const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;

/** Picks the zone for the whole panel. `remember` also saves it as this admin's default. */
export async function setTimeZoneAction(
  timeZone: string,
  remember: boolean,
): Promise<ProfileResult> {
  const admin = await requireAdmin();
  if (!isSupportedTimeZone(timeZone)) return { error: "Unknown time zone." };

  (await cookies()).set(TIME_ZONE_COOKIE, timeZone, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Without `remember` this lasts until the browser is closed.
    ...(remember ? { maxAge: ONE_YEAR_SECONDS } : {}),
  });
  if (remember) {
    await prisma.user.update({
      where: { id: admin.id },
      data: { timezone: timeZone },
    });
  }
  revalidatePath("/", "layout");
  return { error: null };
}

const detailsForm = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100),
});

/** Admins can change only their display name here. Email and role stay locked. */
export async function updateMyDetailsAction(
  _previous: ProfileResult,
  formData: FormData,
): Promise<ProfileResult> {
  const admin = await requireAdmin();
  const parsed = detailsForm.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the name." };
  }
  await prisma.user.update({
    where: { id: admin.id },
    data: { name: parsed.data.name },
  });
  revalidatePath("/", "layout");
  return { error: null, notice: "Your details are saved." };
}

const AVATAR_PATTERN =
  /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/;
const AVATAR_MAX_CHARS = 200_000;

/** The browser shrinks the picture to 256x256 first, so it is small enough to keep in the database. */
export async function setAvatarAction(dataUrl: string): Promise<ProfileResult> {
  const admin = await requireAdmin();
  if (
    typeof dataUrl !== "string" ||
    dataUrl.length > AVATAR_MAX_CHARS ||
    !AVATAR_PATTERN.test(dataUrl)
  ) {
    return { error: "Use a JPG, PNG or WebP picture." };
  }
  await prisma.user.update({
    where: { id: admin.id },
    data: { image: dataUrl },
  });
  revalidatePath("/", "layout");
  return { error: null, notice: "Photo updated." };
}

export async function removeAvatarAction(): Promise<ProfileResult> {
  const admin = await requireAdmin();
  await prisma.user.update({ where: { id: admin.id }, data: { image: null } });
  revalidatePath("/", "layout");
  return { error: null, notice: "Photo removed." };
}
