import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Button({
    children,
    to,
    href,
    onClick,
    variant = 'primary',
    className = '',
    type = 'button',
    disabled = false,
    fullWidth = false,
}) {
    const classes = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
    } ${className}`;

    const Wrapper = ({ children: c }) => (
        <motion.span
            whileHover={disabled ? {} : { scale: 1.03 }}
            whileTap={disabled ? {} : { scale: 0.97 }}
            className={fullWidth ? 'block' : 'inline-block'}
        >
            {c}
        </motion.span>
    );

    if (to)
        return (
            <Wrapper>
                <Link to={to} className={classes}>
                    {children}
                </Link>
            </Wrapper>
        );

    if (href) {
        const ext = href.startsWith('http');
        return (
            <Wrapper>
                <a
                    href={href}
                    {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={classes}
                >
                    {children}
                </a>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={classes}
            >
                {children}
            </button>
        </Wrapper>
    );
}