export default function PackageCard({
    pkg,
    selected,
    onSelect,
    popular = false,
}) {
    return (
        <div
            onClick={() => onSelect?.(pkg)}
            className={`package-card cursor-pointer ${popular ? 'popular' : ''} ${
                selected
                    ? 'border-accent ring-2 ring-accent/20'
                    : ''
            }`}
        >
            <h3 className="font-serif font-bold text-xl text-text mb-2">
                {pkg.name}
            </h3>

            <p className="text-3xl font-serif font-bold text-accent mb-4">
                ₹{pkg.price?.toLocaleString()}
                <span className="text-sm font-sans text-text-muted font-normal">
                    /event
                </span>
            </p>

            <ul className="space-y-2.5 mb-6 text-left">
                {pkg.features?.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-light">
                        <span className="text-accent mt-0.5">✓</span>
                        {f}
                    </li>
                ))}
            </ul>

            <button
                className={`btn btn-full ${
                    selected ? 'btn-primary' : 'btn-outline'
                }`}
            >
                {selected ? 'Selected' : 'Select Package'}
            </button>
        </div>
    );
}