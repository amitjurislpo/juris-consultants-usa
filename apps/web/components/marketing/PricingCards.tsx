"use client";

import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    category: "LLC formation",
    description:
      "An illustrative starting point for founders exploring an LLC.",
    label: "PREVIEW STARTER",
    icon: "LLC",
  },
  {
    name: "Premium",
    category: "C-Corp formation",
    description:
      "An illustrative option for teams considering a US C-Corporation.",
    label: "PREVIEW PREMIUM",
    icon: "C-Corp",
  },
  {
    name: "Global",
    category: "Founder support",
    description:
      "A placeholder for guidance across company formation and next steps.",
    label: "PREVIEW GLOBAL",
    icon: "↗",
  },
];

export function PricingCards() {
  const [selected, setSelected] = useState(1);
  const current = plans[selected]!;

  return (
    <div className="pricing-picker">
      <div
        aria-label="Choose a service to preview"
        className="pricing-fan"
        role="group"
      >
        {plans.map((plan, index) => (
          <button
            aria-pressed={selected === index}
            className={`price-card price-card-${index + 1}${selected === index ? " is-selected" : ""}`}
            key={plan.name}
            onClick={() => setSelected(index)}
            type="button"
          >
            <span className="price-card-kicker">{plan.category}</span>
            <span className="price-card-icon" aria-hidden="true">
              {plan.icon}
            </span>
            <span className="price-card-name">{plan.name}</span>
            <span className="price-card-description">{plan.description}</span>
            <span className="price-card-value">To be confirmed</span>
            <span className="price-card-placeholder">
              Illustrative placeholder
            </span>
            <span className="price-card-choose">
              {selected === index ? "Selected preview" : plan.label}
            </span>
          </button>
        ))}
      </div>

      <div className="pricing-calculator" aria-live="polite">
        <div className="pricing-calculator-heading">
          <div>
            <p className="eyebrow">ILLUSTRATIVE PRICE PREVIEW</p>
            <h3>Build your estimate</h3>
            <p>
              Final service fees, state fees, and add-ons will be confirmed
              before launch.
            </p>
          </div>
          <span className="placeholder-pill">PLACEHOLDER · NOT A QUOTE</span>
        </div>

        <div className="pricing-calculator-fields">
          <div className="pricing-calc-row">
            <span>
              <small>SELECTED SERVICE</small>
              <strong>{current.name}</strong>
            </span>
            <strong>To be confirmed</strong>
          </div>
          <div className="pricing-calc-row">
            <span>
              <small>FORMATION STATE</small>
              <strong>Choose after launch</strong>
            </span>
            <span className="pricing-calc-hint">State fee varies</span>
          </div>
          <div className="pricing-calc-row">
            <span>
              <small>OPTIONAL SERVICES</small>
              <strong>Final catalog pending</strong>
            </span>
            <span className="pricing-calc-hint">No add-ons selected</span>
          </div>
        </div>

        <div className="pricing-total">
          <span>
            <small>PREVIEW TOTAL</small>
            <strong>Illustrative only</strong>
          </span>
          <strong>To be confirmed</strong>
        </div>
        <div className="pricing-calculator-footer">
          <p>
            Values are placeholders, not an offer or quote. Final prices are
            still being reviewed.
          </p>
          <Link className="button button-small" href="/coming-soon">
            Start now <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
