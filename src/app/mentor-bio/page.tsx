import PhotoCard from '@/components/PhotoCard/PhotoCard';

export default function MentorBio() {
  return (
    <main className="page">
      <h1 className="page-title">Mentor Bio</h1>

      <section className="section">
        <div className="card-single">
          <PhotoCard
            src="/cards/placeholder.svg"
            alt=""
            label="Mentor"
            title="Coming Soon"
          />
        </div>
        <p className="note">
          Mentor biography and photo will be added once a mentorship is established.
        </p>
      </section>
    </main>
  );
}
