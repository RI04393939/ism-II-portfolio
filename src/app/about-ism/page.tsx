import Image from 'next/image';

export default function AboutISM() {
  return (
    <main className="page">
      <h1 className="page-title">About ISM</h1>

      <section className="section">
        <div className="logo-plate">
          <Image
            src="/ism-logo.png"
            alt="ISM logo: Choose Excellence. Exemplify Character."
            width={320}
            height={160}
            style={{ objectFit: 'contain', width: 'min(300px, 100%)', height: 'auto' }}
          />
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">About the Program</h2>
        <div className="prose">
          <p>
            ISM — Independent Study Mentorship — is a year-long, research-based program that connects
            high school students with professionals in their field of interest. Students develop
            real-world skills through primary and secondary research, mentorship, and an original work
            project, culminating in a final product that demonstrates mastery of their chosen topic.
          </p>
          <p>
            The program emphasizes professional development, independent thinking, and the application
            of academic knowledge to real-world problems. Students engage directly with industry
            mentors, conduct original research, and present their findings to panels of professionals —
            building the skills needed for college and career success.
          </p>
        </div>
      </section>
    </main>
  );
}
