import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Hourglass, MapPin, Phone, HeartPulse } from "lucide-react";
import { useSafeBack } from "@/hooks/use-safe-back";

type Status = "sending" | "sent";

interface Contact {
  name: string;
  emoji: string;
  status: Status;
}

const SOSActivated = () => {
  const navigate = useNavigate();
  const goBack = useSafeBack("/");
  const [locationStatus, setLocationStatus] = useState<Status>("sending");
  const [callingState, setCallingState] = useState<"idle" | "calling" | "failed">("idle");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [locError, setLocError] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([
    { name: "Mom", emoji: "👩", status: "sending" },
    { name: "Friend", emoji: "🧑", status: "sending" },
    { name: "Ambulance", emoji: "🚑", status: "sending" },
  ]);

  const handleCall = () => {
    setCallingState("calling");
    // Show confirmation briefly, then attempt the tel: link
    window.setTimeout(() => {
      try {
        // Use a hidden anchor click — works around popup blockers on iOS/Android
        const a = document.createElement("a");
        a.href = "tel:100";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // We can't reliably detect success; assume the OS handled it.
        // If nothing happens after a short window, surface the fallback.
        window.setTimeout(() => {
          setCallingState((s) => (s === "calling" ? "failed" : s));
        }, 2500);
      } catch {
        setCallingState("failed");
      }
    }, 900);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setLocationStatus("sent"), 1500);
    const timers = contacts.map((_, i) =>
      setTimeout(() => {
        setContacts((prev) => prev.map((c, idx) => (idx === i ? { ...c, status: "sent" } : c)));
      }, 1200 + i * 1500),
    );

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => setLocError("Location not available"),
        { timeout: 8000, enableHighAccuracy: true },
      );
    } else {
      setLocError("Location not available");
    }

    return () => {
      clearTimeout(t1);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapSrc = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.01}%2C${
        coords.lat - 0.008
      }%2C${coords.lon + 0.01}%2C${coords.lat + 0.008}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=77.20%2C28.60%2C77.24%2C28.62&layer=mapnik&marker=28.6139%2C77.2090`;

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
          <div className="flex-1 flex items-center justify-center gap-2">
            <span className="text-2xl" aria-hidden>🚨</span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">SOS ACTIVATED!</h1>
          </div>
          <div className="w-7" aria-hidden />
        </div>
      </header>

      <div className="flex-1 px-4 py-5 space-y-5">
        {/* Stay calm */}
        <section className="flex gap-3">
          <HeartPulse className="h-7 w-7 text-primary shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-lg">Stay Calm</h2>
            <p className="text-sm text-muted-foreground">
              Take a deep breath and stay composed. Help is on the way!
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* Live location */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-emergency" />
            <h2 className="font-bold text-lg">Sharing your live location...</h2>
          </div>
          <div className="rounded-xl border border-border shadow-card overflow-hidden">
            <iframe
              key={mapSrc}
              title="Your live location"
              src={mapSrc}
              className="w-full h-44 border-0 block"
              loading="lazy"
            />
            <div className="px-3 py-2 text-sm flex items-center gap-2 flex-wrap">
              {locationStatus === "sent" ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                <Hourglass className="h-4 w-4 text-muted-foreground animate-pulse" />
              )}
              <span className="font-medium">
                {locError
                  ? locError
                  : coords
                    ? "You are here"
                    : "Locating you…"}
              </span>
              {coords && (
                <span className="text-xs text-muted-foreground ml-auto">
                  {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Contacts */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Phone className="h-5 w-5 text-success" />
            <h2 className="font-bold text-lg">Alerting Contacts</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {contacts.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-border bg-card shadow-card px-3 py-3 flex items-center gap-3"
              >
                <span className="text-3xl shrink-0" aria-hidden>{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground leading-tight">{c.name}</p>
                  <p
                    className={`text-sm ${
                      c.status === "sent" ? "text-success font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {c.status === "sent" ? "sent!" : "sending..."}
                  </p>
                </div>
                {c.status === "sent" ? (
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                ) : (
                  <Hourglass className="h-5 w-5 text-muted-foreground shrink-0 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 bg-background border-t border-border px-4 py-3 space-y-2">
        {callingState !== "idle" && (
          <div
            role="status"
            className={`rounded-xl px-3 py-2 text-sm font-medium flex items-center justify-center gap-2 ${
              callingState === "failed"
                ? "bg-warning-soft text-foreground"
                : "bg-success-soft text-success"
            }`}
          >
            {callingState === "calling" && (
              <>
                <Phone className="h-4 w-4 animate-pulse" />
                Calling emergency services (100)…
              </>
            )}
            {callingState === "failed" && (
              <>
                <span aria-hidden>⚠️</span>
                Couldn’t start the call. Dial <strong>100</strong> manually.
              </>
            )}
          </div>
        )}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/home", { replace: true })}
            className="flex-1 rounded-xl border-2 border-emergency text-emergency font-bold py-3 active:scale-[0.99] transition"
          >
            Cancel Alert
          </button>
          <button
            onClick={handleCall}
            className="flex-1 rounded-xl bg-success text-success-foreground font-bold py-3 flex items-center justify-center gap-2 active:scale-[0.99] transition"
          >
            <Phone className="h-5 w-5" /> Call Emergency
          </button>
        </div>
        {callingState === "failed" && (
          <a
            href="tel:100"
            className="block w-full rounded-xl border-2 border-success text-success text-center font-semibold py-2.5 active:scale-[0.99] transition"
          >
            Retry call to 100
          </a>
        )}
      </div>
    </main>
  );
};

export default SOSActivated;
