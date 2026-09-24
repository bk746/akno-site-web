import { HeroPoster } from "@/components/hero/hero-poster";
import { HeroVideoPlayer } from "@/components/hero/hero-video-player";

type HeroMediaProps = {
  className?: string;
};

export function HeroMedia({ className }: HeroMediaProps) {
  return (
    <div className={className}>
      <div className="hero-section__media-inner relative aspect-video w-full overflow-hidden rounded-[24px] bg-[#1a1a1e] sm:rounded-[28px]">
        <HeroPoster />
        <HeroVideoPlayer className="absolute inset-0" />

        <div className="hero-video-bottom-blur" aria-hidden>
          <span className="hero-video-bottom-blur__layer hero-video-bottom-blur__layer--strong" />
        </div>
      </div>
    </div>
  );
}
