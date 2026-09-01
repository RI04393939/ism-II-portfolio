export default function Home() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      {/* Corner subheading, replaces the old inline hero label */}
      <p className="corner-label">ISM Digital Portfolio</p>

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 1.5rem',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontSize: 'clamp(1.6rem, 8.2vw, 6.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: '1.25rem',
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }}>
          Rithvik Inampudi
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2.75rem',
        }}>
          <div style={{ width: 32, height: 1, background: 'var(--accent)', opacity: 0.5 }} />
          <p className="topic-sweep">Topic of Study: Electronics</p>
          <div style={{ width: 32, height: 1, background: 'var(--accent)', opacity: 0.5 }} />
        </div>

        <blockquote className="hero-quote">
          &ldquo;What stands in the way becomes the way&rdquo;
          <footer>— Marcus Aurelius</footer>
        </blockquote>
      </section>
    </main>
  );
}
