import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../../../components/marketing/PageIntro";
import { services } from "../../../components/marketing/content";

export const metadata: Metadata = {
  title: "Services | Juris Consultants USA",
  description:
    "Explore illustrative US company formation and business support services for founders worldwide.",
};

export default function ServicesPage() {
  return (
    <main className="subpage">
      <div className="page-container">
        <PageIntro
          description="Explore the services being planned for founders worldwide. Service descriptions and availability are illustrative and will be confirmed before launch."
          eyebrow="WHAT WE CAN HELP WITH"
          title="Support for every stage of your US business."
        />
        <div className="service-list-grid">
          {services.map((service, index) => (
            <Link
              className="service-card hover-card"
              href={`/services/${service.slug}`}
              key={service.slug}
            >
              <div className="service-card-top">
                <span className="service-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="service-icon" aria-hidden="true">
                  ↗
                </span>
              </div>
              <span className="service-group">{service.group}</span>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
              <span className="service-link">
                Explore service <b aria-hidden="true">↗</b>
              </span>
            </Link>
          ))}
        </div>
        <p className="small-note centered-note">
          All service details, availability, timelines, and pricing are
          illustrative placeholders pending confirmation.
        </p>
      </div>
    </main>
  );
}
