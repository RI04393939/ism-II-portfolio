import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="page-container">
      <Link
        href="/blog"
        style={{ display: 'inline-block', marginBottom: '1.5rem', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}
      >
        ← Back to Blog
      </Link>

      <div className="reveal" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--card-border)', marginBottom: '2rem' }}>
        <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 900px) 900px, 100vw" style={{ objectFit: 'cover' }} />
      </div>

      <p className="page-subheading reveal">{post.date}</p>
      <h1 className="page-heading reveal" style={{ marginBottom: '1.5rem' }}>{post.title}</h1>

      <div className="content-card reveal">
        <p style={{ color: '#aaa', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: post.body.length ? '1.5rem' : 0 }}>
          {post.summary}
        </p>
        {post.body.map((para, i) => (
          <p key={i} style={{ color: '#888', lineHeight: 1.8, fontSize: '0.85rem', marginBottom: i === post.body.length - 1 ? 0 : '1rem' }}>
            {para}
          </p>
        ))}
      </div>
    </main>
  );
}
