"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyLaunch() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const bottom = document.documentElement.scrollHeight - window.scrollY;
      setVisible(window.scrollY > 560 && bottom > window.innerHeight + 520);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-launch">
      <span>
        <strong>Build your US business</strong>
        <small>Preview only · pricing to be confirmed</small>
      </span>
      <Link className="button button-small" href="/coming-soon">
        Start now <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
