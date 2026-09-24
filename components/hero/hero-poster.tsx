import Image from "next/image";

const POSTER_MOBILE = "/videos/akno-hero-poster-mobile.webp";
const POSTER_DESKTOP = "/videos/akno-hero-poster.webp";

export function HeroPoster() {
  return (
    <>
      <Image
        src={POSTER_MOBILE}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="(max-width: 639px) 100vw, 0px"
        quality={80}
        className="hero-poster object-cover sm:hidden"
        draggable={false}
      />
      <Image
        src={POSTER_DESKTOP}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="(min-width: 640px) min(860px, 100vw), 0px"
        quality={80}
        className="hero-poster hidden object-cover sm:block"
        draggable={false}
      />
    </>
  );
}
