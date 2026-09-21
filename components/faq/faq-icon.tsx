import type { ReactNode } from "react";

import type { FaqItem } from "@/components/faq/faq-data";

type FaqIconProps = {
  name: FaqItem["icon"];
};

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<FaqItem["icon"], ReactNode> = {
  cost: (
    <>
      <path {...stroke} d="M8 8h8l-2 10H10L8 8z" />
      <path {...stroke} d="M9 5h6v3H9z" />
      <circle {...stroke} cx="12" cy="13" r="1" />
    </>
  ),
  time: (
    <>
      <rect {...stroke} x="4" y="5" width="16" height="15" rx="2" />
      <path {...stroke} d="M8 3v4M16 3v4M4 10h16" />
      <path {...stroke} d="M12 12v3" />
    </>
  ),
  seo: (
    <>
      <path {...stroke} d="M5 17a7 7 0 0 1 14 0" />
      <path {...stroke} d="M12 17V10" />
      <circle {...stroke} cx="12" cy="10" r="2.5" />
    </>
  ),
  edit: (
    <>
      <rect {...stroke} x="5" y="5" width="14" height="14" rx="2" />
      <path {...stroke} d="M9 9h6M9 12h4M9 15h5" />
    </>
  ),
  refonte: (
    <>
      <path {...stroke} d="M7 7h10v10H7z" />
      <path {...stroke} d="M17 7l-3 3M7 17l3-3" />
      <path {...stroke} d="M14 10h3v3" />
    </>
  ),
  start: (
    <>
      <path {...stroke} d="M6 8a6 6 0 0 1 12 0v5a2 2 0 0 1-2 2h-1" />
      <path {...stroke} d="M9 19h6" />
      <path {...stroke} d="M10 15h4" />
    </>
  ),
};

export function FaqIcon({ name }: FaqIconProps) {
  return (
    <span className="faq-card__icon" aria-hidden>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        {ICONS[name]}
      </svg>
    </span>
  );
}
