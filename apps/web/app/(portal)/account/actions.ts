"use server";

import { prisma } from "@juris/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth, signOut } from "../../../auth";

export interface PortalResult {
  error: string | null;
  notice?: string | null;
}

/** The signed-in customer's id. Every query below uses this id, never one sent by the browser. */
async function customerId(): Promise<string | null> {
  const session = await auth().catch(() => null);
  if (!session?.user?.id || session.user.role !== "CUSTOMER") return null;
  return session.user.id;
}

const profileForm = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100),
  phone: z
    .string()
    .trim()
    .max(25)
    .regex(/^[0-9+()\-\s]*$/, "Use digits, spaces, + and - only.")
    .optional(),
  country: z.string().trim().max(60).optional(),
});

/** Customers can edit their name, phone and country. The email is the login and stays locked. */
export async function updateProfileAction(
  _previous: PortalResult,
  formData: FormData,
): Promise<PortalResult> {
  const id = await customerId();
  if (!id) return { error: "Please sign in again." };
  const parsed = profileForm.safeParse({
    name: formData.get("name") ?? "",
    phone: formData.get("phone") ?? "",
    country: formData.get("country") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details." };
  }
  await prisma.user.update({
    where: { id },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      country: parsed.data.country || null,
    },
  });
  revalidatePath("/account", "layout");
  return { error: null, notice: "Your details are saved." };
}

const AVATAR_PATTERN =
  /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/;

/** The browser shrinks the picture to 256x256 first, so it is small enough to keep in the database. */
export async function setAvatarAction(dataUrl: string): Promise<PortalResult> {
  const id = await customerId();
  if (!id) return { error: "Please sign in again." };
  if (
    typeof dataUrl !== "string" ||
    dataUrl.length > 200_000 ||
    !AVATAR_PATTERN.test(dataUrl)
  ) {
    return { error: "Use a JPG, PNG or WebP picture." };
  }
  await prisma.user.update({ where: { id }, data: { image: dataUrl } });
  revalidatePath("/account", "layout");
  return { error: null };
}

export async function removeAvatarAction(): Promise<PortalResult> {
  const id = await customerId();
  if (!id) return { error: "Please sign in again." };
  await prisma.user.update({ where: { id }, data: { image: null } });
  revalidatePath("/account", "layout");
  return { error: null };
}

export async function logOutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
