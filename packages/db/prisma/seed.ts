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

  // Launch prices from the approved website. They are only written while an item is still at
  // the old $0.00 placeholder, so prices edited later in admin Settings are never overwritten.
  const D = (value: string) => new Prisma.Decimal(value);
  const catalog = [
    {
      slug: "starter-llc",
      type: "PLAN",
      name: "Starter (LLC)",
      price: "249",
      billing: "ONE_TIME",
      sort: 10,
    },
    {
      slug: "premium-c-corp",
      type: "PLAN",
      name: "Premium (C-Corp)",
      price: "849",
      billing: "ONE_TIME",
      sort: 20,
    },
    {
      slug: "warehousing",
      type: "PLAN",
      name: "Warehousing (Fulfilment)",
      price: "49",
      billing: "ONE_TIME",
      sort: 25,
    },
    {
      slug: "ein",
      type: "ADDON",
      name: "EIN (US tax ID)",
      price: "80",
      billing: "ONE_TIME",
      sort: 40,
    },
    {
      slug: "virtual-bank",
      type: "ADDON",
      name: "Bank account assistance",
      price: "100",
      billing: "ONE_TIME",
      sort: 50,
    },
    {
      slug: "virtual-mailbox",
      type: "ADDON",
      name: "Virtual mailbox",
      price: "25",
      billing: "MONTHLY",
      sort: 60,
    },
    {
      slug: "bookkeeping",
      type: "ADDON",
      name: "Bookkeeping",
      price: "200",
      billing: "MONTHLY",
      sort: 70,
    },
    {
      slug: "office-address",
      type: "ADDON",
      name: "Physical office address",
      price: "200",
      billing: "MONTHLY",
      sort: 80,
    },
    {
      slug: "expert-call",
      type: "SERVICE",
      name: "Expert consultation (30 min)",
      price: "49",
      billing: "ONE_TIME",
      sort: 90,
    },
  ] as const;
  for (const item of catalog) {
    await prisma.catalogItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        type: item.type,
        slug: item.slug,
        name: item.name,
        priceUsd: D(item.price),
        billing: item.billing,
        active: true,
        sort: item.sort,
        warnings: [],
      },
    });
    await prisma.catalogItem.updateMany({
      where: { slug: item.slug, priceUsd: D("0.00") },
      data: {
        name: item.name,
        priceUsd: D(item.price),
        billing: item.billing,
        description: null,
      },
    });
  }

  // Not part of the approved price list yet (price unknown), so it is not sold.
  await prisma.catalogItem.upsert({
    where: { slug: "registered-agent" },
    update: {},
    create: {
      type: "ADDON",
      slug: "registered-agent",
      name: "Registered agent",
      description: "Price not decided yet",
      priceUsd: D("0.00"),
      billing: "ONE_TIME",
      mandatory: false,
      active: false,
      sort: 30,
      warnings: [],
    },
  });
  await prisma.catalogItem.upsert({
    where: { slug: "boir" },
    update: {},
    create: {
      type: "ADDON",
      slug: "boir",
      name: "BOIR",
      description: "Inactive add-on; legal review pending",
      priceUsd: D("0.00"),
      billing: "ONE_TIME",
      active: false,
      sort: 100,
      warnings: [
        "US-formed companies are exempt since Mar 2025; legal confirmation pending",
      ],
    },
  });

  // State filing fees from the approved website. Same rule: only replaces a $0.00 placeholder.
  const stateFees = [
    ["WYOMING", "103.75", false],
    ["TEXAS", "310", true],
    ["DELAWARE", "90", false],
    ["FLORIDA", "125", false],
    ["NEVADA", "425", false],
    ["NEW_YORK", "200", false],
    ["CALIFORNIA", "70", false],
    ["NEW_MEXICO", "50", false],
    ["WASHINGTON", "200", false],
  ] as const;
  for (const [state, fee, premiumAvailable] of stateFees) {
    await prisma.stateFee.upsert({
      where: { state },
      update: {},
      create: { state, feeUsd: D(fee), active: true, premiumAvailable },
    });
    await prisma.stateFee.updateMany({
      where: { state, feeUsd: D("0.00") },
      data: { feeUsd: D(fee), notes: null },
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

  console.log("Seeded database configuration.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
