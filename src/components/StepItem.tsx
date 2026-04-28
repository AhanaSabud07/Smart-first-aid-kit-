import { cn } from "@/lib/utils";

export interface Step {
  emoji: string;
  title: string;
  description: string;
  warning?: string;
  highlight?: boolean;
}

interface StepItemProps {
  step: Step;
}

const StepItem = ({ step }: StepItemProps) => {
  return (
    <article
      className={cn(
        "rounded-xl border bg-card shadow-card p-4 flex flex-col gap-2",
        step.highlight && "bg-success-soft border-success/40",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0 leading-none mt-0.5" aria-hidden>{step.emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base text-foreground leading-tight">{step.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
        </div>
      </div>
      {step.warning && (
        <div className="flex items-center gap-2 rounded-md bg-warning-soft px-3 py-2 text-sm text-foreground">
          <span aria-hidden>⚠️</span>
          <span className="font-medium">{step.warning}</span>
        </div>
      )}
    </article>
  );
};

export default StepItem;
