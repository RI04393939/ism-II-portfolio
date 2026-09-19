import PhotoCard from '@/components/PhotoCard/PhotoCard';
import { researchAssessments } from '@/data/research';

const interviews = [
  { date: 'January 14, 2026', subject: 'Interview with Subramanian Sankaran — Introduction to Deep Learning Research' },
  { date: 'February 11, 2026', subject: 'Interview with Subramanian Sankaran — Neural Network Architectures & Transformer Models' },
  { date: 'March 4, 2026', subject: 'Interview with Subramanian Sankaran — Large Language Models & Fine-Tuning Strategies' },
];

const mentorVisits = [
  { date: 'January 28, 2026', subject: 'Mentor Visit #1 — Workspace Tour & Research Goal Setting' },
  { date: 'February 25, 2026', subject: 'Mentor Visit #2 — Hands-On Session: PyTorch & Model Training Pipelines' },
  { date: 'March 18, 2026', subject: 'Mentor Visit #3 — Literature Review Discussion & Paper Deep-Dive' },
  { date: 'April 15, 2026', subject: 'Mentor Visit #4 — Original Work Checkpoint & Experiment Design' },
  { date: 'May 20, 2026', subject: 'Mentor Visit #5 — Final Project Review & Presentation Feedback' },
];

function Rows({ items }: { items: { date: string; subject: string }[] }) {
  return (
    <ul className="rows">
      {items.map((item) => (
        <li key={item.date} className="row">
          <span className="row-title">{item.subject}</span>
          <time>{item.date}</time>
        </li>
      ))}
    </ul>
  );
}

export default function Research() {
  return (
    <main className="page">
      <h1 className="page-title">Research</h1>

      <section className="section">
        <h2 className="section-title">Primary Sources</h2>
        <h3 className="subsection-title">Interviews</h3>
        <Rows items={interviews} />
        <h3 className="subsection-title">Mentor Visits</h3>
        <Rows items={mentorVisits} />
      </section>

      <section className="section">
        <h2 className="section-title">Secondary Sources</h2>
        {researchAssessments.length === 0 ? (
          <p className="note">Research assessments will appear here, ordered newest to oldest.</p>
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
      </section>
    </main>
  );
}
