import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Briefcase, PlayCircle, X } from "lucide-react";
import Header from "@/components/Header";
import StepItem from "@/components/StepItem";
import { STEP_GUIDES, type StepGuide } from "@/data/stepGuides";

const Steps = () => {
  const { slug } = useParams<{ slug: StepGuide["slug"] }>();
  const navigate = useNavigate();
  const guide = slug ? STEP_GUIDES[slug] : undefined;
  const [modalOpen, setModalOpen] = useState(false);

  if (!guide) return <Navigate to="/" replace />;

  const action = guide.action;
  const handlePrimary = () => {
    if (action?.type === "kit") {
      setModalOpen(true);
    } else if (action?.type === "video") {
      setModalOpen(true);
    } else if (guide.ctaTo) {
      navigate(guide.ctaTo);
    } else {
      navigate("/sos");
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header title={guide.title} subtitle={guide.subtitle} variant="primary" />

      <div className="flex-1 px-4 py-5 space-y-3">
        {guide.steps.map((s, i) => (
          <StepItem key={i} step={s} />
        ))}
      </div>

      <div className="sticky bottom-0 bg-background border-t border-border px-4 py-4 space-y-3">
        {action?.type === "video" && (
          <button
            onClick={() => setModalOpen(true)}
            className="w-full rounded-full bg-primary text-primary-foreground text-base font-semibold py-3 flex items-center justify-center gap-2 active:scale-[0.99] transition"
          >
            <PlayCircle className="h-5 w-5" />
            {action.label}
          </button>
        )}

        {action?.type === "kit" ? (
          <button
            onClick={handlePrimary}
            className="w-full rounded-full bg-emergency text-destructive-foreground text-lg font-bold py-4 shadow-sos flex items-center justify-center gap-2 active:scale-[0.99] transition"
          >
            <Briefcase className="h-5 w-5" />
            {action.label}
          </button>
        ) : (
          <button
            onClick={() => navigate(guide.ctaTo ?? "/sos")}
            className="w-full rounded-full bg-emergency text-destructive-foreground text-lg font-bold py-4 shadow-sos active:scale-[0.99] transition"
          >
            {guide.cta}
          </button>
        )}
      </div>

      {/* Modal */}
      {modalOpen && action && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full sm:max-w-md bg-card rounded-t-2xl sm:rounded-2xl shadow-card overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h2 className="font-bold text-lg">
                {action.type === "video" ? action.title : "First Aid Kit"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="rounded-full p-1 hover:bg-muted active:bg-muted/70 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {action.type === "kit" ? (
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Items you’ll need from the kit:
                </p>
                <ul className="space-y-2">
                  {action.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5"
                    >
                      <span className="grid place-items-center w-7 h-7 rounded-full bg-primary/10 text-primary shrink-0">
                        ✓
                      </span>
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    if (guide.ctaTo) navigate(guide.ctaTo);
                  }}
                  className="mt-4 w-full rounded-xl bg-primary text-primary-foreground font-semibold py-3 active:scale-[0.99] transition"
                >
                  {guide.ctaTo ? "Send Medical Kit" : "Got it"}
                </button>
              </div>
            ) : action.type === "video" ? (
              <div className="p-4">
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                  <iframe
                    src={action.videoUrl}
                    title={action.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Follow the demonstration carefully. Tap outside or close to exit.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </main>
  );
};

export default Steps;
