import bcrypt from "bcryptjs";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl)
    throw new Error("Missing required seed environment variable: DATABASE_URL");
  if (!/^postgres(?:ql)?:\/\//i.test(databaseUrl)) {
    throw new Error("DATABASE_URL must be a PostgreSQL connection URL");
  }

  // SEED_SUPER_ADMINS is JSON: [{"email":"a@x.com","name":"A","password":"..."}].
  // Passwords are stored only as bcrypt hashes. Admins sign in with a code emailed to them.
  const rawAdmins = process.env.SEED_SUPER_ADMINS?.trim();
  if (!rawAdmins)
    throw new Error(
      "Missing required seed environment variable: SEED_SUPER_ADMINS",
    );
  const admins = JSON.parse(rawAdmins) as {
    email: string;
    name?: string;
    password: string;
  }[];
  for (const admin of admins) {
    const email = admin.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error(`Invalid super admin email: ${admin.email}`);
    }
    if (admin.password.length < 12) {
      throw new Error(`Password for ${email} must be at least 12 characters`);
    }
    const passwordHash = await bcrypt.hash(admin.password, 12);
    await prisma.user.upsert({
      where: { email },
      update: { role: "SUPER_ADMIN", status: "ACTIVE", passwordHash },
      create: {
        email,
        name: admin.name?.trim() || "Super Admin",
        role: "SUPER_ADMIN",
        status: "ACTIVE",
        passwordHash,
      },
    });
  }

  // PLACEHOLDER: final prices have not been agreed. All monetary values remain $0.00
  // until they are entered in the admin settings.
  const placeholderPrice = new Prisma.Decimal("0.00");

  await prisma.catalogItem.upsert({
    where: { slug: "starter-llc" },
    update: {},
    create: {
      type: "PLAN",
      slug: "starter-llc",
      name: "Starter LLC — PLACEHOLDER",
      description: "PLACEHOLDER plan price",
      priceUsd: placeholderPrice,
      billing: "ONE_TIME",
      active: true,
      sort: 10,
      warnings: [],
    },
  });

  await prisma.catalogItem.upsert({
    where: { slug: "premium-c-corp" },
    update: {},
    create: {
      type: "PLAN",
      slug: "premium-c-corp",
      name: "Premium C-Corp — PLACEHOLDER",
      description: "PLACEHOLDER plan price",
      priceUsd: placeholderPrice,
      billing: "ONE_TIME",
      active: true,
      sort: 20,
      warnings: [],
    },
  });

  await prisma.catalogItem.upsert({
    where: { slug: "registered-agent" },
    update: {},
    create: {
      type: "ADDON",
      slug: "registered-agent",
      name: "Registered agent — PLACEHOLDER",
      description: "Mandatory on every formation order",
      priceUsd: placeholderPrice,
      billing: "ONE_TIME",
      mandatory: true,
      active: true,
      sort: 30,
      warnings: [],
    },
  });

  await prisma.catalogItem.upsert({
    where: { slug: "ein" },
    update: {},
    create: {
      type: "ADDON",
      slug: "ein",
      name: "EIN — PLACEHOLDER",
      description: "PLACEHOLDER add-on price",
      priceUsd: placeholderPrice,
      billing: "ONE_TIME",
      active: true,
      sort: 40,
      warnings: ["EIN processing warning to be confirmed"],
    },
  });

  await prisma.catalogItem.upsert({
    where: { slug: "virtual-bank" },
    update: {},
    create: {
      type: "ADDON",
      slug: "virtual-bank",
      name: "Virtual bank — PLACEHOLDER",
      description: "PLACEHOLDER add-on price",
      priceUsd: placeholderPrice,
      billing: "ONE_TIME",
      active: true,
      sort: 50,
      warnings: ["Virtual bank warning to be confirmed"],
    },
  });

  await prisma.catalogItem.upsert({
    where: { slug: "boir" },
    update: {},
    create: {
      type: "ADDON",
      slug: "boir",
      name: "BOIR — PLACEHOLDER",
      description: "Inactive add-on; legal review pending",
      priceUsd: placeholderPrice,
      billing: "ONE_TIME",
      mandatory: false,
      active: false,
      sort: 60,
      warnings: [
        "US-formed companies are exempt since Mar 2025; legal confirmation pending",
      ],
    },
  });

  const stateFees = [
    ["TEXAS", true],
    ["CALIFORNIA", false],
    ["WYOMING", false],
    ["DELAWARE", false],
    ["FLORIDA", false],
    ["NEW_YORK", false],
  ] as const;

  for (const [state, premiumAvailable] of stateFees) {
    await prisma.stateFee.upsert({
      where: { state },
      update: {},
      create: {
        state,
        feeUsd: placeholderPrice,
        active: true,
        premiumAvailable,
        notes: "PLACEHOLDER state fee",
      },
    });
  }

  await prisma.businessType.upsert({
    where: { label: "PLACEHOLDER business type" },
    update: {},
    create: { label: "PLACEHOLDER business type", active: false, sort: 0 },
  });

  await prisma.kycRequirement.upsert({
    where: { appliesTo_docType: { appliesTo: "OWNER", docType: "PASSPORT" } },
    update: {},
    create: {
      appliesTo: "OWNER",
      docType: "PASSPORT",
      label: "Passport",
      active: true,
    },
  });
  await prisma.kycRequirement.upsert({
    where: {
      appliesTo_docType: { appliesTo: "OWNER", docType: "ADDRESS_PROOF" },
    },
    update: {},
    create: {
      appliesTo: "OWNER",
      docType: "ADDRESS_PROOF",
      label: "Address proof",
      active: true,
    },
  });

  const notSureOption = ["Not sure"];
  const questions = [
    ["Product", "Exporting now?", "BOOLEAN", 10],
    ["Product", "Product", "TEXT", 20],
    ["Product", "HSN code", "TEXT", 30],
    ["Product", "Units per shipment", "NUMBER", 40],
    ["Packing", "Palletised?", "BOOLEAN", 10],
    ["Packing", "Pallet count", "NUMBER", 20],
    ["Packing", "Box size (cm)", "TEXT", 30],
    ["Packing", "Weight per box", "NUMBER", 40],
    ["Packing", "Units per box", "NUMBER", 50],
    ["Packing", "Total weight", "NUMBER", 60],
    ["Operations", "Order frequency", "TEXT", 10],
    ["Operations", "Returns", "TEXT", 20],
    ["Operations", "Logistics partner", "TEXT", 30],
    ["Operations", "Start date", "DATE", 40],
  ] as const;

  for (const [group, label, inputType, sort] of questions) {
    await prisma.intakeQuestion.upsert({
      where: { group_label: { group, label } },
      update: {},
      create: {
        group,
        label,
        inputType,
        options: notSureOption,
        active: true,
        sort,
      },
    });
  }

  await prisma.setting.upsert({
    where: { key: "boir.enabled" },
    update: {},
    create: { key: "boir.enabled", value: false },
  });
  await prisma.setting.upsert({
    where: { key: "home.headline" },
    update: {},
    create: {
      key: "home.headline",
      value: "Your US company, from anywhere in the world.",
    },
  });
  await prisma.setting.upsert({
    where: { key: "home.subline" },
    update: {},
    create: {
      key: "home.subline",
      value:
        "Formation, EIN, bank account and compliance, handled end to end by our CA/CS-led expert team. Talk to us on WhatsApp or email, wherever you are.",
    },
  });
  await prisma.setting.upsert({
    where: { key: "home.badge" },
    update: {},
    create: {
      key: "home.badge",
      value: "Forming US companies for founders worldwide",
    },
  });

  console.log("Seeded database configuration with PLACEHOLDER prices.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
