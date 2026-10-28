import type { CSSProperties, ReactElement, ReactNode } from "react";

type FadeContentProps = {
  children?: ReactNode;
  container?: string | HTMLElement | null;
  effect?: "fade" | "focus" | "develop" | "dissolve" | "mist" | "pixel";
  blur?: boolean | number;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  stagger?: number;
  staggerFrom?: "start" | "end" | "center" | "edges" | "random";
  trigger?: "scroll" | "mount";
  once?: boolean;
  exit?: boolean;
  scrub?: boolean | number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onStart?: () => void;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
  style?: CSSProperties;
};

declare function FadeContent(props: FadeContentProps): ReactElement;
export default FadeContent;
