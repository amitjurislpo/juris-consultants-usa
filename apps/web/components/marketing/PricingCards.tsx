"use client";

import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "US LLC formation",
    category: "LIMITED LIABILITY COMPANY",
    description:
      "A guided starting point for founders exploring a US limited liability company.",
    label: "EXPLORE LLC",
    icon: "LLC",
  },
  {
    name: "US C-Corp formation",
    category: "CORPORATION",
    description: "Formation support for teams considering a US C-Corporation.",
    label: "EXPLORE C-CORP",
    icon: "C",
  },
  {
    name: "Talk to an expert",
    category: "PERSONAL GUIDANCE",
    description:
      "Discuss your goals and questions with the team before choosing a service.",
    label: "GET GUIDANCE",
    icon: "↗",
  },
];

export function PricingCards() {
  const [selected, setSelected] = useState(0);
  const current = plans[selected]!;

  return (
    <div className="pricing-picker">
      <div
        aria-label="Choose a service to preview"
        className="pricing-plan-grid"
      >
        {plans.map((plan, index) => (
          <button
            aria-pressed={selected === index}
            className={`pricing-plan-card${selected === index ? " is-selected" : ""}`}
            key={plan.name}
            onClick={() => setSelected(index)}
            type="button"
          >
            <span className="pricing-plan-card-top">
              <span className="pricing-plan-icon" aria-hidden="true">
                {plan.icon}
              </span>
              <span className="pricing-plan-arrow" aria-hidden="true">
                ↗
              </span>
            </span>
            <span className="pricing-plan-category">{plan.category}</span>
            <span className="pricing-plan-name">{plan.name}</span>
            <span className="pricing-plan-description">{plan.description}</span>
            <span className="pricing-plan-price">
              <strong>To be confirmed</strong>
              <small>Illustrative placeholder</small>
            </span>
            <span className="pricing-plan-select">
              {selected === index ? "Selected for preview" : plan.label}
            </span>
          </button>
        ))}
      </div>

      <div className="pricing-calculator" aria-live="polite">
        <div className="pricing-calculator-heading">
          <div>
            <p className="eyebrow">LIVE PRICE PREVIEW</p>
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
