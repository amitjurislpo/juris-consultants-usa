import { storageFromEnv } from "@juris/core";
import { prisma } from "@juris/db";
import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";

export const dynamic = "force-dynamic";

/** Sends the customer to a short-lived signed link for one of their own delivered documents. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth().catch(() => null);
  if (!session?.user?.id || session.user.role !== "CUSTOMER") {
    return NextResponse.redirect(
      new URL("/login?next=/account/documents", request.url),
    );
  }
  const { id } = await params;

  // Ownership check: the order must belong to the signed-in customer.
  const file = await prisma.deliverable.findFirst({
    where: { id, order: { userId: session.user.id } },
    select: { fileKey: true },
  });
  if (!file) return new NextResponse("Not found", { status: 404 });

  const storage = storageFromEnv(process.env);
  if (!storage) {
    return new NextResponse(
      "Downloads are not switched on for this test site yet. Please contact us for the file.",
      { status: 503 },
    );
  }
  const url = await storage.getSignedDownloadUrl(file.fileKey, 300);
  return NextResponse.redirect(new URL(url, request.url));
}
