"use client";

import { useEffect } from "react";
import { handleFaqClick } from "./behavior";
import { faqFlipCardsHtml, type FaqProps } from "./html";

/** The approved "Flip cards" FAQ. Use this one component for every FAQ. */
export function FaqFlipCards(props: FaqProps) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: faqFlipCardsHtml(props) }}
      onClick={(event) => handleFaqClick(event.nativeEvent)}
    />
  );
}

/**
 * For pages whose HTML is inlined as a string (marketing pages): mount once to make
 * the FAQ cards inside that HTML interactive.
 */
export function FaqFlipEnhancer() {
  useEffect(() => {
    document.addEventListener("click", handleFaqClick);
    return () => document.removeEventListener("click", handleFaqClick);
  }, []);
  return null;
}
