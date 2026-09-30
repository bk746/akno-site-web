import styles from "@/components/hero/hero-section.module.css";

const i = styles.i;

export function ArrowIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m10 8 6 4-6 4Z" />
    </svg>
  );
}

export function LayersIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

export function ChartIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="m7 15 4-4 3 3 5-6" />
    </svg>
  );
}

export function TargetIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
    </svg>
  );
}

export function TrendIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  );
}

export function RouteIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

export function FileIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function SparkIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}

export function MouseIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v4" />
      <rect x="6" y="3" width="12" height="18" rx="6" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
