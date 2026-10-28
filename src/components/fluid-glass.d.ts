import type { CSSProperties, ReactElement, ReactNode } from "react";
type Props = {
  text?: string; src?: string; fit?: "cover" | "contain"; background?: string;
  textColor?: string; fontFamily?: string; fontWeight?: number | string; fontSize?: number;
  shape?: "lens" | "blob" | "cube" | "pill" | "torus" | "prism" | "diamond"; shapes?: string[];
  morphOnClick?: boolean; onShapeChange?: (shape: string) => void;
  size?: number; refraction?: number; dispersion?: number; frost?: number;
  color?: string; tint?: number; reflection?: number; shadow?: number; elevation?: number;
  interaction?: "follow" | "drag" | "static"; smoothness?: number; wobble?: number; spin?: number;
  idle?: boolean; intro?: boolean; position?: [number, number]; maxDevicePixelRatio?: number;
  children?: ReactNode; className?: string; style?: CSSProperties;
};
declare function FluidGlass(props: Props): ReactElement;
export default FluidGlass;
