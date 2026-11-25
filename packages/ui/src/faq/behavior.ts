/**
 * Click behaviour of the FAQ flip cards. One delegated listener serves both the
 * React component and FAQ markup that is inlined into server-rendered pages.
 */

const OPEN = "jfaq-open";

function setLabel(button: Element | null, on: boolean) {
  const label = button?.getAttribute("aria-label");
  if (!button || !label) return;
  button.setAttribute(
    "aria-label",
    label.replace(/(Show|Hide) answer$/, on ? "Hide answer" : "Show answer"),
  );
}

export function toggleFaqCard(card: Element): boolean {
  const on = !card.classList.contains(OPEN);
  card.classList.toggle(OPEN, on);
  const front = card.querySelector<HTMLElement>(".jfaq-fa");
  const back = card.querySelector<HTMLElement>(".jfaq-fb");
  front?.setAttribute("aria-pressed", String(on));
  front?.setAttribute("aria-hidden", String(on));
  back?.setAttribute("aria-hidden", String(!on));
  setLabel(front, on);
  // Keep keyboard focus on the face that is visible after the flip.
  const next = on ? back?.querySelector<HTMLElement>(".jfaq-back") : front;
  next?.focus({ preventScroll: true });
  return on;
}

export function showAllFaqCards(button: Element) {
  const root = button.closest(".jfaq");
  root
    ?.querySelectorAll(".jfaq-hide")
    .forEach((c) => c.classList.remove("jfaq-hide"));
  button.parentElement?.remove();
}

export function handleFaqClick(event: { target: EventTarget | null }) {
  const target = event.target as Element | null;
  if (!target || typeof target.closest !== "function") return;
  if (target.closest("a")) return; // links inside answers keep working
  const showAll = target.closest(".jfaq-showall");
  if (showAll) {
    showAllFaqCards(showAll);
    return;
  }
  const card = target.closest(".jfaq-fc");
  if (card) toggleFaqCard(card);
}
