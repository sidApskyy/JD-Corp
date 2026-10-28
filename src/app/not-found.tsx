import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return <section className="not-found container"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>Not all paths<br />lead <em>forward.</em></h1><p>We couldn&apos;t find the page you were looking for.</p><Link href="/" className="button-dark">RETURN HOME <ArrowUpRight size={17} /></Link></section>;
}
