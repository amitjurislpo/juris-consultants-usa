export type Service = {
  slug: string;
  title: string;
  group: string;
  summary: string;
  audience: string;
  included: string[];
};

export const services: Service[] = [
  {
    slug: "llc-formation",
    title: "US LLC Formation",
    group: "Start",
    summary:
      "A clear path to forming a US limited liability company, with guidance on state selection and filing.",
    audience:
      "Independent founders, consultants, and growing businesses evaluating a US LLC.",
    included: [
      "Formation document preparation",
      "State filing coordination",
      "Registered agent setup guidance",
      "A checklist for your next steps",
    ],
  },
  {
    slug: "c-corp-formation",
    title: "US C-Corp Formation",
    group: "Start",
    summary:
      "Company formation support for founders considering a US C-Corporation.",
    audience:
      "Startups evaluating a corporate structure for future fundraising or share issuance.",
    included: [
      "Formation document preparation",
      "State filing coordination",
      "Corporate document checklist",
      "A checklist for your next steps",
    ],
  },
  {
    slug: "ein-tax-registration",
    title: "EIN & Tax Registration",
    group: "Start",
    summary:
      "Guidance on applying for an Employer Identification Number for your US company.",
    audience: "Newly formed companies and existing companies that need an EIN.",
    included: [
      "Application preparation guidance",
      "Filing process overview",
      "Document checklist",
      "Next-step guidance after submission",
    ],
  },
  {
    slug: "registered-agent",
    title: "Registered Agent",
    group: "Start",
    summary:
      "Help arranging a registered agent in the state where your company is formed.",
    audience:
      "Companies that need a registered agent in their formation state.",
    included: [
      "Registered agent service coordination",
      "Official notice handling overview",
      "Renewal and compliance reminders",
    ],
  },
  {
    slug: "bank-account-assistance",
    title: "Bank Account Assistance",
    group: "Run",
    summary:
      "Practical preparation and application guidance for a US business bank account.",
    audience: "Founders preparing to apply for a US business bank account.",
    included: [
      "Preparation checklist",
      "Application process guidance",
      "Document readiness review",
    ],
  },
  {
    slug: "virtual-address-mailbox",
    title: "Virtual Address & Mailbox",
    group: "Run",
    summary:
      "A virtual mailing address and mail-handling options for your business.",
    audience: "Businesses that need a US mailing address for correspondence.",
    included: [
      "Address options overview",
      "Mail scanning and forwarding guidance",
      "Service selection support",
    ],
  },
  {
    slug: "physical-office-address",
    title: "Physical Office Address",
    group: "Run",
    summary:
      "Explore physical office address options for your company's operational needs.",
    audience:
      "Businesses assessing whether a physical US office address fits their needs.",
    included: [
      "Location and service options overview",
      "Use-case discussion",
      "Setup guidance",
    ],
  },
  {
    slug: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    group: "Run",
    summary:
      "Ongoing bookkeeping support options for companies with US activity.",
    audience:
      "Companies organizing their financial records and reporting process.",
    included: [
      "Bookkeeping scope discussion",
      "Recordkeeping checklist",
      "Monthly support options overview",
    ],
  },
  {
    slug: "warehousing-fulfilment",
    title: "Warehousing & Fulfilment",
    group: "Grow",
    summary:
      "Discuss storage, order handling, and fulfilment needs for products sold in the US.",
    audience:
      "Product businesses exploring US warehousing and fulfilment options.",
    included: [
      "Needs assessment",
      "Fulfilment options discussion",
      "Operational readiness checklist",
    ],
  },
  {
    slug: "compliance-annual-filings",
    title: "Compliance & Annual Filings",
    group: "Grow",
    summary:
      "Understand recurring state filing and company compliance requirements.",
    audience: "Companies planning their recurring filing calendar.",
    included: [
      "Compliance calendar overview",
      "Annual filing preparation guidance",
      "Deadline reminder options",
    ],
  },
  {
    slug: "us-tax-filing",
    title: "US Tax Filing",
    group: "Grow",
    summary:
      "Discuss US tax filing support and the records that may be needed.",
    audience: "Companies preparing for applicable US tax filing obligations.",
    included: [
      "Initial requirements discussion",
      "Records checklist",
      "Filing support options overview",
    ],
  },
  {
    slug: "talk-to-an-expert",
    title: "Talk to an Expert",
    group: "Guidance",
    summary:
      "Get help thinking through your company structure, state, and next steps.",
    audience: "Founders who want guidance before choosing a service.",
    included: [
      "A focused discovery conversation",
      "Questions tailored to your situation",
      "A summary of possible next steps",
    ],
  },
];

export const faqs = [
  {
    question:
      "Can founders living outside the United States use these services?",
    answer:
      "The service is being designed for founders worldwide. Eligibility and requirements depend on the service and your circumstances; discuss your situation with an expert before proceeding.",
  },
  {
    question: "Which US state should I choose?",
    answer:
      "The right state depends on your plans, operations, and ongoing obligations. State availability and guidance on this site are illustrative; confirm the details before making a decision.",
  },
  {
    question: "Should I form an LLC or a C-Corporation?",
    answer:
      "The choice depends on factors such as ownership, fundraising plans, and tax considerations. The comparison on this site is only a starting point, not legal or tax advice.",
  },
  {
    question: "How long does company formation take?",
    answer:
      "Processing times vary by state and circumstances. Any timing shown on this preview is illustrative and will be confirmed before launch.",
  },
  {
    question: "Are the prices on this website final?",
    answer:
      "No. Pricing is still being confirmed. Any price shown on this preview is clearly marked as a placeholder and is not an offer to provide services.",
  },
  {
    question: "Can I start an order or log in?",
    answer:
      "Not yet. Order flows and login are not available in this preview. Their buttons lead to a Coming soon page.",
  },
];

export const blogPosts = [
  {
    slug: "choosing-a-state",
    category: "Company formation",
    title: "Choosing a US state for your company",
    excerpt:
      "A draft overview of questions founders can consider when comparing states.",
  },
  {
    slug: "ein-without-ssn",
    category: "EIN & tax registration",
    title: "Understanding the EIN application process",
    excerpt:
      "An illustrative introduction to the information companies may need to prepare.",
  },
  {
    slug: "formation-costs",
    category: "Planning",
    title: "Planning for the costs of a US company",
    excerpt:
      "A draft checklist of one-time and recurring costs to discuss with an advisor.",
  },
  {
    slug: "business-banking",
    category: "Business banking",
    title: "Preparing to explore US business banking",
    excerpt:
      "A draft guide to getting organized before researching account options.",
  },
];

export const placeholderNotice =
  "Preview content: copy and prices are illustrative placeholders and must be confirmed before launch.";
