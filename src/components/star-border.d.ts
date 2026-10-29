import type { CSSProperties, ElementType, ReactElement, ReactNode } from "react";
type Props = {
  as?: ElementType; children?: ReactNode; className?: string; style?: CSSProperties;
  color?: string; trailColor?: string; duration?: number; thickness?: number; radius?: number;
  trailLength?: number; stars?: number; glow?: number; sparkle?: boolean;
  direction?: "clockwise" | "counterclockwise"; hover?: "lap" | "brighten" | "reveal" | "none";
  clickPulse?: boolean; theme?: "dark" | "light";
  backgroundColor?: string; textColor?: string; borderColor?: string;
  href?: string; onClick?: () => void; "aria-label"?: string;
};
declare function StarBorder(props: Props): ReactElement;
export default StarBorder;
