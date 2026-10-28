import type { CSSProperties, ReactElement, ReactNode } from "react";

type TiltedCardProps = {
  imageSrc?: string; altText?: string; captionText?: string; showTooltip?: boolean;
  containerWidth?: number | string; containerHeight?: number | string;
  imageWidth?: number | string; imageHeight?: number | string;
  rotateAmplitude?: number; scaleOnHover?: number; perspective?: number | string;
  radius?: number | string; smoothness?: number; glare?: number; glareColor?: string;
  shadow?: number; parallax?: number; axis?: "both" | "horizontal" | "vertical";
  reverse?: boolean; trackWindow?: boolean; floating?: boolean; gyroscope?: boolean;
  intro?: boolean; introDelay?: number; overlayContent?: ReactNode;
  displayOverlayContent?: boolean; overlayDepth?: number;
  backContent?: ReactNode; flipOnClick?: boolean; flipped?: boolean;
  onFlip?: (flipped: boolean) => void; onClick?: (event: unknown) => void;
  children?: ReactNode; className?: string; style?: CSSProperties;
};
export function TiltedCardLayer(props: { depth?: number; className?: string; style?: CSSProperties; children?: ReactNode }): ReactElement;
declare function TiltedCard(props: TiltedCardProps): ReactElement;
export default TiltedCard;
