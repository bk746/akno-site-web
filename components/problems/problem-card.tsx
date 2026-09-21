import Image from "next/image";

import type { ProblemItem } from "@/components/problems/problems-data";

type ProblemCardProps = {
  problem: ProblemItem;
  isScrollActive?: boolean;
};

export function ProblemCard({ problem, isScrollActive = false }: ProblemCardProps) {
  const accentClass =
    problem.accent === "rose" ? "bg-akno-rose" : "bg-akno-cta";

  return (
    <article
      className={`problem-card flex items-center gap-5 sm:gap-6${
        isScrollActive ? " problem-card--scroll-active" : ""
      }`}
    >
      <div className="problem-card__icon flex size-12 shrink-0 items-center justify-center rounded-xl">
        <Image
          src={problem.icon}
          alt=""
          width={48}
          height={48}
          className="size-12 scale-[1.22] object-contain opacity-85"
          aria-hidden
          loading="lazy"
          decoding="async"
        />
      </div>

      <span
        className={`problem-card__accent h-10 shrink-0 rounded-full ${accentClass}`}
        aria-hidden
      />

      <p className="min-w-0 flex-1 text-[16px] font-normal leading-snug tracking-[-0.02em] text-[#1D326B] sm:text-[17px]">
        {problem.segments.map((segment, index) =>
          segment.emphasis ? (
            <strong key={index} className="font-bold">
              {segment.text}
            </strong>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </p>
    </article>
  );
}
