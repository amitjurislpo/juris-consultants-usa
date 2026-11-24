/** Round profile picture. Shows the first letter of the name when there is no photo. */
export function Avatar({
  name,
  image,
  size = 36,
}: {
  name: string;
  image: string | null;
  size?: number;
}) {
  const letter = (name.trim()[0] ?? "A").toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="avatar"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- small data URL, not a remote image
        <img alt="" height={size} src={image} width={size} />
      ) : (
        <svg
          aria-hidden="true"
          className="avatar-letter"
          focusable="false"
          viewBox="0 0 100 100"
        >
          <text
            dy="0.35em"
            fill="#fff"
            fontFamily="inherit"
            fontSize="56"
            fontWeight="700"
            textAnchor="middle"
            x="50"
            y="50"
          >
            {letter}
          </text>
        </svg>
      )}
    </span>
  );
}
