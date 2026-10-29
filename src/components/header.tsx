"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import StarBorder from "@/components/star-border";
import { navigation } from "@/data/site";

const explore = [
  { number: "01", label: "Sectors in focus", href: "/businesses", note: "Across places, resources and industry" },
  { number: "02", label: "Services & approach", href: "/services", note: "From the first idea onward" },
  { number: "03", label: "Project portfolio", href: "/projects", note: "Verified work as it becomes available" },
  { number: "04", label: "Responsibility", href: "/sustainability", note: "Built around what matters" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const pathname = usePathname();
  const floating = pathname === "/";

  useEffect(() => {
    if (!floating) return;
    const onScroll = () => setShown(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [floating]);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

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
    <header className={`site-header ${floating && !shown ? "is-hidden" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="wordmark" aria-label="JD CORP home" onClick={() => setOpen(false)}><img src="/images/logo.png" alt="JD CORP" className="wordmark-logo" /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.slice(0, 3).map((item) => <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <button ref={triggerRef} type="button" className={open ? "nav-explore active" : "nav-explore"} aria-expanded={open} aria-controls="navigation-canvas" onClick={() => setOpen(!open)}>Explore <span>{open ? "−" : "+"}</span></button>
        </nav>
        <div className="header-actions">
          <StarBorder as={Link} href="/contact" className="header-contact" onClick={() => setOpen(false)} color="#b7a17a" trailColor="#e8d8bd" duration={5} direction="counterclockwise" stars={2} trailLength={0.45} thickness={1.5} radius={6} glow={0.75} hover="reveal" sparkle={false} clickPulse theme="dark">Let&apos;s talk <ArrowUpRight size={15} strokeWidth={1.6} /></StarBorder>
          <button ref={mobileButtonRef} className="menu-button" type="button" aria-expanded={open} aria-controls="navigation-canvas" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      <div id="navigation-canvas" ref={panelRef} className={`nav-canvas ${open ? "is-open" : ""}`} inert={!open}>
        <div className="nav-canvas-inner container">
          <div className="nav-canvas-side"><span className="eyebrow">JD CORP / DIRECTORY</span><p>Across the fields<br />that shape tomorrow<span className="serif-period">.</span></p><span className="nav-canvas-caption">One perspective. Many disciplines.</span></div>
          <nav aria-label="Explore website" className="nav-canvas-links">
            {explore.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}><span className="nav-number">{item.number}</span><span>{item.label}<small>{item.note}</small></span><ArrowUpRight size={24} strokeWidth={1} /></Link>)}
          </nav>
          <div className="mobile-extra"><Link href="/about" onClick={() => setOpen(false)}>About</Link><Link href="/insights" onClick={() => setOpen(false)}>Insights</Link><Link href="/careers" onClick={() => setOpen(false)}>Careers</Link><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></div>
          <div className="nav-canvas-bottom"><span>BUILDING WITH PURPOSE</span><Link href="/contact" onClick={() => setOpen(false)}>Start a conversation <ArrowUpRight size={14} /></Link></div>
        </div>
      </div>
    </header>
  );
}
