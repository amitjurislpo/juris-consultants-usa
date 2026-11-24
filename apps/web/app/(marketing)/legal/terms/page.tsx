import type { Metadata } from "next";
import { LegalDoc } from "../../../../components/marketing/LegalDoc";

export const metadata: Metadata = {
  title: "Terms & Conditions | Juris Consultants USA",
  description:
    "The terms that apply when you use the Juris Consultants USA website and services.",
};

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="LEGAL"
      intro="Please read these terms before you place an order. By ordering or using this website you agree to them."
      sections={[
        {
          heading: "Who we are and what we do",
          body: (
            <p>
              Juris Consultants USA (“we”, “us”) helps founders around the world
              form and run companies in the United States. Our services include
              company formation, EIN and tax registration support, registered
              agent, virtual address and mailbox, bank account assistance,
              bookkeeping, compliance support and expert consultations. Our team
              works from India.
            </p>
          ),
        },
        {
          heading: "Not legal or tax advice",
          body: (
            <p>
              We provide administrative and advisory support. We are not a law
              firm and nothing on this website or in our calls is legal, tax or
              investment advice. Information on this site is general guidance.
              For advice on your own situation, speak to a qualified lawyer or
              tax professional.
            </p>
          ),
        },
        {
          heading: "Your account and information",
          body: (
            <ul>
              <li>
                You must give accurate, complete and current information and
                documents, including identity (KYC) documents.
              </li>
              <li>
                You are responsible for keeping your login email secure and for
                activity under your account.
              </li>
              <li>
                You must be allowed to own a company and must use it only for
                lawful business.
              </li>
            </ul>
          ),
        },
        {
          heading: "Prices, fees and payment",
          body: (
            <ul>
              <li>
                You see the total, in US dollars, before you pay. State and
                government fees are shown separately and are passed on at cost.
              </li>
              <li>
                Prices exclude any taxes that apply to you. Taxes, if any, are
                shown at checkout.
              </li>
              <li>
                An order starts after your payment is confirmed. Card details
                are handled by our payment provider and are never stored by us.
              </li>
              <li>
                Monthly and yearly services renew automatically until you
                cancel.
              </li>
            </ul>
          ),
        },
        {
          heading: "Timelines",
          body: (
            <p>
              Times such as “about 7 business days” are estimates. They depend
              on the state, the IRS and banks, and on how quickly you give us
              what we need. We do not control these authorities and cannot
              promise a specific date.
            </p>
          ),
        },
        {
          heading: "Refunds and the Money-Back Guarantee",
          body: (
            <p>
              Refunds, cancellations and our Money-Back Guarantee are explained
              in our <a href="/legal/refund">Refund policy</a>, which is part of
              these terms.
            </p>
          ),
        },
        {
          heading: "Third parties",
          body: (
            <p>
              Some services rely on third parties, such as state agencies, the
              IRS, registered agents, banks and payment providers. We are not
              responsible for their decisions, delays or charges. Opening a bank
              account is at the bank’s discretion.
            </p>
          ),
        },
        {
          heading: "Limits on our responsibility",
          body: (
            <p>
              To the extent the law allows, our total responsibility for any
              claim about an order is limited to the service fee you paid us for
              that order. We are not responsible for indirect or consequential
              losses, such as lost profits. Nothing here limits responsibility
              that cannot be limited by law.
            </p>
          ),
        },
        {
          heading: "Our website",
          body: (
            <p>
              The content, design and logo of this website belong to us or our
              licensors. You may not copy or reuse them without our written
              permission. Do not misuse the site, try to break its security, or
              upload harmful files.
            </p>
          ),
        },
        {
          heading: "Ending the relationship",
          body: (
            <p>
              You can stop using our services at any time, subject to the Refund
              policy. We may suspend or end an account if the information is
              false, if the use is unlawful, or if payment fails.
            </p>
          ),
        },
        {
          heading: "Changes, law and disputes",
          body: (
            <p>
              We may update these terms. The version shown on the date of your
              order applies to that order. These terms are governed by the laws
              of India, and the courts of New Delhi have jurisdiction, unless
              the law of your country gives you stronger rights that cannot be
              waived.
            </p>
          ),
        },
      ]}
      title="Terms & Conditions"
      updated="24 November 2026"
    />
  );
}
