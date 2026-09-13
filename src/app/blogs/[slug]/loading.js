export default function Loading() {
    return (
        <>
            <main className="publication-page publication-loading">
                <div className="publication-loading-nav">
                    <div className="publication-skeleton publication-skeleton-logo" />
                    <div className="publication-skeleton publication-skeleton-nav" />
                </div>

                <header className="publication-header">
                    <div className="publication-kicker">
                        <span className="publication-skeleton publication-skeleton-dot" />
                        <span className="publication-skeleton publication-skeleton-kicker" />
                    </div>

                    <div className="publication-skeleton publication-skeleton-title publication-skeleton-title-one" />
                    <div className="publication-skeleton publication-skeleton-title publication-skeleton-title-two" />
                    <div className="publication-skeleton publication-skeleton-title publication-skeleton-title-three" />

                    <div className="publication-meta">
                        <div className="publication-author">
                            <span className="publication-skeleton publication-skeleton-avatar" />
                            <span className="publication-skeleton publication-skeleton-author" />
                        </div>

                        <div className="publication-meta-right">
                            <span className="publication-skeleton publication-skeleton-meta" />
                            <span className="publication-skeleton publication-skeleton-meta-small" />
                        </div>
                    </div>
                </header>

                <article className="publication-body">
                    <div className="publication-skeleton publication-skeleton-lead" />
                    <div className="publication-skeleton publication-skeleton-lead publication-skeleton-lead-two" />

                    <div className="publication-skeleton publication-skeleton-cover" />

                    <div className="publication-skeleton publication-skeleton-heading" />

                    <div className="publication-skeleton publication-skeleton-text" />
                    <div className="publication-skeleton publication-skeleton-text" />
                    <div className="publication-skeleton publication-skeleton-text publication-skeleton-text-short" />

                    <div className="publication-skeleton publication-skeleton-heading publication-skeleton-heading-small" />

                    <div className="publication-skeleton publication-skeleton-text" />
                    <div className="publication-skeleton publication-skeleton-text" />
                    <div className="publication-skeleton publication-skeleton-text publication-skeleton-text-short" />

                    <div className="publication-skeleton publication-skeleton-content-image" />
                </article>
            </main>

            <div className="publication-loading-footer">
                <div className="publication-skeleton publication-skeleton-footer-title" />
                <div className="publication-skeleton publication-skeleton-footer-line" />
            </div>
        </>
    );
}