import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Droplet, CheckCircle2, AlertTriangle } from "lucide-react";
import { useSafeBack } from "@/hooks/use-safe-back";

type ScanState = "idle" | "scanning" | "done";

interface ScanResult {
  value: number;
  ok: boolean;
}

const SCAN_MS = 4000;

const ScannerCard = ({
  id,
  title,
  unit,
  tint,
  Icon,
  state,
  result,
  okLabel,
  warnLabel,
  onStart,
}: {
  id: string;
  title: React.ReactNode;
  unit: string;
  tint: string;
  Icon: React.ComponentType<{ className?: string }>;
  state: ScanState;
  result: ScanResult | null;
  okLabel: string;
  warnLabel: string;
  onStart: () => void;
}) => {
  const isScanning = state === "scanning";
  const isDone = state === "done" && result;
  const ok = result?.ok;

  return (
    <section
      aria-labelledby={`${id}-title`}
      className={`rounded-2xl ${tint} shadow-card p-5 flex flex-col items-center gap-4`}
    >
      <div className="flex items-center gap-2 self-start">
        <Icon className="h-5 w-5 text-foreground/80" />
        <h2 id={`${id}-title`} className="font-extrabold text-lg text-foreground">
          {title}
        </h2>
      </div>

      <div className="relative grid place-items-center w-32 h-32">
        <div
          className={`absolute inset-0 rounded-full bg-background/60 ${
            isScanning ? "animate-ping" : ""
          }`}
          aria-hidden
        />
        <div className="relative grid place-items-center w-28 h-28 rounded-full bg-background shadow-card">
          {isDone ? (
            <div className="text-center leading-none">
              <div className="text-3xl font-extrabold text-foreground">{result!.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{unit}</div>
            </div>
          ) : (
            <Icon
              className={`h-10 w-10 text-emergency ${isScanning ? "animate-pulse" : "opacity-70"}`}
            />
          )}
        </div>
      </div>

      {isDone && (
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
            ok
              ? "bg-success-soft text-success"
              : "bg-emergency-soft text-emergency"
          }`}
        >
          {ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          {ok ? okLabel : warnLabel}
        </div>
      )}

      <button
        onClick={onStart}
        disabled={isScanning}
        className="w-full rounded-xl bg-primary text-primary-foreground font-semibold py-3 disabled:opacity-60 active:scale-[0.99] transition"
      >
        {isScanning ? "Scanning…" : isDone ? "Scan Again" : `Start ${typeof title === "string" ? title : "Scan"}`}
      </button>
    </section>
  );
};

const useTimer = () => {
  const ref = useRef<number | null>(null);
  useEffect(() => () => {
    if (ref.current) window.clearTimeout(ref.current);
  }, []);
  return ref;
};

const Checkup = () => {
  const navigate = useNavigate();
  const goBack = useSafeBack("/");

  const [pulseState, setPulseState] = useState<ScanState>("idle");
  const [pulseResult, setPulseResult] = useState<ScanResult | null>(null);
  const pulseTimer = useTimer();

  const [oxyState, setOxyState] = useState<ScanState>("idle");
  const [oxyResult, setOxyResult] = useState<ScanResult | null>(null);
  const oxyTimer = useTimer();

  const startPulse = () => {
    setPulseState("scanning");
    setPulseResult(null);
    pulseTimer.current = window.setTimeout(() => {
      const value = Math.floor(60 + Math.random() * 41); // 60–100
      setPulseResult({ value, ok: value >= 60 && value <= 100 });
      setPulseState("done");
    }, SCAN_MS);
  };

  const startOxy = () => {
    setOxyState("scanning");
    setOxyResult(null);
    oxyTimer.current = window.setTimeout(() => {
      // Simulate occasional dip below 95 for realism
      const roll = Math.random();
      const value = roll < 0.2 ? Math.floor(90 + Math.random() * 5) : Math.floor(95 + Math.random() * 6);
      setOxyResult({ value, ok: value >= 95 });
      setOxyState("done");
    }, SCAN_MS);
  };

  const anyAlert =
    (pulseResult && !pulseResult.ok) || (oxyResult && !oxyResult.ok);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="bg-emergency-soft text-emergency px-4 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            aria-label="Go back"
            className="rounded-full p-1 hover:bg-black/5 active:bg-black/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="flex-1 text-center text-xl sm:text-2xl font-extrabold tracking-tight">
            Vital Scan
          </h1>
          <div className="w-7" aria-hidden />
        </div>
        <p className="mt-2 text-sm text-foreground/80 text-center">
          Simulated sensor readings — for guidance only.
        </p>
      </header>

      <div className="flex-1 px-4 py-5 space-y-4">
        <ScannerCard
          id="pulse"
          title="Pulse"
          unit="bpm"
          tint="bg-tint-pulse"
          Icon={Heart}
          state={pulseState}
          result={pulseResult}
          okLabel="Normal"
          warnLabel="Needs Attention"
          onStart={startPulse}
        />

        <ScannerCard
          id="oxygen"
          title="Oxygen (SpO₂)"
          unit="%"
          tint="bg-tint-oxygen"
          Icon={Droplet}
          state={oxyState}
          result={oxyResult}
          okLabel="Normal"
          warnLabel="Low – Seek Help"
          onStart={startOxy}
        />

        {anyAlert && (
          <div className="rounded-xl p-4 border bg-emergency-soft border-emergency/30 text-emergency">
            <h3 className="font-bold text-base mb-1">One or more vitals are concerning</h3>
            <p className="text-sm">
              Consider triggering SOS or calling emergency services for assistance.
            </p>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-background border-t border-border px-4 py-3 flex gap-3">
        <button
          onClick={() => navigate("/")}
          className="flex-1 rounded-xl border-2 border-border font-semibold py-3 active:scale-[0.99] transition"
        >
          Done
        </button>
        <button
          onClick={() => navigate("/sos")}
          className="flex-1 rounded-xl bg-emergency text-destructive-foreground font-bold py-3 active:scale-[0.99] transition"
        >
          Trigger SOS
        </button>
      </div>
    </main>
  );
};

export default Checkup;
