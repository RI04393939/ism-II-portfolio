import PhotoCard from '@/components/PhotoCard/PhotoCard';
import { blogPosts } from '@/data/blog';

export default function Blog() {
  return (
    <main className="page">
      <h1 className="page-title">Blog</h1>

      {blogPosts.length === 0 ? (
        <p className="note">No posts yet. Weekly blog posts will appear here, ordered newest to oldest.</p>
      ) : (
        <div className="card-grid">
          {blogPosts.map((post, i) => (
            <PhotoCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              src={post.image}
              alt={post.title}
              label={post.date}
              title={post.title}
              priority={i < 3}
            />
          ))}
        </div>
      )}
    </main>
  );
}
