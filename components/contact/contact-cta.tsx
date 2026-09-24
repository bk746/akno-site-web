"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { useContactOverlay } from "@/components/contact/contact-overlay-context";

function preloadContactOverlay() {
  void import("@/components/contact/contact-overlay");
}

type ContactCtaProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function ContactCta({
  children,
  className,
  onClick,
  ...rest
}: ContactCtaProps) {
  const { open } = useContactOverlay();

  return (
    <button
      type="button"
      className={className}
      onPointerEnter={preloadContactOverlay}
      onFocus={preloadContactOverlay}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          open();
        }
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
