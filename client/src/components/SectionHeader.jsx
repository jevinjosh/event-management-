export default function SectionHeader({
    overline,
    title,
    subtitle,
    centered = true,
    className = '',
}) {
    return (
        <div
            className={`mb-20 ${centered ? 'text-center' : ''} ${className}`}
        >
            {overline && <p className="overline mb-5">{overline}</p>}

            <h2 className="heading-lg text-balance">{title}</h2>

            {centered && (
                <div
                    className={`section-divider mt-5 ${!centered ? 'section-divider-left' : ''
                        }`}
                />
            )}

            {subtitle && (
                <p className="body-text mt-6 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}