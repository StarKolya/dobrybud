export function ConsultationBanner({ onCtaClick }: { onCtaClick: () => void }) {
    return (
        <section className="bg-brand-light p-6">
            <h2 className="text-2xl font-semibold">Tytuł</h2>
            <p className="text-brand-dark/60">Opis</p>
            <button
                onClick={onCtaClick}
                className="mt-4 rounded-md bg-brand-red px-4 py-2 text-white hover:bg-brand-dark"
            >
                "cta"
            </button>
        </section>
    );
}
