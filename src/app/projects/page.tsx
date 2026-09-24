import PhotoCard from '@/components/PhotoCard/PhotoCard';

export default function Projects() {
  return (
    <main className="page">
      <h1 className="page-title">Projects</h1>

      <section className="section">
        <h2 className="section-title">Original Work</h2>
        <div className="card-single">
          <PhotoCard
            src="/cards/placeholder.svg"
            alt=""
            label="Original Work"
            title="Coming Soon"
          />
        </div>
        <p className="note">Original work details and proposal will be added here.</p>
      </section>

      <section className="section">
        <h2 className="section-title">Final Product</h2>
        <div className="card-single">
          <PhotoCard
            src="/cards/placeholder.svg"
            alt=""
            label="Final Product"
            title="Coming Soon"
          />
        </div>
        <p className="note">Final product details and documentation will be added here.</p>
      </section>
    </main>
  );
}
