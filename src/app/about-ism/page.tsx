import Image from 'next/image';

export default function AboutISM() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">About ISM</h1>

      {/* Logo */}
      <div className="content-card reveal" style={{ display: 'flex', justifyContent: 'center', padding: '3rem 2rem' }}>
        <Image
          src="/ism-logo.png"
          alt="ISM Logo — Choose Excellence. Exemplify Character."
          width={320}
          height={160}
          style={{ objectFit: 'contain', filter: 'brightness(1.05)' }}
        />
      </div>

      {/* Description */}
      <div className="content-card reveal">
        <p className="page-subheading">About the Program</p>
        <p style={{ color: '#aaa', lineHeight: 1.9, fontSize: '0.9rem' }}>
          ISM — Independent Study Mentorship — is a year-long, research-based program that connects
          high school students with professionals in their field of interest. Students develop
          real-world skills through primary and secondary research, mentorship, and an original work
          project, culminating in a final product that demonstrates mastery of their chosen topic.
        </p>
        <p style={{ color: '#aaa', lineHeight: 1.9, fontSize: '0.9rem', marginTop: '1rem' }}>
          The program emphasizes professional development, independent thinking, and the application
          of academic knowledge to real-world problems. Students engage directly with industry
          mentors, conduct original research, and present their findings to panels of professionals —
          building the skills needed for college and career success.
        </p>
      </div>
    </main>
  );
}
