"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ProblemCard } from "@/components/problems/problem-card";
import { PROBLEMS } from "@/components/problems/problems-data";

function getFocusY() {
  return window.innerHeight * 0.42;
}

export function ProblemsCardsList() {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef<number | null>(null);
  const inViewRef = useRef(false);

  const updateActiveIndex = useCallback(() => {
    const focusY = getFocusY();
    let nextIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    let secondBest = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((node, index) => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const distance = Math.abs(centerY - focusY);
      if (distance < bestDistance) {
        secondBest = bestDistance;
        bestDistance = distance;
        nextIndex = index;
      } else if (distance < secondBest) {
        secondBest = distance;
      }
    });

    setActiveIndex((current) => {
      if (current === nextIndex) return current;
      if (secondBest - bestDistance < 28 && itemRefs.current[current]) {
        const currentRect = itemRefs.current[current]!.getBoundingClientRect();
        const currentDist = Math.abs(
          currentRect.top + currentRect.height / 2 - focusY,
        );
        if (currentDist - bestDistance < 28) return current;
      }
      return nextIndex;
    });
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (!inViewRef.current || rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updateActiveIndex();
    });
  }, [updateActiveIndex]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) scheduleUpdate();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(list);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scheduleUpdate]);

  return (
    <ul
      ref={listRef}
      className="problems-right"
      data-scroll-active
      data-akno-reveal-stagger
    >
      {PROBLEMS.map((problem, index) => (
        <li
          key={problem.segments.map((s) => s.text).join("")}
          data-akno-reveal
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
        >
          <ProblemCard
            problem={problem}
            isScrollActive={activeIndex === index}
          />
        </li>
      ))}
    </ul>
  );
}
