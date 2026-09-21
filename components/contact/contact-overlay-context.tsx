"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-lock";

const ContactOverlay = dynamic(
  () =>
    import("@/components/contact/contact-overlay").then(
      (module) => module.ContactOverlay,
    ),
  { ssr: false },
);

type ContactOverlayContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ContactOverlayContext = createContext<ContactOverlayContextValue | null>(
  null,
);

export function ContactOverlayProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  const value = useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen],
  );

  return (
    <ContactOverlayContext.Provider value={value}>
      {children}
      {isOpen ? <ContactOverlay onClose={close} /> : null}
    </ContactOverlayContext.Provider>
  );
}

export function useContactOverlay() {
  const context = useContext(ContactOverlayContext);
  if (!context) {
    throw new Error(
      "useContactOverlay must be used within ContactOverlayProvider",
    );
  }
  return context;
}
