import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { researchAssessments } from '@/data/research';

export const dynamicParams = false;

export function generateStaticParams() {
  return researchAssessments.map((item) => ({ slug: item.slug }));
}

export default function ResearchAssessmentPage({ params }: { params: { slug: string } }) {
  const item = researchAssessments.find((r) => r.slug === params.slug);
  if (!item) notFound();

  return (
    <main className="page-container">
      <Link
        href="/research"
        style={{ display: 'inline-block', marginBottom: '1.5rem', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}
      >
        ← Back to Research
      </Link>

      <div className="reveal" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--card-border)', marginBottom: '2rem' }}>
        <Image src={item.image} alt={item.title} fill priority sizes="(min-width: 900px) 900px, 100vw" style={{ objectFit: 'cover' }} />
      </div>

      <p className="page-subheading reveal">{item.label} · {item.date}</p>
      <h1 className="page-heading reveal" style={{ marginBottom: '1.5rem' }}>{item.title}</h1>

      <div className="content-card reveal">
        {item.file && (
          <a
            href={item.file}
            download
            style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1.1rem', border: '1px solid rgba(96,165,250,0.3)', color: 'var(--accent)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '4px' }}
          >
            Download ↓
          </a>
        )}
        <p style={{ color: '#aaa', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: item.body.length ? '1.5rem' : 0 }}>
          {item.summary}
        </p>
        {item.body.map((para, i) => (
          <p key={i} style={{ color: '#888', lineHeight: 1.8, fontSize: '0.85rem', marginBottom: i === item.body.length - 1 ? 0 : '1rem' }}>
            {para}
          </p>
        ))}
      </div>
    </main>
  );
}
