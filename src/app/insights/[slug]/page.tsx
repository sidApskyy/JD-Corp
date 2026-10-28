import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { insights, visible } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return visible(insights).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = visible(insights).find((item) => item.slug === slug);
  return article ? { title: article.title, description: article.summary, alternates: { canonical: `/insights/${slug}` } } : { title: "Article not found" };
}
export default async function InsightDetail({ params }: Props) {
  const { slug } = await params;
  const article = visible(insights).find((item) => item.slug === slug);
  if (!article) notFound();
  const related = visible(insights).filter((item) => item.slug !== slug).slice(0, 2);
  return <article><div className="article-head container"><Link href="/insights" className="back-link"><ArrowLeft size={16} /> ALL INSIGHTS</Link><span className="eyebrow">{article.category.toUpperCase()} / {article.date}</span><h1>{article.title}</h1><p>{article.summary}</p></div><div className="article-image"><Image src={article.image} alt="" fill preload sizes="100vw" className="cover-image" /></div><div className="article-body">{article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>{related.length > 0 && <div className="container related-articles"><span className="eyebrow">KEEP READING</span>{related.map((item) => <Link href={`/insights/${item.slug}`} key={item.slug}>{item.title}</Link>)}</div>}</article>;
}
