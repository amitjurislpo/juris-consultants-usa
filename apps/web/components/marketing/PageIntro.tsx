export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="sec-head">
      <span className="eyebrow">{eyebrow}</span>
      <h1 style={{ fontSize: "clamp(34px,4.4vw,52px)" }}>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
