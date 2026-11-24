import type { Metadata } from "next";
import { LegalDoc } from "../../../components/marketing/LegalDoc";

export const metadata: Metadata = {
  title: "Refund policy & Money-Back Guarantee | Juris Consultants USA",
  description:
    "How refunds work at Juris Consultants USA, including our Money-Back Guarantee.",
};

export default function RefundPage() {
  return (
    <LegalDoc
      eyebrow="LEGAL"
      intro="Our Money-Back Guarantee and how to ask for a refund."
      sections={[
        {
          heading: "Money-Back Guarantee",
          body: (
            <>
              <p>
                If your company is not formed because of a mistake made by Juris
                Consultants USA, we refund the service fee you paid us for that
                order in full.
              </p>
              <p>
                The guarantee covers our own service fee only. It applies when
                you gave us complete and correct information and documents and
                the problem was caused by our error, for example a filing we
                prepared or submitted incorrectly.
              </p>
            </>
          ),
        },
        {
          heading: "What is not refundable",
          body: (
            <ul>
              <li>
                State filing fees, IRS or other government fees and
                registered-agent fees already paid to third parties. These go to
                the government or the provider, not to us.
              </li>
              <li>
                Delays or rejections by a state, the IRS, a bank or another
                authority that are outside our control, including name conflicts
                and checks on the owner.
              </li>
              <li>
                Problems caused by incomplete, late or incorrect information or
                documents from you.
              </li>
              <li>
                A change of mind after we have submitted your filing to the
                state.
              </li>
            </ul>
          ),
        },
        {
          heading: "Cancelling an order",
          body: (
            <ul>
              <li>
                Before we start work on your order, you can cancel and get a
                full refund of the service fee.
              </li>
              <li>
                After we have submitted a filing, we cannot cancel it. Only the
                Money-Back Guarantee above applies.
              </li>
            </ul>
          ),
        },
        {
          heading: "Monthly and yearly services",
          body: (
            <p>
              Services billed monthly (such as virtual mailbox, physical office
              address and bookkeeping) can be cancelled at any time. The
              cancellation takes effect at the end of the period you have
              already paid for. We do not refund part of a period that has
              started.
            </p>
          ),
        },
        {
          heading: "Expert consultation",
          body: (
            <p>
              If we cancel your consultation or cannot attend, we refund the fee
              or offer a new time of your choice. If you miss the call without
              notice, the fee is not refunded. You can reschedule free of charge
              with at least 24 hours’ notice.
            </p>
          ),
        },
        {
          heading: "How to ask for a refund",
          body: (
            <p>
              Email us your order details and the reason. We reply within 2
              business days. Approved refunds go back to the original payment
              method within 7 to 10 business days, depending on your bank.
            </p>
          ),
        },
      ]}
      title="Refund policy"
      updated="24 November 2026"
    />
  );
}
