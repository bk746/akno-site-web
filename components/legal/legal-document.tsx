import Link from "next/link";

import type { LegalBlock, LegalSection } from "@/lib/legal/mentions-legales-content";

type LegalDocumentProps = {
  sections: LegalSection[];
};

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (block.type === "paragraph") {
    return <p className="legal-page__text">{block.text}</p>;
  }

  if (block.type === "facts") {
    return (
      <dl className="legal-page__facts">
        {block.items.map((item) => (
          <div key={item.label} className="legal-page__fact">
            <dt className="legal-page__fact-label">{item.label}</dt>
            <dd className="legal-page__fact-value">
              {item.href ? (
                <Link
                  href={item.href}
                  className="legal-page__fact-link"
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.value}
                </Link>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  if (block.type === "rgpd-contact") {
    return (
      <p className="legal-page__text">
        Les informations transmises via le formulaire de contact (nom, email,
        message) sont utilisées uniquement pour répondre à votre demande. Elles
        ne sont ni vendues ni cédées à des tiers. Conformément au RGPD, vous
        disposez d&apos;un droit d&apos;accès, de rectification et de
        suppression en écrivant à{" "}
        <Link href={`mailto:${block.email}`} className="legal-page__inline-link">
          {block.email}
        </Link>
        .
      </p>
    );
  }

  return (
    <p className="legal-page__text">
      <Link
        href={block.href}
        className="legal-page__inline-link"
        {...(block.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {block.label}
      </Link>
    </p>
  );
}

export function LegalTableOfContents({ sections }: { sections: LegalSection[] }) {
  return (
    <nav className="legal-page__toc" aria-label="Sommaire">
      <ul className="legal-page__toc-list">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="legal-page__toc-link">
              <span className="legal-page__toc-num" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function LegalDocument({ sections }: LegalDocumentProps) {
  return (
    <div className="legal-page__sections" data-akno-reveal-stagger>
      {sections.map((section, index) => (
        <article
          key={section.id}
          id={section.id}
          className="legal-page__card"
          aria-labelledby={`legal-${section.id}`}
          data-akno-reveal
        >
          <header className="legal-page__card-head">
            <span className="legal-page__card-index" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 id={`legal-${section.id}`} className="legal-page__card-title">
              {section.title}
            </h2>
          </header>
          <div className="legal-page__card-body">
            {section.blocks.map((block, blockIndex) => (
              <LegalBlockView
                key={`${section.id}-${blockIndex}`}
                block={block}
              />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
