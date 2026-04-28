import { Link } from "react-router-dom";

interface QuickHelpCardProps {
  to: string;
  emoji: string;
  label: string;
}

const QuickHelpCard = ({ to, emoji, label }: QuickHelpCardProps) => (
  <Link
    to={to}
    className="flex-1 flex flex-col items-center justify-center gap-2 rounded-xl bg-card border border-border py-4 px-2 shadow-card hover:border-primary/40 active:scale-[0.98] transition"
  >
    <span className="text-3xl" aria-hidden>{emoji}</span>
    <span className="text-sm font-medium text-foreground">{label}</span>
  </Link>
);

export default QuickHelpCard;
