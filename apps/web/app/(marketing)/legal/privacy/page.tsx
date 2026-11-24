import type { Metadata } from "next";
import { LegalDoc } from "../../../../components/marketing/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy policy | Juris Consultants USA",
  description:
    "What information Juris Consultants USA collects, how we use it and how we protect it.",
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="LEGAL"
      intro="What we collect, why we collect it, and the choices you have."
      sections={[
        {
          heading: "Information we collect",
          body: (
            <ul>
              <li>Contact details: name, email, phone number and country.</li>
              <li>
                Company details you give us for formation and compliance, such
                as company name, owners and addresses.
              </li>
              <li>
                Identity (KYC) documents such as a passport and address proof.
              </li>
              <li>
                Order and payment records. Card numbers are entered with our
                payment provider and are not stored by us.
              </li>
              <li>
                Technical data such as device, browser and pages visited, and
                the messages you send us.
              </li>
            </ul>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <ul>
              <li>To form and manage your company and deliver your order.</li>
              <li>To verify identity and meet legal and bank requirements.</li>
              <li>To email you sign-in codes, receipts and order updates.</li>
              <li>To answer questions and give support.</li>
              <li>To improve our website and prevent misuse and fraud.</li>
            </ul>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <>
              <p>We share only what is needed to deliver your order, with:</p>
              <ul>
                <li>
                  State agencies, the IRS and registered agents who process your
                  filings.
                </li>
                <li>Banks, when you ask us to help open an account.</li>
                <li>
                  Service providers for hosting, file storage, email and
                  payments, who may only use data to serve us.
                </li>
                <li>Authorities, where the law requires it.</li>
              </ul>
              <p>We do not sell your personal information.</p>
            </>
          ),
        },
        {
          heading: "How we protect it",
          body: (
            <p>
              Your documents are stored privately and shared only through
              short-lived secure links. Access by our team is limited by role
              and recorded. No system is perfectly secure, but we work to
              protect your information and will tell you if a breach affects
              you.
            </p>
          ),
        },
        {
          heading: "Where your data is processed",
          body: (
            <p>
              Our team works from India and our filings are made in the United
              States, so your information may be processed in both countries and
              in the countries of our service providers.
            </p>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              We keep your information while you use our services and for as
              long as the law or our legitimate business needs require, for
              example for tax and company records. After that we delete or
              anonymise it.
            </p>
          ),
        },
        {
          heading: "Your choices and rights",
          body: (
            <p>
              You can ask to see, correct or delete your information, or to stop
              marketing emails, by writing to us. Some records must be kept by
              law, and we will tell you if so. Depending on where you live you
              may have more rights, which we will honour.
            </p>
          ),
        },
        {
          heading: "Cookies",
          body: (
            <p>
              We use cookies that are needed to keep you signed in and to make
              the site work. If we add analytics or advertising cookies, we will
              ask for your consent where the law requires it.
            </p>
          ),
        },
        {
          heading: "Changes to this policy",
          body: (
            <p>
              We may update this policy. The date at the top shows when it last
              changed. If a change is significant we will tell you.
            </p>
          ),
        },
      ]}
      title="Privacy policy"
      updated="24 November 2026"
    />
  );
}
