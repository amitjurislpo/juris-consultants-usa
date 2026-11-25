import type { FaqItem } from "@juris/ui/faq";

/**
 * FAQ content used on Home, pricing, the services pages and /faq.
 * Editable here (or later in the CMS). `short` is the bold headline on the answer face.
 * Items marked `draft` have a new headline or wording that still has to be confirmed with Vansh;
 * the draft flag is not shown to visitors.
 */
export const generalFaqs: FaqItem[] = [
  {
    question: "Do I need to be a U.S. citizen to start a business?",
    short: "No visa or visit needed",
    answer:
      "No. Founders living anywhere in the world can own a US LLC or C-Corp. You don’t need to visit the US.",
    draft: true,
  },
  {
    question: "Which state should I choose as a founder outside the US?",
    short: "Wyoming or Delaware, usually",
    answer:
      "Most founders pick Wyoming or Delaware. Our experts help you choose based on your business and plans to raise money.",
    draft: true,
  },
  {
    question: "How long does it take?",
    short: "About 7 business days",
    answer:
      "Company formation takes about 7 business days. The EIN usually comes about 7 to 10 days after your company is formed. The official IRS EIN letter can take another 20 to 25 days to reach you.",
    draft: true,
  },
  {
    question: "Do you help with EIN and bank account setup?",
    short: "Yes, we help with both",
    answer:
      "Yes. EIN is included in Premium and available as an $80 add-on with Starter. Bank account assistance is $100.",
    draft: true,
  },
  {
    question: "What is your money-back guarantee?",
    short: "Terms and refund policy",
    answer:
      'The conditions of our money-back guarantee are set out in our <a href="/terms">Terms &amp; Conditions</a> and <a href="/refund">refund policy</a>.',
    draft: true,
  },
  {
    question: "Can I talk to someone before paying?",
    short: "Message us or call",
    answer: "Yes — message us or book a paid 30-minute expert call ($49).",
    draft: true,
  },
];

/** Extra questions that only appear on the /faq page. */
export const faqPageExtras: FaqItem[] = [
  {
    question: "Should I form an LLC or a C-Corporation?",
    short: "Depends on your plans",
    answer:
      "The choice depends on factors such as ownership, fundraising plans, and tax considerations. The comparison on this site is only a starting point, not legal or tax advice.",
    draft: true,
  },
  {
    question: "Can I start an order or log in?",
    short: "Yes, from the home page",
    answer:
      "Yes. Choose Start your business, Manage your business or Talk to an Expert on the home page, or log in from the top right to see your orders.",
    draft: true,
  },
];
