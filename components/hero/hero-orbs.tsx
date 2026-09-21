export function HeroOrbs() {
  return (
    <div
      className="hero-orbs pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="hero-orb hero-orb--top-left" />
      <div className="hero-orb hero-orb--bottom-left" />
      <div className="hero-orb hero-orb--bottom-right" />
    </div>
  );
}
