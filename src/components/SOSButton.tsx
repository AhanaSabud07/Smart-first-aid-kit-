import { useNavigate } from "react-router-dom";

const SOSButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/sos")}
      aria-label="Trigger SOS Emergency"
      className="relative flex flex-col items-center justify-center w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-emergency text-destructive-foreground shadow-sos active:scale-95 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-emergency animate-pulse-ring" aria-hidden />
      <span className="relative text-5xl sm:text-6xl font-extrabold tracking-tight">SOS</span>
      <span className="relative mt-1 text-sm font-medium opacity-95">Tap for Emergency</span>
    </button>
  );
};

export default SOSButton;
