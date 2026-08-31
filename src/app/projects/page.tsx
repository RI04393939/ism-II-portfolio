export default function Projects() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">Projects</h1>

      {/* Original Work */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <p className="page-subheading">Original Work</p>
        <div className="placeholder-box" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: 0 }}>
          <span style={{ fontSize: '2rem', opacity: 0.2 }}>◇</span>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>Coming Soon</p>
          <p style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'none', letterSpacing: '0.05em', maxWidth: '340px', textAlign: 'center', lineHeight: 1.7 }}>
            Original work details and proposal will be added here.
          </p>
        </div>
      </div>

      {/* Final Product */}
      <div className="reveal">
        <p className="page-subheading">Final Product</p>
        <div className="placeholder-box" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: 0 }}>
          <span style={{ fontSize: '2rem', opacity: 0.2 }}>◆</span>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>Coming Soon</p>
          <p style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'none', letterSpacing: '0.05em', maxWidth: '340px', textAlign: 'center', lineHeight: 1.7 }}>
            Final product details and documentation will be added here.
          </p>
        </div>
      </div>
    </main>
  );
}
