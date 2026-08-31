export default function MentorBio() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">Mentor Bio</h1>

      <div className="placeholder-box reveal" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>—</span>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>Coming Soon</p>
        <p style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'none', letterSpacing: '0.05em', maxWidth: '320px', textAlign: 'center', lineHeight: 1.6 }}>
          Mentor biography and photo will be added once a mentorship is established.
        </p>
      </div>
    </main>
  );
}
