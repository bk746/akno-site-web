"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-lock";

const HISTORY_KEY = "aknoContactOverlay";

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
  const isOpenRef = useRef(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const skipPopStateCloseRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const restoreFocus = useCallback(() => {
    const opener = openerRef.current;
    openerRef.current = null;
    requestAnimationFrame(() => {
      opener?.focus?.();
    });
  }, []);

  const close = useCallback(
    (options?: { fromPopState?: boolean }) => {
      setIsOpen(false);
      unlockBodyScroll();

      if (!options?.fromPopState && window.history.state?.[HISTORY_KEY]) {
        skipPopStateCloseRef.current = true;
        window.history.back();
      }

      restoreFocus();
    },
    [restoreFocus],
  );

  const open = useCallback(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    lockBodyScroll();
    setIsOpen(true);
    window.history.pushState({ [HISTORY_KEY]: true }, "");
  }, []);

  useEffect(() => {
    return () => unlockBodyScroll();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    const onPopState = () => {
      if (skipPopStateCloseRef.current) {
        skipPopStateCloseRef.current = false;
        return;
      }
      if (!isOpenRef.current) return;
      close({ fromPopState: true });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [close]);

  const value = useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen],
  );

  return (
    <ContactOverlayContext.Provider value={value}>
      {children}
      {isOpen ? <ContactOverlay onClose={() => close()} /> : null}
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
