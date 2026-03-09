export default function TickerMarquee() {
    const items = [
        '✦ WEDDING PLANNING',
        '✦ CORPORATE EVENTS',
        '✦ RECEPTIONS',
        '✦ BIRTHDAY PARTIES',
        '✦ PRODUCT LAUNCHES',
        '✦ CONFERENCES',
        '✦ BABY SHOWER',
        '✦ AWARD CEREMONIES',
        '✦ LIVE CONCERTS',
        '✦ TRADE SHOWS',
        '✦ CULTURAL PROGRAMS',
        '✦ HOUSEWARMING',
        '✦ ANNIVERSARIES',
        '✦ SUMMITS',
        '✦ GALAS',
    ];

    const text = items.join('    ');

    return (
        <div className="w-full overflow-hidden py-4 bg-secondary border-y border-border">
            <div className="ticker-animate whitespace-nowrap">
                <span className="font-ui text-xs text-text-muted tracking-[2px] uppercase">
                    {text}
                    {'    '}
                    {text}
                </span>
            </div>
        </div>
    );
}