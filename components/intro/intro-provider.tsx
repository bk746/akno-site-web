"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type IntroContextValue = {
  introActive: boolean;
  introComplete: boolean;
  completeIntro: () => void;
  skipIntro: () => void;
};

const IntroContext = createContext<IntroContextValue>({
  introActive: false,
  introComplete: true,
  completeIntro: () => {},
  skipIntro: () => {},
});

export function useIntro() {
  return useContext(IntroContext);
}

function applyIntroComplete() {
  document.documentElement.classList.remove("intro-pending");
  document.documentElement.classList.add("intro-complete");
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);

  const skipIntro = useCallback(() => {
    applyIntroComplete();
    setIntroComplete(true);
  }, []);

  const completeIntro = useCallback(() => {
    applyIntroComplete();
    setIntroComplete(true);
  }, []);

  const value = useMemo(
    () => ({
      introActive: !introComplete,
      introComplete,
      completeIntro,
      skipIntro,
    }),
    [introComplete, completeIntro, skipIntro],
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}
