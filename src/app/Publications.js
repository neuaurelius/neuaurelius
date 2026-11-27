import PublicationCard from "./PublicationCard";
import "./Publications.css";

export default function Publications({ publications = [] }) {
  const items = Array.isArray(publications) ? publications : [];

  const gridClass =
    items.length === 1
      ? "publication-grid single-item"
      : items.length === 2
        ? "publication-grid two-items"
        : "publication-grid";

  return (
    <section className="publications-section" id="publications">
      <div className="publications-container">
        <div className="publications-header">
          <h2
            style={{
              fontFamily: "var(--font-gcepicpro), sans-serif",
              fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)",
              fontWeight: 400,
              letterSpacing: "0.02em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            PUBLICATIONS
          </h2>
        </div>

        {items.length > 0 ? (
          <div className={gridClass}>
            {items.map((publication, index) => (
              <PublicationCard
                key={publication._id || publication.id || index}
                publication={publication}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="publications-empty">
            <span>00</span>
            <p>
              FEATURED PUBLICATIONS
              <br />
              WILL APPEAR HERE.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
