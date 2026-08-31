import Image from 'next/image';

export default function AboutMe() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">About Me</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Professional photo */}
        <div className="reveal" style={{ position: 'relative', minHeight: '320px', borderRadius: '8px', overflow: 'hidden' }}>
          <Image
            src="/profile-new.jpg"
            alt="Rithvik Inampudi — professional photo"
            fill
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>

        {/* Bio */}
        <div className="content-card reveal">
          <p className="page-subheading">Biography</p>
          <p style={{ color: '#aaa', lineHeight: 1.8, fontSize: '0.9rem' }}>
            Rithvik Inampudi is a student passionate about artificial intelligence and deep learning.
            With a strong foundation in mathematics and computer science, he is dedicated to exploring
            how neural networks and machine learning models can be applied to solve complex, real-world
            challenges. Through the ISM program, Rithvik is actively deepening his expertise in deep
            learning research and development, with a long-term goal of building intelligent systems
            that create meaningful impact.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="content-card reveal">
        <p className="page-subheading">Mission Statement</p>
        <p style={{ color: '#aaa', lineHeight: 1.8, fontSize: '0.9rem' }}>
          My mission is to contribute meaningfully to the field of deep learning by developing
          intelligent systems that solve real-world problems and push the boundaries of AI research.
          I aim to create impactful technologies that not only advance the field technically but also
          lead to practical improvements in people&apos;s lives. Through continuous learning and
          collaboration, I hope to make a positive difference in society by using deep learning as
          a tool for innovation and social good.
        </p>
      </div>

      {/* Resume */}
      <div className="content-card reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="page-subheading">Résumé</p>
          <p style={{ color: '#666', fontSize: '0.8rem' }}>View or download my résumé</p>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.6rem 1.4rem',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            borderRadius: '4px',
          }}
        >
          View Résumé ↗
        </a>
      </div>

      {/* Contact */}
      <div className="content-card reveal">
        <p className="page-subheading">Contact Information</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#444', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', width: '60px' }}>Email</span>
            <a
              href="mailto:rithvik.inampudi@gmail.com"
              style={{ color: '#aaa', fontSize: '0.85rem' }}
            >
              rithvik.inampudi@gmail.com
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#444', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', width: '60px' }}>LinkedIn</span>
            <a
              href="https://linkedin.com/in/rithvik-inampudi"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#aaa', fontSize: '0.85rem' }}
            >
              linkedin.com/in/rithvik-inampudi ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
