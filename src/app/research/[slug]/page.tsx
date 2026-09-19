import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Arrow from '@/components/Arrow/Arrow';
import { researchAssessments } from '@/data/research';

export const dynamicParams = false;

export function generateStaticParams() {
  return researchAssessments.map((item) => ({ slug: item.slug }));
}

export default function ResearchAssessmentPage({ params }: { params: { slug: string } }) {
  const item = researchAssessments.find((r) => r.slug === params.slug);
  if (!item) notFound();

  return (
    <main className="page detail">
      <Link href="/research" className="back-link">
        <Arrow dir="left" />
        Back to Research
      </Link>

      <p className="meta">{item.label} · {item.date}</p>
      <h1 className="page-title">{item.title}</h1>

      <div className="detail-figure">
        <Image src={item.image} alt={item.title} fill priority sizes="(min-width: 820px) 820px, 100vw" style={{ objectFit: 'cover' }} />
      </div>

      <p className="lead">{item.summary}</p>
      <div className="prose">
        {item.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {item.file && (
        <a className="button" href={item.file} download style={{ marginTop: '2.5rem' }}>
          Download
          <Arrow dir="down" />
        </a>
      )}
    </main>
  );
}
