type IconProps = {
  className?: string;
};

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M8.5 4h2.2c.6 0 1.1.4 1.2 1l.4 2.4a1.2 1.2 0 0 1-.7 1.3l-1.5.6a12.5 12.5 0 0 0 5.2 5.2l.6-1.5a1.2 1.2 0 0 1 1.3-.7l2.4.4c.6.1 1 .6 1 1.2v2.2c0 .7-.5 1.2-1.1 1.3C10.8 18.6 5.4 13.2 4.2 7.6 4.1 7 4.6 6.5 5.3 6.5H8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
