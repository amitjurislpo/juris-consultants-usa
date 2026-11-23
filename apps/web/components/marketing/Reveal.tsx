"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

function splitHeadingWords(children: ReactNode) {
  let wordIndex = 0;
  const split = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (child) => {
      if (typeof child === "string") {
        return child.split(/(\s+)/).map((part) => {
          if (!part.trim()) return part;
          const delay = `${wordIndex * 55}ms`;
          wordIndex += 1;
          return (
            <span className="blur-word" key={`${part}-${wordIndex}`}>
              <span style={{ transitionDelay: delay }}>{part}</span>
            </span>
          );
        });
      }
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return cloneElement(child, { children: split(child.props.children) });
      }
      return child;
    });

  return split(children);
}

function revealHeadings(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return child;
    if (typeof child.type === "string" && /^h[1-3]$/.test(child.type)) {
      return cloneElement(child, {
        children: splitHeadingWords(child.props.children),
      });
    }
    return cloneElement(child, {
      children: revealHeadings(child.props.children),
    });
  });
}

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {revealHeadings(children)}
    </div>
  );
}

export function MotionGate() {
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    return () => document.documentElement.classList.remove("motion-ready");
  }, []);
  return null;
}
