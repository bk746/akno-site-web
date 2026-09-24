"use client";

import dynamic from "next/dynamic";

const AknoMotionRoot = dynamic(
  () =>
    import("@/components/motion/akno-motion-root").then(
      (module) => module.AknoMotionRoot,
    ),
  { ssr: false },
);

const AknoMicroInteractions = dynamic(
  () =>
    import("@/components/motion/akno-micro-interactions").then(
      (module) => module.AknoMicroInteractions,
    ),
  { ssr: false },
);

export function AknoClientShell() {
  return (
    <>
      <AknoMotionRoot />
      <AknoMicroInteractions />
    </>
  );
}
