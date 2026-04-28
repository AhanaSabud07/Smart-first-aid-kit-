import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Droplet, Bandage, HeartHandshake, CheckCircle2 } from "lucide-react";
import { useSafeBack } from "@/hooks/use-safe-back";

interface CareStep {
  n: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  bg: string;
}

const STEPS: CareStep[] = [
  {
    n: 1,
    title: "Clean the Area",
    description: "Gently wash the affected area with clean water",
    icon: <Droplet className="h-6 w-6 text-primary" />,
    bg: "bg-tint-oxygen",
  },
  {
    n: 2,
    title: "Stop Bleeding",
    description: "Apply light pressure using a clean cloth or gauze",
    icon: <span className="text-xl" aria-hidden>🩸</span>,
    bg: "bg-tint-pulse",
  },
  {
    n: 3,
    title: "Apply Antiseptic",
    description: "Use antiseptic cream or solution to prevent infection",
    icon: <span className="text-xl" aria-hidden>🧴</span>,
    bg: "bg-success-soft",
  },
  {
    n: 4,
    title: "Cover the Wound",
    description: "Use a Sterile Bandage if needed to protect the area",
    icon: <Bandage className="h-6 w-6 text-warning" />,
    bg: "bg-warning-soft",
  },
];

const FirstAidGuide = () => {
  const navigate = useNavigate();
  const goBack = useSafeBack("/");

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            aria-label="Go back"
            className="rounded-full p-1 hover:bg-muted active:bg-muted/70 transition"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-extrabold tracking-tight">First Aid Guide</h1>
            <p className="text-sm text-muted-foreground">Minor Abrasion & Bruise</p>
          </div>
          <div className="w-7" aria-hidden />
        </div>
      </header>

      <div className="flex-1 px-4 pb-5 space-y-5">
        {/* Status banner */}
        <div className="rounded-xl border-2 border-success/40 bg-success-soft px-4 py-3 flex items-center gap-3">
          <span className="grid place-items-center w-10 h-10 rounded-lg bg-background shrink-0">
            <ShieldCheck className="h-6 w-6 text-success" />
          </span>
          <div className="text-center flex-1">
            <p className="font-bold text-success">No Severe Injury Detected</p>
            <p className="text-sm text-foreground/80">Follow these steps for quick care</p>
          </div>
        </div>

        <div>
          <h2 className="font-extrabold text-lg mb-3">Step-by-Step Care</h2>
          <ul className="space-y-3">
            {STEPS.map((s) => (
              <li key={s.n} className="flex items-center gap-3">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                  {s.n}
                </span>
                <div className="flex-1 rounded-xl border border-border bg-card shadow-card px-3 py-3 flex items-start gap-3">
                  <span className={`grid place-items-center w-10 h-10 rounded-lg ${s.bg} shrink-0`}>
                    {s.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold leading-tight">{s.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{s.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="w-full rounded-xl bg-primary/15 text-primary px-4 py-3 flex items-center gap-3 font-medium active:scale-[0.99] transition"
        >
          <HeartHandshake className="h-5 w-5" />
          When Should I See a doctor?
        </button>
      </div>

      <div className="sticky bottom-0 bg-background border-t border-border px-4 py-4">
        <button
          onClick={() => navigate("/")}
          className="w-full rounded-full bg-primary text-primary-foreground text-lg font-bold py-4 flex items-center justify-center gap-3 shadow-card active:scale-[0.99] transition"
        >
          <CheckCircle2 className="h-6 w-6" />
          Got it!
        </button>
      </div>
    </main>
  );
};

export default FirstAidGuide;
