import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone } from "lucide-react";
import SOSButton from "@/components/SOSButton";
import QuickHelpCard from "@/components/QuickHelpCard";
import { useSafeBack } from "@/hooks/use-safe-back";

const Home = () => {
  const navigate = useNavigate();
  const goBack = useSafeBack("/");
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Brand header */}
      <div className="px-4 pt-5 pb-4 relative flex flex-col items-center gap-1">
        <button
          onClick={goBack}
          aria-label="Go back"
          className="absolute left-3 top-5 rounded-full p-1 hover:bg-muted active:bg-muted/70 transition"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-3xl" aria-hidden>🚑</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">Smart Aid</h1>
        </div>
        <p className="text-base text-muted-foreground">Stay Calm. Help is Here.</p>
      </div>

      {/* SOS */}
      <section className="flex justify-center py-8">
        <SOSButton />
      </section>

      {/* Quick help */}
      <section className="px-4 mt-2">
        <h2 className="text-lg font-semibold text-foreground mb-3">Quick help</h2>
        <div className="flex gap-3">
          <QuickHelpCard to="/steps/unconscious" emoji="😵" label="Unconscious" />
          <QuickHelpCard to="/steps/burn" emoji="🔥" label="Burn" />
          <QuickHelpCard to="/steps/injury" emoji="🤕" label="Injury" />
        </div>
      </section>

      <hr className="my-6 border-border mx-4" />

      {/* Quick assessment */}
      <section className="px-4 space-y-3">
        <h2 className="text-lg font-semibold text-foreground mb-1">Quick assessment</h2>
        <Link
          to="/"
          className="block w-full rounded-xl bg-primary text-primary-foreground text-center text-lg font-semibold py-4 shadow-card hover:bg-primary/90 active:scale-[0.99] transition"
        >
          Start Checkup
        </Link>
        <button
          onClick={() => navigate("/emergency")}
          className="w-full rounded-xl bg-emergency text-destructive-foreground text-lg font-semibold py-4 shadow-sos active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <Phone className="h-5 w-5" /> Emergency Call
        </button>
      </section>

      <hr className="my-6 border-border mx-4" />

      {/* Location status */}
      <footer className="px-4 pb-8 flex items-center justify-center gap-2 text-success">
        <MapPin className="h-5 w-5" />
        <span className="font-medium">Location: Ready</span>
      </footer>
    </main>
  );
};

export default Home;
