import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  subtitle?: string;
  variant?: "primary" | "emergency";
  showBack?: boolean;
  /** Where to go if there's no history to pop back to. */
  backFallback?: string;
  icon?: React.ReactNode;
}

const variantClasses = {
  primary: "bg-primary text-primary-foreground",
  emergency: "bg-emergency-soft text-emergency",
};

const Header = ({
  title,
  subtitle,
  variant = "primary",
  showBack = true,
  backFallback = "/",
  icon,
}: HeaderProps) => {
  const navigate = useNavigate();
  const goBack = () => {
    // If there's no history (deep link / refresh), fall back to a safe route.
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(backFallback, { replace: true });
    }
  };
  return (
    <header className={`${variantClasses[variant]} px-4 pt-5 pb-4`}>
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={goBack}
            aria-label="Go back"
            className="shrink-0 rounded-full p-1 -ml-1 hover:bg-black/5 active:bg-black/10 transition"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        )}
        <div className="flex-1 flex items-center justify-center gap-2">
          {icon}
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-center">{title}</h1>
        </div>
        {showBack && <div className="w-7 shrink-0" aria-hidden />}
      </div>
      {subtitle && (
        <p className="mt-2 text-center text-sm sm:text-base opacity-90">{subtitle}</p>
      )}
    </header>
  );
};

export default Header;
