import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    className = '',
    verticalPadding = '', // NEW: Default padding
}) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const dirs = {
        up: { y: 30 },
        down: { y: -30 },
        left: { x: 30 },
        right: { x: -30 },
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...dirs[direction] }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            className={`${verticalPadding} ${className}`}
        >
            {children}
        </motion.div>
    );
}