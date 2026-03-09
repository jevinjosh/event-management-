import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function CountUpStat({ number, suffix = '', label, className = '' }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <div ref={ref} className={`text-center ${className}`}>
            <p className="font-serif font-bold text-3xl text-accent">
                {inView ? <CountUp end={number} duration={2.5} /> : '0'}
                {suffix}
            </p>

            <p className="font-ui text-sm text-text-muted mt-1 tracking-wide uppercase">
                {label}
            </p>
        </div>
    );
}