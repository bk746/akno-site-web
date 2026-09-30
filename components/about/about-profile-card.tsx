import Image from "next/image";

import pos from "@/components/seasonal/section-stickers.module.css";
import { StickerAnchor } from "@/components/seasonal/sticker-anchor";
import { Sticker } from "@/components/seasonal/sticker";
import keryanPortrait from "@/src/images/IMG_7707 2.jpg";

export function AboutProfileCard() {
  return (
    <aside className="about-profile-card">
      <div className="about-profile-card__media relative">
        <StickerAnchor corner="tr">
          <Sticker
            name="made-in-annecy"
            pack="akno"
            size="M"
            rotate={6}
            className={pos.aboutMade}
            hideBelowLg
            floatDelay={0.2}
          />
        </StickerAnchor>
        <StickerAnchor corner="br">
          <Sticker
            name="pin-annecy"
            pack="akno"
            size="S"
            rotate={-4}
            className={pos.aboutPin}
            hideBelowLg
            floatDelay={0.45}
          />
        </StickerAnchor>
        <Image
          src={keryanPortrait}
          alt="Keryan Bouzerda, fondateur d’AKNO"
          fill
          className="about-profile-card__image object-cover"
          sizes="(max-width: 768px) 92vw, 480px"
          quality={75}
        />
      </div>

      <div className="about-profile-card__badge">
        <p className="about-profile-card__name">Keryan Bouzerda</p>
        <p className="about-profile-card__role">Fondateur · AKNO</p>
      </div>
    </aside>
  );
}
