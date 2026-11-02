import Image from "next/image";

export function ScrollStory() {
  return <div className="story-image">
    <div className="story-image-inner">
      <Image src="/images/WhatsApp Image 2026-10-30 at 10.29.18 PM (1).jpeg" alt="JD CORP office with illuminated walnut shelving, world map panel and executive desk" fill sizes="100vw" className="cover-image" />
    </div>
    <div className="story-image-overlay"><span>01 — THE LONG VIEW</span><span>SPACE TO THINK BIGGER</span></div>
  </div>;
}
