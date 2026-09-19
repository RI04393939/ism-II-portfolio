import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Arrow from '@/components/Arrow/Arrow';
import { blogPosts } from '@/data/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="page detail">
      <Link href="/blog" className="back-link">
        <Arrow dir="left" />
        Back to Blog
      </Link>

      <p className="meta">{post.date}</p>
      <h1 className="page-title">{post.title}</h1>

      <div className="detail-figure">
        <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 820px) 820px, 100vw" style={{ objectFit: 'cover' }} />
      </div>

      <p className="lead">{post.summary}</p>
      <div className="prose">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </main>
  );
}
