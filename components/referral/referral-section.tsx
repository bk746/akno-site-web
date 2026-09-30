"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import { referralAccentFont, referralHeavyFont } from "@/components/referral/referral-fonts";
import {
  REFERRAL_ICON_PATHS,
  type ReferralIcon,
} from "@/components/referral/referral-icons";

import { Glow, SectionGlowLayer } from "@/components/glow/glow";
import pos from "@/components/seasonal/section-stickers.module.css";
import { StickerAnchor } from "@/components/seasonal/sticker-anchor";
import { Sticker } from "@/components/seasonal/sticker";
import styles from "@/components/referral/referral-section.module.css";

/* ================================================================
   RÉGLAGES DU PROGRAMME DE PARRAINAGE : modifier uniquement ce bloc.
   Tous les montants affichés en découlent.
   ================================================================ */
type RewardId = "avoir" | "virement";

const REFERRAL_CONFIG = {
  /** Récompense du parrain, par filleul signé puis réglé (en €) */
  reward: {
    avoir: 600,
    virement: 400,
    defaultChoice: "avoir" as RewardId,
  },
  /** Avantage du filleul, au choix à la signature */
  referee: {
    discount: 300,
    maintenanceMonths: 1,
  },
  /** ⚠ Bonus fidélité : NON VALIDÉ. Déclenché au 3e parrainage (la frise de la maquette a 3 nœuds). */
  loyalty: {
    multiplier: 2,
    multiplierWord: "doublée",
  },
  /** ⚠ Bonus publicité : taux NON VALIDÉ. Carte marquée « Exemple ». */
  ads: {
    ratePercent: 10,
    months: 3,
    monthsWord: "trois",
    exampleMonthlyHT: 1500,
  },
};

/* ---------- Dérivés : ne pas modifier ---------- */
/** « 1 200 € » : espaces ASCII normaux (U+0020), comme la maquette. */
const eur = (n: number) =>
  `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

const { reward: R, referee: F, loyalty: L, ads: A } = REFERRAL_CONFIG;

const REWARDS = [
  {
    id: "avoir" as const,
    icon: "wallet" as const,
    name: "Avoir AKNO",
    amount: R.avoir,
    suffix: "d'avoir",
    desc: "À utiliser sur tous nos services.",
    uses: ["Gestion de pub", "Maintenance", "Évolutions du site"],
    badge:
      R.avoir > R.virement ? `+${eur(R.avoir - R.virement)} de valeur` : null,
  },
  {
    id: "virement" as const,
    icon: "landmark" as const,
    name: "Virement",
    amount: R.virement,
    suffix: "par virement",
    desc: "Versés directement sur votre compte bancaire.",
    uses: null,
    badge: null,
  },
];

const PERK_DISCOUNT = `${eur(F.discount)} de remise`;
const PERK_MAINTENANCE = `${F.maintenanceMonths} mois de maintenance ${F.maintenanceMonths > 1 ? "offerts" : "offert"}`;
const STEP2_TEXT = `${PERK_DISCOUNT} ou ${PERK_MAINTENANCE}, appliqué dès la signature de son projet.`;
const ADS_RESULT = eur((A.exampleMonthlyHT * A.ratePercent * A.months) / 100);
const LEGAL = `Conditions : récompense versée après règlement complet du projet parrainé, pour tout nouveau client présenté par vos soins. Avantage filleul au choix, non cumulable avec une autre offre. Bonus publicité calculé sur les montants HT des ${A.monthsWord} premiers mois de gestion. Montants indiqués à titre d'exemple, programme susceptible d'évoluer.`;

function Icon({ name }: { name: ReferralIcon }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {REFERRAL_ICON_PATHS[name]}
    </svg>
  );
}

export function ReferralSection() {
  const [reward, setReward] = useState<RewardId>(REFERRAL_CONFIG.reward.defaultChoice);
  const optRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const r = REWARDS.find((x) => x.id === reward)!;
  const rewardShort = `${eur(r.amount)} ${r.suffix}`;
  const tiers = [eur(r.amount), eur(r.amount), eur(r.amount * L.multiplier)];

  function onChoiceKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) {
      return;
    }
    e.preventDefault();
    const n = REWARDS.length;
    const cur = REWARDS.findIndex((x) => x.id === reward);
    const next =
      (cur + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + n) % n;
    setReward(REWARDS[next].id);
    optRefs.current[next]?.focus();
  }

  return (
    <section
      id="parrainage"
      className={`${styles.section} akno-deferred-section ${referralHeavyFont.variable}`}
      data-akno-surface="light"
      aria-labelledby="rfs-title"
    >
      <SectionGlowLayer>
        <Glow
          color="peach"
          size={650}
          opacity={0.35}
          blur={100}
          top={160}
          right={-100}
        />
        <Glow
          color="rose"
          size={550}
          opacity={0.3}
          blur={100}
          bottom={160}
          left={-90}
          hideBelowMd
        />
      </SectionGlowLayer>
      <div className={styles.inner}>
        <header className={`${styles.head} relative`} data-akno-reveal>
          <StickerAnchor corner="tr" className={pos.refCandyWrap}>
            <Sticker
              name="bonbon"
              pack="halloween"
              size="L"
              rotate={10}
              className={pos.refCandy}
              sectionLarge
              voidMobile
              floatDelay={0.15}
            />
          </StickerAnchor>
          <p className={styles.tag}>
            <span className={styles.tagIc}>
              <Icon name="sparkles" />
            </span>
            Parrainage
          </p>
          <h2 id="rfs-title" className={styles.title}>
            Recommandez AKNO,
            <br />
            <span className={`${referralAccentFont.className} ${styles.accent}`}>
              tout le monde y gagne
            </span>
          </h2>
          <p className={styles.sub}>
            Vous connaissez un dirigeant qui a besoin d&apos;un site qui rapporte ?
            Présentez-le-nous : vous êtes récompensé, et il démarre son projet avec
            un avantage.
          </p>
        </header>

        <div className={styles.duo} data-akno-reveal>
          <div className={styles.panel}>
            <StickerAnchor corner="tl">
              <Sticker
                name="coeur"
                pack="akno"
                size="M"
                rotate={-12}
                className={pos.refHeart}
                hideBelowLg
                floatDelay={0.3}
              />
            </StickerAnchor>
            <div className={styles.side}>
              <p className={styles.sideKick}>Pour vous, le parrain</p>
              <h3 className={styles.sideTitle}>Choisissez votre récompense</h3>
              <p className={styles.sideIntro}>
                Crédit AKNO ou virement : vous choisissez ce qui vous convient le
                mieux.
              </p>
              <div
                className={styles.choice}
                role="radiogroup"
                aria-label="Choisissez votre récompense"
                onKeyDown={onChoiceKeyDown}
              >
                <div className={styles.choiceRail}>
                  {REWARDS.map((opt, i) => {
                    const checked = reward === opt.id;
                    const labelParts = [
                      opt.name,
                      opt.badge,
                      `${eur(opt.amount)} ${opt.suffix}`,
                      opt.desc,
                      opt.uses?.join(", "),
                    ].filter(Boolean);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        tabIndex={checked ? 0 : -1}
                        ref={(el) => {
                          optRefs.current[i] = el;
                        }}
                        className={styles.opt}
                        onClick={() => setReward(opt.id)}
                        aria-label={labelParts.join(". ")}
                      >
                        {opt.badge ? (
                          <span className={styles.badge}>
                            <span>
                              <Icon name="sparkles" />
                            </span>
                            {opt.badge}
                          </span>
                        ) : null}
                        <span className={styles.optRadio} aria-hidden="true" />
                        <span className={styles.optIc}>
                          <Icon name={opt.icon} />
                        </span>
                        <span className={styles.optName}>{opt.name}</span>
                        <p className={styles.optAmtLine}>
                          <span className={styles.optAmt}>{eur(opt.amount)}</span>
                          <small className={styles.optAmtSuf}>{opt.suffix}</small>
                        </p>
                        <p className={styles.optDesc}>{opt.desc}</p>
                        {opt.uses ? (
                          <ul className={styles.optUses}>
                            {opt.uses.map((u) => (
                              <li key={u}>{u}</li>
                            ))}
                          </ul>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className={styles.note}>
                <span>
                  <Icon name="check" />
                </span>
                Vous êtes récompensé dès que le projet de votre filleul est réglé.
              </p>
            </div>

            <div className={styles.linkCol} aria-hidden="true">
              <div className={styles.linkLine} />
              <div className={styles.linkKnob}>
                <Icon name="plus" />
              </div>
            </div>

            <div className={styles.side}>
              <p className={styles.sideKick}>Pour votre filleul</p>
              <h3 className={styles.sideTitle}>Il démarre avec un avantage</h3>
              <p className={styles.sideIntro}>
                Remise sur son projet ou mois de maintenance, au choix à la
                signature.
              </p>
              <div className={styles.perks}>
                <div className={styles.perk}>
                  <span className={styles.perkIc}>
                    <Icon name="tag" />
                  </span>
                  <div>
                    <p className={`${styles.perkMain} ${styles.tnum}`}>
                      {PERK_DISCOUNT}
                    </p>
                    <p className={styles.perkSub}>sur son projet de site</p>
                  </div>
                </div>
                <p className={styles.perkOr}>ou</p>
                <div className={styles.perk}>
                  <span className={styles.perkIc}>
                    <Icon name="wrench" />
                  </span>
                  <div>
                    <p className={styles.perkMain}>{PERK_MAINTENANCE}</p>
                    <p className={styles.perkSub}>
                      mises à jour, sauvegardes et sécurité
                    </p>
                  </div>
                </div>
              </div>
              <p className={styles.note}>
                <span>
                  <Icon name="check" />
                </span>
                Son avantage est appliqué dès la signature.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.how} data-akno-reveal>
          <span className={styles.kicker}>Comment ça marche</span>
          <h3 className={styles.howTitle}>
            Trois étapes, sans démarche compliquée
          </h3>
          <ol className={styles.steps}>
            <li className={styles.step}>
              <span className={styles.num} aria-hidden="true">
                1
              </span>
              <div className={styles.stepCard}>
                <div className={styles.stepK}>Étape 1</div>
                <h4 className={styles.stepT}>Vous recommandez</h4>
                <p className={styles.stepP}>
                  {
                    "Présentez-nous un dirigeant ou une entreprise qui a besoin d'un site. Un simple message suffit."
                  }
                </p>
              </div>
            </li>
            <li className={styles.step}>
              <span className={styles.num} aria-hidden="true">
                2
              </span>
              <div className={styles.stepCard}>
                <div className={styles.stepK}>Étape 2</div>
                <h4 className={styles.stepT}>
                  Il signe et profite de son avantage
                </h4>
                <p className={styles.stepP}>{STEP2_TEXT}</p>
              </div>
            </li>
            <li className={`${styles.step} relative`}>
              <span className={`${styles.num} ${styles.numLast}`} aria-hidden="true">
                <Icon name="gift" />
              </span>
              <div className={`${styles.stepCard} relative`}>
                <StickerAnchor corner="edge-r">
                  <Sticker
                    name="bulle-hello"
                    pack="akno"
                    size="S"
                    rotate={0}
                    className={pos.refHello}
                    hideBelowLg
                    floatDelay={0.45}
                  />
                </StickerAnchor>
                <div className={styles.stepK}>Étape 3</div>
                <h4 className={styles.stepT}>Vous êtes récompensé</h4>
                <p className={styles.stepP}>
                  Dès que son projet est réglé, vous recevez la récompense choisie :{" "}
                  <b className={styles.rewardShort}>{rewardShort}</b>.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className={styles.bonusOuter} data-akno-reveal>
          <StickerAnchor corner="bl" className={pos.refWebWrap}>
            <Sticker
              name="toile-araignee"
              pack="halloween"
              size="S"
              rotate={0}
              className={pos.refWeb}
              hideBelowLg
              floatDelay={0.55}
            />
          </StickerAnchor>
          <StickerAnchor corner="br" className={pos.refTrickWrap}>
            <Sticker
              name="trick-or-trafic"
              pack="halloween"
              size="M"
              rotate={5}
              className={pos.refTrick}
              hideBelowLg
              floatDelay={0.7}
            />
          </StickerAnchor>
          <div className={styles.bonus}>
            <article className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.kicker}>
                  <span className={styles.kickerIc}>
                    <Icon name="award" />
                  </span>
                  Bonus fidélité
                </span>
                <span className={styles.tag}>Dès 3 parrainages</span>
              </div>
              <h3 className={styles.h3}>
                Au 3<sup>e</sup> parrainage, votre prime est {L.multiplierWord}
              </h3>
              <p className={styles.p}>
                {
                  "Vous devenez Apporteur d'affaires AKNO, et chaque recommandation compte un peu plus."
                }
              </p>
              <div
                className={styles.prog}
                role="group"
                aria-label="Progression vers le bonus"
              >
                <div className={styles.track}>
                  <div className={styles.trackFill} />
                  <span className={`${styles.node} ${styles.node1}`}>1</span>
                  <span className={`${styles.node} ${styles.node2}`}>2</span>
                  <span
                    className={`${styles.node} ${styles.nodeGift} ${styles.node3}`}
                  >
                    <Icon name="gift" />
                  </span>
                </div>
                <div className={styles.labels}>
                  <div>
                    <div className={styles.labT}>
                      1<sup>er</sup> parrainage
                    </div>
                    <div className={`${styles.labV} ${styles.tnum}`}>
                      {tiers[0]}
                    </div>
                  </div>
                  <div>
                    <div className={styles.labT}>
                      2<sup>e</sup> parrainage
                    </div>
                    <div className={`${styles.labV} ${styles.tnum}`}>
                      {tiers[1]}
                    </div>
                  </div>
                  <div>
                    <div className={styles.labT}>
                      3<sup>e</sup> parrainage
                    </div>
                    <div
                      className={`${styles.labV} ${styles.isGift} ${styles.tnum}`}
                    >
                      {tiers[2]}
                    </div>
                  </div>
                </div>
                <div className={styles.status}>
                  <span className={styles.statusIc}>
                    <Icon name="award" />
                  </span>
                  <span>
                    <span className={styles.statusT}>
                      {"Statut Apporteur d'affaires AKNO"}
                    </span>
                    <span className={styles.statusL}>
                      Débloqué à votre 3<sup>e</sup> filleul
                    </span>
                  </span>
                </div>
              </div>
            </article>

            <article className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.kicker}>
                  <span className={styles.kickerIc}>
                    <Icon name="megaphone" />
                  </span>
                  Bonus publicité
                </span>
                <span className={styles.tag}>Exemple</span>
              </div>
              <h3 className={styles.h3}>{`${A.ratePercent} % sur la gestion de pub de votre filleul`}</h3>
              <p className={styles.p}>{`S'il nous confie ses campagnes Google et Meta Ads, vous touchez ${A.ratePercent} % de ses ${A.monthsWord} premiers mois, en plus de votre prime.`}</p>
              <div className={styles.calc}>
                <div className={styles.calcBox}>
                  <div className={styles.row}>
                    <span>
                      <span>
                        <Icon name="megaphone" />
                      </span>
                      Gestion de pub
                    </span>
                    <b className={styles.tnum}>{`${eur(A.exampleMonthlyHT)} HT / mois`}</b>
                  </div>
                  <div className={styles.row}>
                    <span>
                      <span>
                        <Icon name="percent" />
                      </span>
                      Votre part
                    </span>
                    <b className={styles.tnum}>
                      <span className={styles.op}>×</span>
                      {`${A.ratePercent} %`}
                    </b>
                  </div>
                  <div className={styles.row}>
                    <span>
                      <span>
                        <Icon name="calendar" />
                      </span>
                      Durée
                    </span>
                    <b className={styles.tnum}>
                      <span className={styles.op}>×</span>
                      {`${A.months} mois`}
                    </b>
                  </div>
                </div>
                <div className={styles.result}>
                  <span>
                    <span className={styles.resultL}>Vous recevez</span>
                    <span className={styles.resultS}>
                      en plus de votre prime de parrainage
                    </span>
                  </span>
                  <span className={`${styles.resultV} ${styles.tnum}`}>
                    {ADS_RESULT}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaBtns}>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="#contact">
              Recommander quelqu&apos;un
              <span>
                <Icon name="arrow" />
              </span>
            </a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#contact">
              Poser une question
            </a>
          </div>
          <p className={styles.legal}>{LEGAL}</p>
        </div>
      </div>
    </section>
  );
}
