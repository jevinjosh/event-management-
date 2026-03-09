import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function EventCard({ event, basePath = '/services', className = '', hoverConfig }) {
    const defaultHover = { y: -6, boxShadow: '0 20px 50px rgba(212,167,107,0.15), 0 8px 24px rgba(0,0,0,0.06)' };

    return (
        <motion.div
            whileHover={hoverConfig || defaultHover}
            transition={{ duration: 0.3 }}
            className={`card overflow-hidden h-full flex flex-col ${className}`}
        >
            {/* Image */}
            <div className="h-44 bg-gradient-to-br from-hero to-secondary flex items-center justify-center rounded-lg mb-5 overflow-hidden">
                {event.image || (event.images && event.images[0]) ? (
                    <img
                        src={event.image || event.images[0]}
                        alt={event.title || event.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <span className="text-5xl">{event.icon || '🎉'}</span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                <p className="overline text-[10px] mb-2">{event.category}</p>

                <h3 className="font-serif font-semibold text-lg text-text mb-3">
                    {event.title || event.name}
                </h3>

                <p className="text-sm text-text-light leading-relaxed mb-5 flex-grow line-clamp-2">
                    {event.shortDesc || event.description?.slice(0, 100)}
                </p>

                {event.price > 0 && (
                    <p className="font-ui font-bold text-accent mb-3">
                        Starting ₹{event.price?.toLocaleString()}
                    </p>
                )}

                <Link
                    to={`${basePath}/${event.slug || event._id}`}
                    className="inline-flex items-center gap-1 font-ui font-semibold text-sm text-accent hover:text-accent-hover transition-colors group"
                >
                    Learn More
                    <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </Link>
            </div>
        </motion.div>
    );
}