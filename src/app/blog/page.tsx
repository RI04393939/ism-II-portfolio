export default function Blog() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">Blog</h1>

      <div className="placeholder-box reveal" style={{ minHeight: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '2rem', opacity: 0.2 }}>✎</span>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>No posts yet</p>
        <p style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'none', letterSpacing: '0.05em', maxWidth: '340px', textAlign: 'center', lineHeight: 1.7 }}>
          Weekly blog posts will appear here, ordered newest to oldest.
        </p>
      </div>
    </main>
  );
}
