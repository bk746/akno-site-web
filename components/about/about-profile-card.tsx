import Image from "next/image";

import keryanPortrait from "@/src/images/IMG_7707 2.jpg";

export function AboutProfileCard() {
  return (
    <aside className="about-profile-card">
      <div className="about-profile-card__media">
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
