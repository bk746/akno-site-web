import type { FaqItem } from "@/components/faq/faq-data";
import { FaqIcon } from "@/components/faq/faq-icon";

type FaqCardProps = {
  item: FaqItem;
};

export function FaqCard({ item }: FaqCardProps) {
  return (
    <article className="faq-card" data-akno-spotlight>
      <FaqIcon name={item.icon} />
      <h3 className="faq-card__question">{item.question}</h3>
      <p className="faq-card__answer">{item.answer}</p>
    </article>
  );
}
