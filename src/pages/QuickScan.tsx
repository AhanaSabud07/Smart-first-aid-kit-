import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Heart,
  Droplet,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Phone,
  Home as HomeIcon,
  X,
} from "lucide-react";

type ScanState = "idle" | "scanning" | "done";
type ScanKind = "pulse" | "oxygen" | "visual";

interface ScanResult {
  value: number;
  ok: boolean;
  label?: string;
}

const SCAN_MS = 4000;

const SCAN_META: Record<
  ScanKind,
  {
    title: string;
    subtitle: string;
    tint: string;
    accent: string;
    Icon: React.ComponentType<{ className?: string }>;
    unit: string;
    okLabel: string;
    warnLabel: string;
  }
> = {
  pulse: {
    title: "Pulse Check",
    subtitle: "Measure your heart rate",
    tint: "bg-tint-pulse",
    accent: "text-emergency",
    Icon: Heart,
    unit: "bpm",
    okLabel: "Normal",
    warnLabel: "Needs Attention",
  },
  oxygen: {
    title: "Oxygen (SpO₂)",
    subtitle: "Check oxygen saturation level",
    tint: "bg-tint-oxygen",
    accent: "text-primary",
    Icon: Droplet,
    unit: "%",
    okLabel: "Normal",
    warnLabel: "Low – Seek Help",
  },
  visual: {
    title: "Visual Scan",
    subtitle: "Scan for visible injuries",
    tint: "bg-tint-visual",
    accent: "text-warning",
    Icon: Camera,
    unit: "",
    okLabel: "No injuries detected",
    warnLabel: "Possible injury – check",
  },
};

const runScan = (kind: ScanKind): ScanResult => {
  if (kind === "pulse") {
    const value = Math.floor(60 + Math.random() * 41); // 60–100
    return { value, ok: value >= 60 && value <= 100 };
  }
  if (kind === "oxygen") {
    const roll = Math.random();
    const value =
      roll < 0.2 ? Math.floor(90 + Math.random() * 5) : Math.floor(95 + Math.random() * 6);
    return { value, ok: value >= 95 };
  }
  // visual
  const ok = Math.random() > 0.35;
  return { value: ok ? 0 : 1, ok, label: ok ? "Clear" : "Mark detected" };
};

const ScannerModal = ({
  kind,
  onClose,
}: {
  kind: ScanKind;
  onClose: () => void;
}) => {
  const meta = SCAN_META[kind];
  const Icon = meta.Icon;
  const [state, setState] = useState<ScanState>("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const navigate = useNavigate();
  const start = () => {
    setState("scanning");
    setResult(null);
    const ms = kind === "visual" ? 2500 : SCAN_MS;
    timerRef.current = window.setTimeout(() => {
      if (kind === "visual") {
        onClose();
        navigate("/first-aid-guide");
        return;
      }
      setResult(runScan(kind));
      setState("done");
    }, ms);
  };

  const isScanning = state === "scanning";
  const isDone = state === "done" && result;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-card rounded-t-2xl sm:rounded-2xl shadow-card overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="font-bold text-lg">{meta.title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 hover:bg-muted transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className={`p-6 flex flex-col items-center gap-4 ${meta.tint}`}>
          <div className="relative grid place-items-center w-36 h-36">
            <div
              className={`absolute inset-0 rounded-full bg-background/60 ${
                isScanning ? "animate-ping" : ""
              }`}
              aria-hidden
            />
            <div className="relative grid place-items-center w-32 h-32 rounded-full bg-background shadow-card">
              {isDone ? (
                <div className="text-center leading-none px-2">
                  <div className="text-3xl font-extrabold text-foreground">
                    {kind === "visual" ? (result!.ok ? "✓" : "!") : result!.value}
                  </div>
                  {meta.unit && (
                    <div className="text-xs text-muted-foreground mt-1">{meta.unit}</div>
                  )}
                </div>
              ) : (
                <Icon
                  className={`h-12 w-12 ${meta.accent} ${
                    isScanning ? "animate-pulse" : "opacity-80"
                  }`}
                />
              )}
            </div>
          </div>

          {isDone && (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                result!.ok
                  ? "bg-success-soft text-success"
                  : "bg-emergency-soft text-emergency"
              }`}
            >
              {result!.ok ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              {result!.ok ? meta.okLabel : meta.warnLabel}
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Simulated reading — for guidance only.
          </p>
        </div>

        <div className="p-4">
          <button
            onClick={start}
            disabled={isScanning}
            className="w-full rounded-xl bg-primary text-primary-foreground font-semibold py-3 disabled:opacity-60 active:scale-[0.99] transition"
          >
            {isScanning ? "Scanning…" : isDone ? "Scan Again" : `Start ${meta.title}`}
          </button>
        </div>
      </div>
    </div>
  );
};

const ScanCard = ({
  kind,
  onOpen,
}: {
  kind: ScanKind;
  onOpen: () => void;
}) => {
  const meta = SCAN_META[kind];
  const Icon = meta.Icon;
  return (
    <button
      onClick={onOpen}
      className={`w-full ${meta.tint} rounded-2xl shadow-card px-4 py-5 flex items-center gap-4 text-left active:scale-[0.99] transition`}
    >
      <span className="grid place-items-center w-14 h-14 rounded-xl bg-background/70 shrink-0">
        <Icon className={`h-8 w-8 ${meta.accent}`} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-extrabold text-foreground text-lg leading-tight">
          {meta.title}
        </span>
        <span className="block text-sm text-muted-foreground mt-0.5">
          {meta.subtitle}
        </span>
      </span>
      <span
        className="grid place-items-center w-9 h-9 rounded-full bg-background shrink-0 shadow-card"
        aria-hidden
      >
        <ChevronRight className="h-5 w-5 text-foreground/70" />
      </span>
    </button>
  );
};

const QuickScan = () => {
  const navigate = useNavigate();
  const [openScan, setOpenScan] = useState<ScanKind | null>(null);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="bg-emergency-soft text-emergency px-4 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-7" aria-hidden />
          <h1 className="flex-1 text-center text-xl sm:text-2xl font-extrabold tracking-tight">
            Quick Scan / Start Checkup
          </h1>
          <div className="w-7" aria-hidden />
        </div>
        <p className="mt-2 text-sm text-foreground/80 text-center">
          Quickly check vital signs and check for injuries
        </p>
      </header>

      <div className="flex-1 px-4 py-5 space-y-4">
        <ScanCard kind="pulse" onOpen={() => setOpenScan("pulse")} />
        <ScanCard kind="oxygen" onOpen={() => setOpenScan("oxygen")} />
        <ScanCard kind="visual" onOpen={() => setOpenScan("visual")} />
      </div>

      <div className="sticky bottom-0 bg-background border-t border-border px-4 py-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("/home")}
          className="rounded-xl border-2 border-border font-semibold py-3 flex items-center justify-center gap-2 active:scale-[0.99] transition"
        >
          <HomeIcon className="h-5 w-5" /> Home
        </button>
        <button
          onClick={() => navigate("/emergency")}
          className="rounded-xl bg-emergency text-destructive-foreground font-bold py-3 flex items-center justify-center gap-2 active:scale-[0.99] transition"
        >
          <Phone className="h-5 w-5" /> Emergency Call
        </button>
      </div>

      {openScan && <ScannerModal kind={openScan} onClose={() => setOpenScan(null)} />}
    </main>
  );
};

export default QuickScan;
