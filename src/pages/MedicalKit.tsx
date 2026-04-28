import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Loader2,
  CheckCircle2,
  PackageCheck,
  Truck,
  Send,
  Search,
  PartyPopper,
  Phone,
  MessageCircle,
  X,
} from "lucide-react";
import { useSafeBack } from "@/hooks/use-safe-back";
import { Progress } from "@/components/ui/progress";

type Step = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const STEPS: Step[] = [
  { key: "locate", label: "Locating nearest hospital…", icon: Search },
  { key: "sent", label: "Request Sent", icon: Send },
  { key: "prep", label: "Preparing Kit", icon: PackageCheck },
  { key: "out", label: "Out for Delivery", icon: Truck },
  { key: "arriving", label: "Arriving Soon", icon: MapPin },
  { key: "done", label: "First Aid Kit has arrived", icon: PartyPopper },
];

const STEP_DURATION = 1600;

const MedicalKit = () => {
  const goBack = useSafeBack("/");
  const [stepIndex, setStepIndex] = useState(0);
  const [supportOpen, setSupportOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    if (stepIndex >= STEPS.length - 1) return;
    const t = setTimeout(() => setStepIndex((i) => i + 1), STEP_DURATION);
    return () => clearTimeout(t);
  }, [stepIndex]);

  const progress = useMemo(
    () => Math.round((stepIndex / (STEPS.length - 1)) * 100),
    [stepIndex],
  );
  const isDone = stepIndex === STEPS.length - 1;

  const handleCallNow = () => {
    setCalling(true);
    setTimeout(() => {
      window.location.href = "tel:100";
    }, 700);
    setTimeout(() => {
      setCalling(false);
      setSupportOpen(false);
    }, 2200);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="bg-success text-success-foreground px-4 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            aria-label="Go back"
            className="rounded-full p-1 hover:bg-white/10 active:bg-white/20 transition"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="flex-1 text-center text-xl sm:text-2xl font-extrabold">
            First Aid Kit Dispatch
          </h1>
          <div className="w-7" aria-hidden />
        </div>
      </header>

      <div className="flex-1 px-4 py-5 space-y-4">
        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-card">
          <div className="px-4 py-2 bg-card flex items-center gap-2 border-b border-border">
            <MapPin className="h-4 w-4 text-emergency" />
            <p className="text-sm font-semibold text-foreground">
              Tracking delivery to your location
            </p>
          </div>
          <div className="relative">
            <iframe
              title="Dispatch map"
              className="w-full h-44 border-0 block"
              src="https://www.openstreetmap.org/export/embed.html?bbox=88.34%2C22.57%2C88.37%2C22.59&layer=mapnik&marker=22.585%2C88.355"
            />
            {!isDone && (
              <div className="absolute bottom-2 left-2 bg-success text-success-foreground text-xs font-bold px-2 py-1 rounded-full shadow-card flex items-center gap-1 animate-fade-in">
                <Truck className="h-3.5 w-3.5" />
                On the way
              </div>
            )}
          </div>
        </div>

        {/* Tracking */}
        <div className="rounded-2xl border border-border bg-card shadow-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-foreground">Live tracking</p>
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />

          <ol className="space-y-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = i === stepIndex;
              const done = i < stepIndex;
              return (
                <li
                  key={s.key}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${
                    active
                      ? "bg-success-soft"
                      : done
                        ? "opacity-70"
                        : "opacity-40"
                  }`}
                >
                  <span
                    className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      done
                        ? "bg-success text-success-foreground"
                        : active
                          ? "bg-success/20 text-success"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : active && !isDone ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </span>
                  <span
                    className={`flex-1 text-sm font-medium ${
                      active ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {s.label}
                    {active && !isDone && (
                      <span className="inline-flex ml-1">
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse [animation-delay:150ms]">.</span>
                        <span className="animate-pulse [animation-delay:300ms]">.</span>
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          {isDone ? (
            <button
              type="button"
              onClick={goBack}
              className="w-full rounded-full bg-success text-success-foreground text-lg font-bold py-4 shadow-card active:scale-[0.99] transition animate-fade-in"
            >
              Got It
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="w-full rounded-full bg-success/60 text-success-foreground text-lg font-bold py-4 shadow-card cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              Tracking Kit…
            </button>
          )}
          <button
            type="button"
            onClick={() => setSupportOpen(true)}
            className="w-full rounded-full bg-card border-2 border-border text-foreground text-lg font-bold py-4 active:scale-[0.99] transition"
          >
            Call Support
          </button>
        </div>
      </div>

      {/* Support Modal */}
      {supportOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center animate-fade-in"
          onClick={() => !calling && setSupportOpen(false)}
        >
          <div
            className="w-full sm:max-w-sm bg-card rounded-t-2xl sm:rounded-2xl p-5 shadow-card animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Support</h2>
              <button
                onClick={() => !calling && setSupportOpen(false)}
                aria-label="Close"
                className="p-1 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {calling ? (
              <div className="py-6 text-center space-y-3 animate-fade-in">
                <Loader2 className="h-8 w-8 mx-auto animate-spin text-success" />
                <p className="font-semibold">Connecting to support…</p>
                <p className="text-sm text-muted-foreground">Dialing 100</p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleCallNow}
                  className="w-full flex items-center gap-3 rounded-xl bg-success text-success-foreground px-4 py-3 font-bold active:scale-[0.99] transition"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </button>
                <button
                  onClick={() => {
                    setSupportOpen(false);
                    setChatOpen(true);
                  }}
                  className="w-full flex items-center gap-3 rounded-xl bg-card border-2 border-border px-4 py-3 font-bold active:scale-[0.99] transition"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat Support
                </button>
                <a
                  href="tel:100"
                  className="block text-center text-xs text-muted-foreground underline"
                >
                  Or dial 100 manually
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat Modal (mock) */}
      {chatOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center animate-fade-in"
          onClick={() => setChatOpen(false)}
        >
          <div
            className="w-full sm:max-w-sm bg-card rounded-t-2xl sm:rounded-2xl shadow-card animate-scale-in flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <h2 className="text-lg font-bold">Chat Support</h2>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Close"
                className="p-1 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-muted/30">
              <div className="max-w-[80%] bg-card border border-border rounded-2xl rounded-bl-sm px-3 py-2 text-sm shadow-card">
                Hi! How can we help you?
              </div>
              <div className="max-w-[80%] bg-card border border-border rounded-2xl rounded-bl-sm px-3 py-2 text-sm shadow-card">
                Your first aid kit is on the way. Anything else?
              </div>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="p-3 border-t border-border flex gap-2"
            >
              <input
                type="text"
                placeholder="Type a message…"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-bold"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default MedicalKit;
