export default function Projects() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">Projects</h1>

      {/* Original Work */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <p className="page-subheading">Original Work</p>
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ddd', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                Adaptive Resolution Vision Simulator
              </h2>
              <p style={{ fontSize: '0.65rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Deep Learning · October 24, 2025
              </p>
            </div>
            <a
              href="/original-work-proposal.docx"
              download
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.1rem',
                border: '1px solid rgba(96,165,250,0.3)',
                color: 'var(--accent)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              Download ↓
            </a>
          </div>
          <p style={{ color: '#888', lineHeight: 1.8, fontSize: '0.85rem' }}>
            An interactive educational web application that demonstrates how deep learning models can
            operate more efficiently by dynamically adjusting image resolution based on prediction
            confidence. The system reduces computational usage by up to 50% while maintaining accuracy
            within 1–2% — making adaptive AI efficiency concepts accessible to students and educators.
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Python', 'PyTorch', 'Computer Vision', 'Gradio', 'Green AI'].map(tag => (
              <span key={tag} className="skill-pill">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Final Product */}
      <div className="reveal">
        <p className="page-subheading">Final Product</p>
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ddd', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                AI-Powered Waste Detection Model
              </h2>
              <p style={{ fontSize: '0.65rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Deep Learning · March 26, 2026
              </p>
            </div>
            <a
              href="/final-product-assessment.docx"
              download
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.1rem',
                border: '1px solid rgba(96,165,250,0.3)',
                color: 'var(--accent)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              Download ↓
            </a>
          </div>
          <p style={{ color: '#888', lineHeight: 1.8, fontSize: '0.85rem' }}>
            A computer vision model trained to detect and classify multiple waste categories from
            images, demonstrating a practical application of deep learning to environmental challenges.
            The project involved dataset preparation, annotation, model training, and performance
            evaluation using precision, recall, and mAP metrics — progressing from concept to a
            functioning prototype.
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Python', 'Computer Vision', 'Object Detection', 'Dataset Annotation', 'mAP Evaluation'].map(tag => (
              <span key={tag} className="skill-pill">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
