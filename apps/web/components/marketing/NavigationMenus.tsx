"use client";

import Link from "next/link";
import { useState } from "react";
import { services } from "./content";

export function DesktopServicesMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="services-menu">
      <button
        aria-controls="services-mega"
        aria-expanded={open}
        className="services-menu-trigger"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        Services <span aria-hidden="true">{open ? "⌃" : "⌄"}</span>
      </button>
      {open && (
        <div className="services-mega" id="services-mega">
          <div>
            <p className="eyebrow">Explore services</p>
            <h2>Build your US business, step by step.</h2>
            <Link
              className="text-link"
              href="/services"
              onClick={() => setOpen(false)}
            >
              View all services <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="mega-links">
            {services.map((service) => (
              <Link
                href={`/services/${service.slug}`}
                key={service.slug}
                onClick={() => setOpen(false)}
              >
                {service.title}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function MobileNavigation({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu">
      <button
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="mobile-menu-trigger"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      {open && (
        <nav aria-label="Mobile navigation" className="mobile-menu-panel">
          <Link href="/services" onClick={() => setOpen(false)}>
            Services
          </Link>
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/coming-soon" onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link
            className="button"
            href="/coming-soon"
            onClick={() => setOpen(false)}
          >
            Start now
          </Link>
        </nav>
      )}
    </div>
  );
}
