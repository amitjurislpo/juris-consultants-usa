import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "../../../../components/marketing/PageIntro";
import { services } from "../../../../components/marketing/content";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: "Service not found | Juris Consultants USA" };
  return {
    title: `${service.title} | Juris Consultants USA`,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <main className="subpage service-detail">
      <div className="page-container">
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/services">Services</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{service.title}</span>
        </nav>
        <PageIntro
          description={service.summary}
          eyebrow={`${service.group.toUpperCase()} · SERVICE OVERVIEW`}
          title={service.title}
        />
        <div className="service-detail-grid">
          <section className="service-detail-main">
            <div className="detail-panel">
              <p className="eyebrow">WHO THIS MAY BE FOR</p>
              <h2>Explore whether it fits your plans.</h2>
              <p>{service.audience}</p>
            </div>
            <div className="detail-panel">
              <p className="eyebrow">ILLUSTRATIVE SCOPE</p>
              <h2>What may be included</h2>
              <ul className="check-list">
                {service.included.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="small-note">
                This list is draft content only. Confirm the final service scope
                before launch.
              </p>
            </div>
            <div className="detail-panel">
              <p className="eyebrow">TIMELINE</p>
              <h2>To be confirmed</h2>
              <p>
                Any timing depends on the selected service, information
                provided, and third-party processing.
              </p>
            </div>
          </section>
          <aside className="service-aside">
            <span className="aside-label">PREVIEW PRICING</span>
            <strong>To be confirmed</strong>
            <span className="placeholder-pill">Illustrative placeholder</span>
            <p>
              Final pricing and availability have not been set. This preview is
              not an offer or quote.
            </p>
            <Link className="button" href="/coming-soon">
              Start now <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button button-outline" href="/coming-soon">
              Talk to an expert
            </Link>
          </aside>
        </div>
        <div className="detail-bottom-cta">
          <h2>Have questions about your options?</h2>
          <p>Talk through your goals before choosing a service.</p>
          <Link className="text-link" href="/coming-soon">
            Talk to an expert <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
