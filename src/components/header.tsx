"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import StarBorder from "@/components/star-border";
import { navigation } from "@/data/site";

const explore = [
  { number: "01", label: "The seven businesses", href: "/businesses", note: "From the first plot to the final guest" },
  { number: "02", label: "How we engage", href: "/services", note: "Four stages, in order" },
  { number: "03", label: "Projects", href: "/projects", note: "Published as each one is verified" },
  { number: "04", label: "Responsibility", href: "/sustainability", note: "Build as if you will keep it" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (open) {
        setHidden(false);
        lastScrollY.current = currentY;
        return;
      }
      if (currentY <= 60) {
        setHidden(false);
        lastScrollY.current = currentY;
        return;
      }
      if (currentY > lastScrollY.current + 8) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 8) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); (window.matchMedia("(max-width: 800px)").matches ? mobileButtonRef : triggerRef).current?.focus(); }
      if (event.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>("a, button");
        if (!focusable?.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("menu-open");
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus());
    return () => { cancelAnimationFrame(frame); document.removeEventListener("keydown", onKeyDown); document.body.classList.remove("menu-open"); if (previous?.isConnected && document.activeElement === document.body) previous.focus(); };
  }, [open]);

  return (
    <header className={`site-header ${hidden ? "is-hidden" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="wordmark" aria-label="JD CORP home" onClick={() => setOpen(false)}><img src="/images/logo.png" alt="JD CORP" className="wordmark-logo" /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.slice(0, 3).map((item) => <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <button ref={triggerRef} type="button" className={open ? "nav-explore active" : "nav-explore"} aria-expanded={open} aria-controls="navigation-canvas" onClick={() => setOpen(!open)}>Explore <span>{open ? "−" : "+"}</span></button>
        </nav>
        <div className="header-actions">
          <StarBorder as={Link} href="/contact" className="header-contact" onClick={() => setOpen(false)} color="#D7B574" trailColor="#E7C98A" duration={4} direction="clockwise" stars={1} trailLength={0.3} thickness={1} radius={2} glow={0.6} hover="lap" sparkle={false} clickPulse theme="dark" borderColor="rgba(215,181,116,.5)">LET&apos;S CONNECT <ArrowUpRight size={15} strokeWidth={1.6} /></StarBorder>
          <button ref={mobileButtonRef} className="menu-button" type="button" aria-expanded={open} aria-controls="navigation-canvas" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      <div id="navigation-canvas" ref={panelRef} className={`nav-canvas ${open ? "is-open" : ""}`} inert={!open}>
        <div className="nav-canvas-inner container">
          <div className="nav-canvas-side"><span className="eyebrow">JD CORP / DIRECTORY</span><p>Land to landmark,<br />under one roof<span className="serif-period">.</span></p><span className="nav-canvas-caption">Seven businesses. One group.</span></div>
          <nav aria-label="Explore website" className="nav-canvas-links">
            {explore.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}><span className="nav-number">{item.number}</span><span>{item.label}<small>{item.note}</small></span><ArrowUpRight size={24} strokeWidth={1} /></Link>)}
          </nav>
          <div className="mobile-extra"><Link href="/about" onClick={() => setOpen(false)}>About</Link><Link href="/insights" onClick={() => setOpen(false)}>Journal</Link><Link href="/careers" onClick={() => setOpen(false)}>Careers</Link><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></div>
          <div className="nav-canvas-bottom"><span>BUSINESS BEYOND BOUNDARIES</span><Link href="/contact" onClick={() => setOpen(false)}>Start a conversation <ArrowUpRight size={14} /></Link></div>
        </div>
      </div>
    </header>
  );
}
