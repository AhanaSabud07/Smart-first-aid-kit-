import type { Step } from "@/components/StepItem";

export type GuideAction =
  | { type: "kit"; label: string; items: string[] }
  | { type: "video"; label: string; videoUrl: string; title: string }
  | { type: "navigate"; label: string; to: string };

export interface StepGuide {
  slug: "unconscious" | "burn" | "injury";
  title: string;
  subtitle: string;
  /** Primary CTA — typically navigates (e.g. to SOS). */
  cta: string;
  ctaTo?: string;
  /** Optional secondary action shown above the primary CTA (modal trigger). */
  action?: GuideAction;
  steps: Step[];
}

// Google Drive share link → embeddable preview URL
const CPR_VIDEO_EMBED =
  "https://drive.google.com/file/d/12bura3AqTliQNhquaC-qYcQ9jpsqXIUB/preview";

export const STEP_GUIDES: Record<StepGuide["slug"], StepGuide> = {
  unconscious: {
    slug: "unconscious",
    title: "Unconscious",
    subtitle: "Follow these steps carefully",
    cta: "Start CPR",
    ctaTo: "/sos",
    action: {
      type: "video",
      label: "Watch CPR Video",
      title: "CPR Demonstration",
      videoUrl: CPR_VIDEO_EMBED,
    },
    steps: [
      {
        emoji: "🚨",
        title: "Check Responsiveness",
        description: "Gently tap the person and ask “Are you okay?”",
        warning: "Do not shake the person!",
      },
      {
        emoji: "👄",
        title: "Open Airway",
        description: "Tilt the head back and lift the chin to open the airway.",
      },
      {
        emoji: "👂",
        title: "Check Breathing",
        description: "Look, listen and feel for breathing for 10 seconds.",
      },
      {
        emoji: "📞",
        title: "Call Emergency Services",
        description: "If no breathing, call 112 immediately!",
      },
      {
        emoji: "➕",
        title: "Prepare for CPR",
        description: "If the person is not breathing.",
        highlight: true,
      },
    ],
  },
  burn: {
    slug: "burn",
    title: "Burn",
    subtitle: "Treat burns calmly and quickly",
    cta: "Send Medical Kit",
    ctaTo: "/medical-kit",
    action: {
      type: "kit",
      label: "Get First Aid Kit",
      items: [
        "Clean cloth / sterile gauze",
        "Running water / cooling",
        "Burn ointment (if minor)",
      ],
    },
    steps: [
      {
        emoji: "💧",
        title: "Cool the Burn",
        description: "Hold the burn under cool running water for at least 10 minutes.",
      },
      {
        emoji: "💍",
        title: "Remove Tight Items",
        description:
          "Take off rings, watches and tight clothing near the burn before swelling starts.",
      },
      {
        emoji: "🧻",
        title: "Cover with Clean Cloth",
        description: "Loosely cover the burn with a clean, non-fluffy cloth or sterile dressing.",
      },
      {
        emoji: "🚫",
        title: "Do NOT Apply Ice or Creams",
        description: "Avoid ice, butter, toothpaste or ointments — they can worsen the injury.",
        warning: "Seek medical help if the burn is large or deep!",
      },
      {
        emoji: "✅",
        title: "Monitor & Comfort",
        description: "Keep the person warm and watch for signs of shock.",
        highlight: true,
      },
    ],
  },
  injury: {
    slug: "injury",
    title: "Injury",
    subtitle: "Stop the bleeding, then treat the wound",
    cta: "Send Medical Kit",
    ctaTo: "/medical-kit",
    action: {
      type: "kit",
      label: "Get First Aid Kit",
      items: ["Bandage", "Antiseptic", "Gloves", "Clean cloth"],
    },
    steps: [
      {
        emoji: "🩸",
        title: "Stop the Bleeding",
        description: "Apply firm, steady pressure with a clean cloth or gauze.",
        warning: "Do not remove embedded objects!",
      },
      {
        emoji: "🚿",
        title: "Clean the Wound",
        description: "Once bleeding slows, rinse gently with clean water to remove debris.",
      },
      {
        emoji: "🩹",
        title: "Apply a Bandage",
        description: "Cover with a sterile bandage and secure it snugly — not too tight.",
      },
      {
        emoji: "🏥",
        title: "Seek Medical Help if Severe",
        description: "Deep cuts, heavy bleeding or signs of infection need professional care.",
        highlight: true,
      },
    ],
  },
};
