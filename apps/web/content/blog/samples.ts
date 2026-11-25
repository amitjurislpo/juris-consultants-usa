/**
 * Illustrative sample articles shown on /blogs while the real blog is not connected.
 * On the live site /blogs is served from the existing blog (see BLOG_ORIGIN in
 * src/lib/links.ts), and these samples are not shown. General information only,
 * not legal or tax advice.
 */
export type SamplePost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readMinutes: number;
  /** Related service page, shown at the end of the article. */
  service: { label: string; href: string };
  sections: { heading: string; paragraphs: string[] }[];
};

export const SAMPLE_POSTS: SamplePost[] = [
  {
    slug: "llc-vs-c-corp-for-foreign-founders",
    title: "LLC or C-Corp: which should a founder outside the US choose?",
    summary:
      "The two most common structures for a first US company, and the questions that usually decide between them.",
    category: "Choosing a structure",
    readMinutes: 4,
    service: { label: "US LLC formation", href: "/services/llc-formation" },
    sections: [
      {
        heading: "Start with what you plan to do",
        paragraphs: [
          "Most founders outside the US end up choosing between an LLC and a C-Corp. Neither is better in every case. The right one depends on how you will earn money, whether you plan to raise investment, and how you want to be taxed.",
        ],
      },
      {
        heading: "When an LLC is common",
        paragraphs: [
          "An LLC is often chosen for consulting, e-commerce, agencies and other small operating businesses. It is simple to run and has fewer formal requirements than a corporation.",
          "A single-owner LLC owned by a non-US person is usually treated as a separate (disregarded) entity for income tax, but it still has US reporting duties, such as an annual information return. Missing these can lead to penalties, so plan for them from day one.",
        ],
      },
      {
        heading: "When a C-Corp is common",
        paragraphs: [
          "A C-Corp is the usual choice for startups that expect to issue shares and raise money from investors. It is taxed as its own entity and has a standard structure that investors are familiar with.",
        ],
      },
      {
        heading: "Before you decide",
        paragraphs: [
          "Tax treatment depends on your country of residence as well as US rules, so speak to a qualified tax professional before you commit. Our team can walk you through the options and the filings each one needs.",
        ],
      },
    ],
  },
  {
    slug: "what-is-an-ein-and-how-to-get-one",
    title: "What is an EIN, and how do non-US founders get one?",
    summary:
      "Why almost every US company needs an Employer Identification Number, and what to expect when you do not have a US Social Security Number.",
    category: "Tax & compliance",
    readMinutes: 3,
    service: {
      label: "EIN & tax registration",
      href: "/services/ein-tax-registration",
    },
    sections: [
      {
        heading: "What an EIN is",
        paragraphs: [
          "An Employer Identification Number (EIN) is a nine-digit number the US tax authority, the IRS, gives to a business. It works like a tax ID for your company.",
        ],
      },
      {
        heading: "Why you need one",
        paragraphs: [
          "You will normally need an EIN to open a US business bank account, file US tax returns, hire people, and set up many payment and marketplace accounts.",
        ],
      },
      {
        heading: "Applying without an SSN",
        paragraphs: [
          "Founders who do not have a US Social Security Number can still get an EIN, but the process is usually done by submitting a form rather than through the instant online application. Timing can vary and may take several weeks, so apply early if a bank or platform is waiting on it.",
          "Details in the application, such as the company name and the responsible party, must match your formation documents. Mistakes are a common cause of delay.",
        ],
      },
    ],
  },
  {
    slug: "what-does-a-registered-agent-do",
    title: "What does a registered agent do, and do you need one?",
    summary:
      "A short guide to the person or company that receives legal and state mail on behalf of your US company.",
    category: "Staying compliant",
    readMinutes: 3,
    service: {
      label: "Registered agent",
      href: "/services/registered-agent",
    },
    sections: [
      {
        heading: "The basics",
        paragraphs: [
          "Every US LLC and corporation must name a registered agent in the state where it is formed. The agent has a physical address in that state and receives official documents for your company.",
        ],
      },
      {
        heading: "What they receive",
        paragraphs: [
          "This includes legal notices, such as a lawsuit being served, and official letters from the state, such as annual report reminders. Missing them can put your company's good standing at risk.",
        ],
      },
      {
        heading: "Why founders outside the US use a service",
        paragraphs: [
          "The agent must be available at the address during business hours, which is hard to do from another country. A registered agent service keeps your documents safe, forwards them to you, and keeps your company's details on file with the state.",
        ],
      },
    ],
  },
];

export function getSamplePost(slug: string): SamplePost | undefined {
  return SAMPLE_POSTS.find((p) => p.slug === slug);
}
