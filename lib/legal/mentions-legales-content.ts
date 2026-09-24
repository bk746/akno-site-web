/** Contenu légal AKNO — https://akno.fr */

import { CONTACT_EMAIL } from "@/lib/site-config";

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

/** À compléter — valeurs entre crochets laissées visibles tant qu’elles ne sont pas confirmées. */
export const LEGAL_APE_CODE =
  "[CODE APE EXACT, ex. 62.01Z — à vérifier sur l'avis Insee]";

export const LEGAL_FULL_ADDRESS = "[ADRESSE COMPLÈTE]";

export const LEGAL_VERCEL_PHONE = "[TÉLÉPHONE VERCEL]";

export const LEGAL_FORM_SUBPROCESSOR =
  "[OUTIL D'ENVOI DU FORMULAIRE, ex. Resend]";

export const LEGAL_CONTACT_PHONE = "07 81 99 07 61";
export const LEGAL_CONTACT_PHONE_TEL = "+33781990761";

export const CONFIDENTIALITE_LAST_UPDATED = "24 septembre 2026";

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
          { label: "Code APE", value: LEGAL_APE_CODE },
          { label: "Adresse", value: LEGAL_FULL_ADDRESS },
          {
            label: "Email",
            value: CONTACT_EMAIL,
            href: `mailto:${CONTACT_EMAIL}`,
          },
          {
            label: "Téléphone",
            value: LEGAL_CONTACT_PHONE,
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
        type: "facts",
        items: [
          {
            label: "Téléphone",
            value: LEGAL_VERCEL_PHONE,
          },
          {
            label: "Site",
            value: "vercel.com",
            href: "https://vercel.com",
            external: true,
          },
        ],
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
        email: CONTACT_EMAIL,
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
    id: "responsable-traitement",
    title: "Responsable du traitement",
    blocks: [
      {
        type: "paragraph",
        text: `Keryan Bouzerda, entrepreneur individuel (AKNO), SIRET 10135441300011, ${LEGAL_FULL_ADDRESS}, ${CONTACT_EMAIL}.`,
      },
    ],
  },
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
    id: "finalites-base-legale",
    title: "Finalités et base légale",
    blocks: [
      {
        type: "paragraph",
        text: "Vos données sont utilisées pour répondre à vos demandes et, le cas échéant, pour établir des devis. Le traitement repose sur les mesures précontractuelles prises à la demande de la personne concernée (article 6.1.b du RGPD) et sur l'intérêt légitime à assurer le suivi commercial (article 6.1.f du RGPD).",
      },
    ],
  },
  {
    id: "destinataires-sous-traitants",
    title: "Destinataires et sous-traitants",
    blocks: [
      {
        type: "paragraph",
        text: `Les données sont accessibles à Keryan Bouzerda uniquement. Sous-traitants techniques : Vercel Inc. (hébergement du site), ${LEGAL_FORM_SUBPROCESSOR}, Google (messagerie professionnelle). Vos données ne sont ni vendues ni cédées à des tiers.`,
      },
    ],
  },
  {
    id: "transferts-hors-ue",
    title: "Transferts hors Union européenne",
    blocks: [
      {
        type: "paragraph",
        text: "Certains prestataires (notamment Vercel Inc. et, le cas échéant, l'outil d'envoi du formulaire) sont situés aux États-Unis. Les transferts de données sont encadrés par le Data Privacy Framework UE–États-Unis et/ou les clauses contractuelles types adoptées par la Commission européenne.",
      },
    ],
  },
  {
    id: "conservation",
    title: "Durée de conservation",
    blocks: [
      {
        type: "paragraph",
        text: "Pour un prospect : conservation des données pendant 3 ans à compter du dernier contact. Pour un client : durée de la relation contractuelle, puis conservation pendant les durées légales applicables (comptabilité, garanties, contentieux).",
      },
    ],
  },
  {
    id: "vos-droits",
    title: "Vos droits",
    blocks: [
      {
        type: "paragraph",
        text: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation du traitement et de portabilité de vos données.",
      },
      {
        type: "paragraph",
        text: `Pour exercer vos droits, écrivez à ${CONTACT_EMAIL} ; nous répondons dans un délai d'un mois.`,
      },
      {
        type: "paragraph",
        text: "Vous pouvez également introduire une réclamation auprès de la CNIL.",
      },
      {
        type: "link",
        label: "www.cnil.fr",
        href: "https://www.cnil.fr",
        external: true,
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    blocks: [
      {
        type: "paragraph",
        text: "Ce site ne dépose aucun cookie publicitaire ni de mesure d'audience. Si un outil de ce type est ajouté ultérieurement, un bandeau de consentement sera mis en place avant tout dépôt de cookies non essentiels.",
      },
    ],
  },
];

export function getConfidentialiteSections(): LegalSection[] {
  return CONFIDENTIALITE_SECTIONS;
}
