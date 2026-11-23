"use client";

import { useState } from "react";

const cards = [
  {
    name: "LLC formation",
    category: "LIMITED LIABILITY COMPANY",
    description: "A guided starting point for founders exploring a US LLC.",
    label: "Explore LLC",
    badge: "START",
  },
  {
    name: "C-Corp formation",
    category: "CORPORATION",
    description: "Formation support for teams considering a US C-Corporation.",
    label: "Explore C-Corp",
    badge: "STARTUP",
  },
  {
    name: "Talk to an expert",
    category: "PERSONAL GUIDANCE",
    description: "Discuss your goals and questions with the team.",
    label: "Explore guidance",
    badge: "GUIDANCE",
  },
];

export function PricingCards() {
  const [selected, setSelected] = useState(1);
  const current = cards[selected];

  return (
    <div className="pricing-picker">
      <div aria-label="Choose a service to preview" className="pricing-fan">
        {cards.map((card, index) => (
          <button
            aria-pressed={selected === index}
            className={`price-card price-card-${index + 1}${selected === index ? " is-selected" : ""}`}
            key={card.name}
            onClick={() => setSelected(index)}
            type="button"
          >
            <span className="price-card-kicker">{card.badge}</span>
            <span className="price-card-icon" aria-hidden="true">
              {index === 0 ? "LLC" : index === 1 ? "C" : "↗"}
            </span>
            <span className="price-card-name">{card.name}</span>
            <span className="price-card-category">{card.category}</span>
            <span className="price-card-choose">
              {selected === index ? "Selected" : "Pick this card"}
            </span>
          </button>
        ))}
      </div>
      <div className="pricing-selection" aria-live="polite">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h3>{current.name}</h3>
          <p>{current.description}</p>
        </div>
        <div className="price-placeholder">
          <span>PRICE</span>
          <strong>To be confirmed</strong>
          <small>Illustrative placeholder</small>
        </div>
      </div>
    </div>
  );
}
