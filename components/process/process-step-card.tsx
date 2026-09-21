import type { ProcessStep } from "@/components/process/process-data";

type ProcessStepCardProps = {
  step: ProcessStep;
};

export function ProcessStepCard({ step }: ProcessStepCardProps) {
  return (
    <article className="want-card process-step flex h-full w-full flex-col items-center rounded-[24px] px-7 py-9 text-center">
      <p className="process-step__number">{step.number}</p>
      <h3 className="process-step__title">{step.title}</h3>
      <p className="process-step__line">{step.line}</p>
    </article>
  );
}
