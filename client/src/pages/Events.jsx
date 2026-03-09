import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, MapPin } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { socialServices } from '../data/socialServices';
import { corporateServices } from '../data/corporateServices';

const allEvents = [...socialServices, ...corporateServices].map((s, i) => ({
    ...s,
    _id: s.id,
    title: s.name,
    price: [25000, 50000, 75000, 35000, 45000, 100000][i % 6],
    dateSlots: ['2025-03-15', '2025-04-10', '2025-05-20'],
    venue: ['Anna Nagar', 'T. Nagar', 'Adyar', 'OMR', 'ECR'][i % 5],
}));

const categories = ['All', 'Wedding', 'Celebrations', 'Cultural', 'Conferences', 'Launches', 'Team'];

export default function Events() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const filtered = allEvents.filter(e => {
        const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === 'All' || e.category.toLowerCase() === category.toLowerCase();
        return matchSearch && matchCat;
    });

    return (
        <>
            {/* Hero with background image */}
            <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
                    alt="Upcoming events"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
                <div className="absolute top-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <ScrollReveal>
                        <span className="badge !bg-white/10 !border-white/20 !text-accent-light mb-5 backdrop-blur-sm">Explore Events</span>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
                            Upcoming <span className="text-accent italic">Events</span> & Experiences
                        </h1>
                        <p className="text-white/70 mt-5 max-w-xl text-lg leading-relaxed">
                            Discover and book extraordinary events happening in Chennai.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-white border-b border-border sticky top-[72px] z-50">
                <div className="container-custom">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-md w-full">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="form-input !pl-9"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`font-ui text-xs px-4 py-2 rounded-full border transition-all cursor-pointer ${category === cat ? 'bg-accent text-white border-accent' : 'bg-white border-border text-text-light hover:border-accent'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-24 md:py-32 bg-primary">
                <div className="container-custom">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={category + search}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filtered.map((e) => (
                                <motion.div
                                    key={e.slug}
                                    whileHover={{ y: -4 }}
                                    className="card overflow-hidden h-full flex flex-col"
                                >
                                    <div className="h-48 rounded-lg mb-5 overflow-hidden">
                                        {(e.image || (e.images && e.images[0])) ? (
                                            <img
                                                src={e.image || e.images[0]}
                                                alt={e.title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-hero to-secondary flex items-center justify-center">
                                                <span className="text-5xl">{e.icon}</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="overline text-[10px] mb-2">{e.category}</p>
                                    <h3 className="font-serif font-semibold text-lg text-text mb-3">{e.title}</h3>
                                    <p className="text-sm text-text-light line-clamp-2 mb-4 flex-grow leading-relaxed">{e.shortDesc || e.description?.slice(0, 90)}</p>
                                    <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {e.dateSlots[0]}</span>
                                        <span className="flex items-center gap-1"><MapPin size={12} /> {e.venue}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                                        <p className="font-serif font-bold text-accent">₹{e.price.toLocaleString()}</p>
                                        <Link to={`/events/${e.slug}`} className="btn btn-primary !text-xs !px-4 !py-2">
                                            View Details
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                    {filtered.length === 0 && <p className="text-center text-text-muted py-16">No events found matching your criteria.</p>}
                </div>
            </section>
        </>
    );
}
