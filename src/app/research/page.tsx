import PhotoCard from '@/components/PhotoCard/PhotoCard';
import { researchAssessments } from '@/data/research';

export default function Research() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">Research</h1>

      {/* Primary Sources */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <p className="page-subheading">Primary Sources</p>

        <div className="content-card" style={{ marginBottom: '1rem' }}>
          <p style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Interviews
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { date: 'January 14, 2026', subject: 'Interview with Subramanian Sankaran — Introduction to Deep Learning Research' },
              { date: 'February 11, 2026', subject: 'Interview with Subramanian Sankaran — Neural Network Architectures & Transformer Models' },
              { date: 'March 4, 2026',    subject: 'Interview with Subramanian Sankaran — Large Language Models & Fine-Tuning Strategies' },
            ].map((item) => (
              <div key={item.date} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                border: '1px solid var(--card-border)',
                borderRadius: '6px',
                gap: '1rem',
                flexWrap: 'wrap',
              }}>
                <span style={{ color: '#ccc', fontSize: '0.85rem', flex: 1 }}>{item.subject}</span>
                <span style={{ color: 'var(--accent)', fontSize: '0.65rem', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card">
          <p style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Mentor Visits
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { date: 'January 28, 2026', subject: 'Mentor Visit #1 — Workspace Tour & Research Goal Setting' },
              { date: 'February 25, 2026', subject: 'Mentor Visit #2 — Hands-On Session: PyTorch & Model Training Pipelines' },
              { date: 'March 18, 2026',   subject: 'Mentor Visit #3 — Literature Review Discussion & Paper Deep-Dive' },
              { date: 'April 15, 2026',   subject: 'Mentor Visit #4 — Original Work Checkpoint & Experiment Design' },
              { date: 'May 20, 2026',     subject: 'Mentor Visit #5 — Final Project Review & Presentation Feedback' },
            ].map((item) => (
              <div key={item.date} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                border: '1px solid var(--card-border)',
                borderRadius: '6px',
                gap: '1rem',
                flexWrap: 'wrap',
              }}>
                <span style={{ color: '#ccc', fontSize: '0.85rem', flex: 1 }}>{item.subject}</span>
                <span style={{ color: 'var(--accent)', fontSize: '0.65rem', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Sources */}
      <div className="reveal">
        <p className="page-subheading">Secondary Sources</p>

        {researchAssessments.length === 0 ? (
          <div className="placeholder-box" style={{ minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: 0 }}>
            <span style={{ fontSize: '2rem', opacity: 0.2 }}>◈</span>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>No assessments yet</p>
            <p style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'none', letterSpacing: '0.05em', maxWidth: '340px', textAlign: 'center', lineHeight: 1.7 }}>
              Research assessments will appear here, ordered newest to oldest.
            </p>
          </div>
        ) : (
          <div className="card-grid">
            {researchAssessments.map((item, i) => (
              <PhotoCard
                key={item.slug}
                href={`/research/${item.slug}`}
                src={item.image}
                alt={item.title}
                label={item.label}
                title={item.title}
                priority={i < 3}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
