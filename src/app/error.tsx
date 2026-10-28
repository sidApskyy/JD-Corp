"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="not-found container" role="alert"><span className="eyebrow">SOMETHING WENT WRONG</span><h1>Let&apos;s try<br /><em>that again.</em></h1><p>We couldn&apos;t load this page just now.</p><button className="button-dark" type="button" onClick={reset}>TRY AGAIN</button></section>;
}
