import { useState } from "react";
import { Phone, Delete } from "lucide-react";
import Header from "@/components/Header";

type Service = {
  key: string;
  emoji: string;
  label: string;
  numbers: string;
  primary: string;
};

const SERVICES: Service[] = [
  { key: "ambulance", emoji: "🚑", label: "Call Ambulance", numbers: "102/108", primary: "108" },
  { key: "police", emoji: "👮", label: "Call Police", numbers: "100", primary: "100" },
  { key: "fire", emoji: "🚒", label: "Call Fire", numbers: "101", primary: "101" },
];

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

const EmergencyDial = () => {
  const [selected, setSelected] = useState<Service>(SERVICES[0]);
  const [number, setNumber] = useState<string>(SERVICES[0].primary);
  const [calling, setCalling] = useState(false);

  const press = (k: string) => setNumber((n) => (n.length >= 12 ? n : n + k));
  const back = () => setNumber((n) => n.slice(0, -1));

  const triggerCall = (num: string) => {
    setCalling(true);
    window.setTimeout(() => {
      try {
        const a = document.createElement("a");
        a.href = `tel:${num}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch {
        /* noop */
      }
      window.setTimeout(() => setCalling(false), 2500);
    }, 700);
  };

  const pickService = (s: Service) => {
    setSelected(s);
    setNumber(s.primary);
  };

  return (
    <main className="min-h-screen bg-emergency-soft flex flex-col">
      <Header
        title="Emergency Call"
        variant="emergency"
        backFallback="/"
      />

      <div className="flex-1 px-4 pt-4 pb-6 flex flex-col items-center">
        {/* Selected service */}
        <button
          onClick={() => triggerCall(selected.primary)}
          className="w-full bg-card rounded-xl shadow-card px-4 py-3 flex items-center gap-3 active:scale-[0.99] transition"
        >
          <span className="text-3xl shrink-0" aria-hidden>{selected.emoji}</span>
          <span className="flex-1 min-w-0 text-left">
            <span className="block font-extrabold text-foreground text-lg leading-tight">
              {selected.label}
            </span>
            <span className="block text-emergency font-semibold text-sm">
              {selected.numbers}
            </span>
          </span>
        </button>

        {/* Display */}
        <div className="my-5 text-4xl font-bold text-foreground tracking-widest min-h-[3rem]">
          {number || <span className="text-foreground/30">·</span>}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-3 w-full max-w-xs">
          {KEYS.map((k) => (
            <button
              key={k}
              onClick={() => press(k)}
              className="rounded-full bg-card text-foreground font-bold text-2xl py-3 shadow-card active:scale-95 transition"
            >
              {k}
            </button>
          ))}
        </div>

        {/* Backspace */}
        <button
          onClick={back}
          aria-label="Backspace"
          className="mt-3 text-foreground/70 p-2 active:scale-95 transition"
        >
          <Delete className="h-6 w-6" />
        </button>

        {/* Quick service buttons */}
        <div className="mt-4 grid grid-cols-2 gap-3 w-full">
          {SERVICES.filter((s) => s.key !== "ambulance").map((s) => (
            <button
              key={s.key}
              onClick={() => pickService(s)}
              className="rounded-full bg-emergency text-destructive-foreground font-bold py-3 px-3 shadow-sos active:scale-[0.98] transition"
            >
              {s.label}({s.primary})
            </button>
          ))}
        </div>

        {/* Big call button */}
        <button
          onClick={() => triggerCall(number || selected.primary)}
          aria-label={`Call ${number || selected.primary}`}
          className="mt-5 grid place-items-center w-16 h-16 rounded-full bg-success text-success-foreground shadow-sos active:scale-95 transition"
        >
          <Phone className="h-7 w-7" />
        </button>

        {/* Status / fallback */}
        {calling && (
          <div className="mt-4 w-full rounded-xl bg-success-soft text-success px-3 py-2 text-sm font-medium flex items-center justify-center gap-2">
            <Phone className="h-4 w-4 animate-pulse" />
            Calling emergency services ({number || selected.primary})…
          </div>
        )}
        <a
          href={`tel:${number || selected.primary}`}
          className="mt-3 text-xs text-muted-foreground underline"
        >
          Call not starting? Tap here to dial {number || selected.primary}
        </a>
      </div>
    </main>
  );
};

export default EmergencyDial;
