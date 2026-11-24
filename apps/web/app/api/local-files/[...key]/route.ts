import { serveLocalFile } from "@juris/core";

export const dynamic = "force-dynamic";

/** Test-only file server for the local storage folder. Needs a valid, unexpired signed link. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const url = new URL(request.url);
  return serveLocalFile(
    process.env,
    key,
    url.searchParams.get("e"),
    url.searchParams.get("s"),
  );
}
