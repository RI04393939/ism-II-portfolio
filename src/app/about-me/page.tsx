import Image from 'next/image';
import Arrow from '@/components/Arrow/Arrow';

export default function AboutMe() {
  return (
    <main className="page">
      <h1 className="page-title">About Me</h1>

      <section className="section">
        <div className="profile">
          <div className="profile-photo">
            <Image
              src="/profile-new.jpg"
              alt="Portrait of Rithvik Inampudi"
              fill
              priority
              sizes="(min-width: 720px) 15rem, 16rem"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>

          <div>
            <h2 className="section-title">Biography</h2>
            <div className="prose">
              <p>
                Rithvik Inampudi is a student in the Independent Study and Mentorship program, where his
                topic of study is electronics. His interest sits where hardware meets intelligence: the
                circuits, boards, and chips that machine learning models actually run on, and how a
                firmer grasp of that layer changes what those models are capable of.
              </p>
              <p>
                Alongside electronics he works in artificial intelligence and deep learning, building on a
                foundation in mathematics and computer science. He is drawn to applying neural networks to
                complex, real-world challenges rather than to benchmarks alone, and through ISM he is
                deepening that work through research, mentorship, and an original project.
              </p>
              <p>
                He takes his approach from Marcus Aurelius: &ldquo;What stands in the way becomes the
                way.&rdquo; An obstacle in a design or a model is treated as the substance of the work
                rather than a detour around it. The long-term goal is to build intelligent systems that
                make a practical, measurable difference in people&apos;s lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Mission Statement</h2>
        <p className="lead">
          My mission is to contribute meaningfully to the field of deep learning by developing
          intelligent systems that solve real-world problems and push the boundaries of AI research.
          I aim to create impactful technologies that not only advance the field technically but also
          lead to practical improvements in people&apos;s lives. Through continuous learning and
          collaboration, I hope to make a positive difference in society by using deep learning as
          a tool for innovation and social good.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Résumé</h2>
        <a className="button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          View résumé
          <Arrow dir="up-right" />
        </a>
      </section>

      <section className="section">
        <h2 className="section-title">Contact</h2>
        <dl className="facts">
          <div>
            <dt>Email</dt>
            <dd>
              <a className="link" href="mailto:rithvik.inampudi@gmail.com">rithvik.inampudi@gmail.com</a>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a className="link" href="https://linkedin.com/in/rithvik-inampudi" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/rithvik-inampudi
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
