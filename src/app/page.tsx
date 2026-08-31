import Image from 'next/image';

export default function Home() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      {/* Background image */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <Image
          src="/dl-bg.jpeg"
          alt="Deep learning background"
          fill
          style={{ objectFit: 'cover', opacity: 0.38 }}
          priority
        />
      </div>
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 2rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          opacity: 0.7,
          marginBottom: '1rem',
        }}>
          ISM Digital Portfolio
        </p>

        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: '1rem',
          color: '#ffffff',
        }}>
          Rithvik<br />Inampudi
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2.5rem',
        }}>
          <div style={{ width: 32, height: 1, background: 'var(--accent)', opacity: 0.5 }} />
          <p style={{
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#888',
          }}>
            Topic of Study: Deep Learning
          </p>
        </div>

        <blockquote style={{
          maxWidth: '520px',
          borderLeft: '2px solid rgba(96, 165, 250, 0.3)',
          paddingLeft: '1.25rem',
          color: '#999',
          fontSize: '0.85rem',
          lineHeight: 1.7,
          fontStyle: 'italic',
          letterSpacing: '0.03em',
        }}>
          &ldquo;Intelligence is usually easy to tell in a 10-minute conversation. Determination is harder&rdquo;
          <footer style={{ marginTop: '0.75rem', fontSize: '0.7rem', fontStyle: 'normal', letterSpacing: '0.1em', color: '#666', textTransform: 'uppercase' }}>
            — Sam Altman, CEO of OpenAI
          </footer>
        </blockquote>
      </section>
    </main>
  );
}
