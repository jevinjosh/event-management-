import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import EventCard from '../components/EventCard';
import { socialServices } from '../data/socialServices';
import { corporateServices } from '../data/corporateServices';

const allServices = [...socialServices, ...corporateServices];

const tabs = [
    { key: 'all', label: 'All Services' },
    { key: 'wedding', label: 'Wedding & Family' },
    { key: 'celebrations', label: 'Celebrations' },
    { key: 'cultural', label: 'Cultural & Seasonal' },
    { key: 'conferences', label: 'Conferences' },
    { key: 'launches', label: 'Launches & Shows' },
    { key: 'team', label: 'Team Events' },
];

export default function Services() {
    const [activeTab, setActiveTab] = useState('all');

    const filtered = useMemo(() => {
        if (activeTab === 'all') return allServices;
        return allServices.filter(s => s.category === activeTab);
    }, [activeTab]);

    return (
        <>
            {/* Hero with background image */}
            <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1400&q=80"
                    alt="Event services"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
                <div className="absolute top-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <ScrollReveal>
                        <span className="badge !bg-white/10 !border-white/20 !text-accent-light mb-5 backdrop-blur-sm">Our Services</span>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
                            Event Services for Every <span className="text-accent italic">Occasion</span>
                        </h1>
                        <p className="text-white/70 mt-5 max-w-xl text-lg leading-relaxed">
                            Browse our comprehensive range of personal, cultural, and corporate event solutions.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Services */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container-custom">
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-14">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`font-ui font-medium text-sm px-5 py-2.5 rounded-full border transition-all cursor-pointer
                  ${activeTab === tab.key
                                        ? 'bg-accent text-white border-accent shadow-md'
                                        : 'bg-white text-text-light border-border hover:border-accent hover:text-accent'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filtered.map((s) => (
                                <EventCard key={s.slug} event={s} basePath="/services" />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filtered.length === 0 && (
                        <p className="text-center text-text-muted py-16">No services found in this category.</p>
                    )}
                </div>
            </section>
        </>
    );
}
