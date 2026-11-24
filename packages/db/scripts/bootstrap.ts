/**
 * One command that gets an empty server ready, safe to run on every deploy:
 *
 *   1. creates the database named in DATABASE_URL if it does not exist yet
 *   2. creates / updates every table (`prisma migrate deploy`, uses prisma/migrations)
 *   3. seeds plans, add-ons, states and the first super admins, but only when the User table is
 *      empty (or when BOOTSTRAP_SEED=always)
 *
 * Needs: DATABASE_URL (the database to create, e.g. postgresql://user:pass@host:5432/juris_consultants_usa)
 * and, for the first run, SEED_SUPER_ADMINS (see prisma/seed.ts). The database user needs the
 * CREATEDB privilege. If it does not have it, create the empty database once by hand and run this
 * again: step 1 is skipped when the database already exists.
 *
 * Run: pnpm --filter @juris/db db:bootstrap
 */
import { PrismaClient } from "@prisma/client";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const packageDir = fileURLToPath(new URL("..", import.meta.url));

function run(command: string, args: string[]): void {
  const result = spawnSync(command, args, {
    cwd: packageDir,
    env: process.env,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} failed (exit ${result.status})`,
    );
  }
}

async function ensureDatabase(databaseUrl: string): Promise<void> {
  const url = new URL(databaseUrl);
  const name = decodeURIComponent(url.pathname.replace(/^\//, ""));
  if (!/^[A-Za-z0-9_]{1,63}$/.test(name)) {
    throw new Error(
      "The database name in DATABASE_URL may contain only letters, numbers and underscores.",
    );
  }

  // Connect to the server's built-in "postgres" database to create ours.
  const admin = new URL(databaseUrl);
  admin.pathname = "/postgres";
  const client = new PrismaClient({ datasourceUrl: admin.toString() });
  try {
    const rows = await client.$queryRawUnsafe<{ exists: boolean }[]>(
      "SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = $1) AS exists",
      name,
    );
    if (rows[0]?.exists) {
      console.log(`[bootstrap] database "${name}" already exists`);
      return;
    }
    await client.$executeRawUnsafe(`CREATE DATABASE "${name}"`);
    console.log(`[bootstrap] created database "${name}"`);
  } finally {
    await client.$disconnect();
  }
}

async function needsSeed(databaseUrl: string): Promise<boolean> {
  if (process.env.BOOTSTRAP_SEED === "always") return true;
  if (process.env.BOOTSTRAP_SEED === "never") return false;
  const client = new PrismaClient({ datasourceUrl: databaseUrl });
  try {
    return (await client.user.count()) === 0;
  } finally {
    await client.$disconnect();
  }
}

async function main(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl || !/^postgres(?:ql)?:\/\//i.test(databaseUrl)) {
    throw new Error("DATABASE_URL must be a PostgreSQL connection URL.");
  }

  await ensureDatabase(databaseUrl);

  console.log("[bootstrap] applying migrations");
  run("npx", ["prisma", "migrate", "deploy"]);

  if (await needsSeed(databaseUrl)) {
    console.log("[bootstrap] seeding catalog data and super admins");
    run("npx", ["tsx", "prisma/seed.ts"]);
  } else {
    console.log("[bootstrap] data already present, seed skipped");
  }
  console.log("[bootstrap] done");
}

main().catch((error: unknown) => {
  console.error(
    "[bootstrap] failed:",
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
});
