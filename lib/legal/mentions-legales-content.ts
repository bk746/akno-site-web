/** Contenu aligné sur https://akno.fr/mentions-legales */

export type LegalFact = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "facts"; items: LegalFact[] }
  | { type: "rgpd-contact"; email: string }
  | {
      type: "link";
      label: string;
      href: string;
      external?: boolean;
    };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export const LEGAL_CONTACT_EMAIL = "aknoweb.contact@gmail.com";
export const LEGAL_CONTACT_PHONE = "07 81 99 07 61";
export const LEGAL_CONTACT_PHONE_TEL = "+33781990761";

export const MENTIONS_LEGALES_SECTIONS: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    blocks: [
      { type: "paragraph", text: "Keryan Bouzerda — AKNO" },
      { type: "paragraph", text: "Entrepreneur individuel" },
      {
        type: "facts",
        items: [
          { label: "SIRET", value: "10135441300011" },
          { label: "SIREN", value: "101354413" },
          { label: "Code APE", value: "02.01Z" },
          { label: "Adresse", value: "74000 Annecy, France" },
          {
            label: "Email",
            value: LEGAL_CONTACT_EMAIL,
            href: `mailto:${LEGAL_CONTACT_EMAIL}`,
          },
          {
            label: "Téléphone",
            value: `${LEGAL_CONTACT_PHONE}`,
            href: `tel:${LEGAL_CONTACT_PHONE_TEL}`,
          },
        ],
      },
    ],
  },
  {
    id: "publication",
    title: "Directeur de la publication",
    blocks: [{ type: "paragraph", text: "Keryan Bouzerda" }],
  },
  {
    id: "hebergement",
    title: "Hébergement",
    blocks: [
      { type: "paragraph", text: "Vercel Inc." },
      {
        type: "paragraph",
        text: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
      },
      {
        type: "link",
        label: "vercel.com",
        href: "https://vercel.com",
        external: true,
      },
    ],
  },
  {
    id: "propriete-intellectuelle",
    title: "Propriété intellectuelle",
    blocks: [
      {
        type: "paragraph",
        text: "L'ensemble du contenu de ce site (textes, visuels, logo, mise en page, code) est la propriété exclusive de Keryan Bouzerda / AKNO, sauf mention contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.",
      },
    ],
  },
  {
    id: "donnees-personnelles",
    title: "Données personnelles",
    blocks: [
      {
        type: "rgpd-contact",
        email: LEGAL_CONTACT_EMAIL,
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    blocks: [
      {
        type: "paragraph",
        text: "Ce site n'utilise pas de cookies publicitaires ou de traçage tiers par défaut. Des cookies techniques peuvent être déposés par l'hébergeur ou des outils d'analyse si activés ultérieurement.",
      },
    ],
  },
];

export const CONFIDENTIALITE_SECTIONS: LegalSection[] = [
  {
    id: "donnees-collectees",
    title: "Données collectées",
    blocks: [
      {
        type: "paragraph",
        text: "Via le formulaire de contact, nous collectons les informations que vous saisissez volontairement : nom, adresse email, objet de la demande, budget éventuel et message.",
      },
    ],
  },
  {
    id: "finalites",
    title: "Finalités du traitement",
    blocks: [
      {
        type: "paragraph",
        text: "Ces données servent uniquement à traiter votre demande, à vous recontacter et, le cas échéant, à préparer une proposition commerciale. Elles ne sont ni vendues ni cédées à des tiers.",
      },
    ],
  },
  {
    id: "conservation",
    title: "Durée de conservation",
    blocks: [
      {
        type: "paragraph",
        text: "Les messages sont conservés le temps nécessaire au suivi de votre demande et de la relation commerciale, puis archivés ou supprimés conformément aux obligations légales applicables.",
      },
    ],
  },
  {
    id: "donnees-personnelles",
    title: "Vos droits (RGPD)",
    blocks: [
      {
        type: "rgpd-contact",
        email: LEGAL_CONTACT_EMAIL,
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    blocks: [
      {
        type: "paragraph",
        text: "Ce site n'utilise pas de cookies publicitaires ou de traçage tiers par défaut. Des cookies techniques peuvent être déposés par l'hébergeur ou des outils d'analyse si activés ultérieurement.",
      },
    ],
  },
];

export function getConfidentialiteSections(): LegalSection[] {
  return CONFIDENTIALITE_SECTIONS;
}
