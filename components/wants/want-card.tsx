import type { WantCardItem } from "@/components/wants/wants-data";

type WantCardProps = {
  item: WantCardItem;
};

export function WantCard({ item }: WantCardProps) {
  const { Icon, segments } = item;

  return (
    <article className="want-card flex h-full flex-col items-center rounded-[24px] p-7 text-center">
      <Icon className="want-card__icon size-11 shrink-0 text-akno-cta sm:size-12" />
      <p className="mt-5 text-[16px] font-normal leading-snug tracking-[-0.02em] text-[#1D326B] sm:text-[17px]">
        {segments.map((segment, index) =>
          segment.emphasis ? (
            <strong key={index} className="font-bold">
              {segment.text}
            </strong>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </p>
    </article>
  );
}
