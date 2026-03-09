import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import { socialServices } from '../data/socialServices';
import { corporateServices } from '../data/corporateServices';

const allEvents = [...socialServices, ...corporateServices].map((s, i) => ({
    ...s,
    _id: s.id,
    title: s.name,
    price: [25000, 50000, 75000, 35000, 45000, 100000][i % 6],
    dateSlots: ['2025-03-15', '2025-04-10', '2025-05-20', '2025-06-12'],
    venue: ['Anna Nagar', 'T. Nagar', 'Adyar', 'OMR', 'ECR'][i % 5],
    packages: [
        { name: 'Standard', price: [25000, 35000, 45000][i % 3], features: ['Basic decor & setup', 'Venue coordination', 'Photography (4hrs)', 'Catering for 50 guests'] },
        { name: 'Premium', price: [75000, 85000, 95000][i % 3], features: ['Premium decor & theme', 'Full entertainment', 'Photo + video coverage', 'Catering for 150 guests', 'Dedicated coordinator'] },
        { name: 'VIP', price: [150000, 180000, 200000][i % 3], features: ['Luxury bespoke decor', 'Full event production', 'Drone + cinematic video', 'Premium catering 300+', 'Dedicated team of 10', 'After-party setup'] },
    ],
}));

const reviews = [
    { name: 'Ananya S.', rating: 5, text: 'Absolutely incredible experience! Every detail was perfect.' },
    { name: 'Vikram R.', rating: 5, text: 'Professional team that went above and beyond expectations.' },
    { name: 'Meera K.', rating: 4, text: 'Great attention to detail and wonderful coordination.' },
];

export default function EventDetail() {
    const { eventId } = useParams();
    const event = allEvents.find(e => e.slug === eventId);

    if (!event) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-primary">
                <h1 className="heading-lg mb-4">Event Not Found</h1>
                <Button to="/events" variant="primary"><ArrowLeft size={16} /> Back to Events</Button>
            </div>
        );
    }

    return (
        <>
            {/* Hero */}
            <section className="relative min-h-[50vh] hero-gradient flex items-end pb-12">
                <div className="absolute top-20 right-20 w-60 h-60 bg-accent/[0.05] rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <Link to="/events" className="inline-flex items-center gap-1 text-accent text-sm font-ui font-medium mb-3 hover:text-accent-hover transition-colors">
                        <ArrowLeft size={14} /> All Events
                    </Link>
                    <div className="flex items-start gap-4 mb-3">
                        <span className="text-5xl">{event.icon}</span>
                        <div>
                            <span className="badge mb-2">{event.category}</span>
                            <h1 className="heading-xl">{event.title}</h1>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-text-light mt-4">
                        <span className="flex items-center gap-1"><Calendar size={14} className="text-accent" /> Available dates</span>
                        <span className="flex items-center gap-1"><MapPin size={14} className="text-accent" /> {event.venue}, Chennai</span>
                        <span className="flex items-center gap-1"><Star size={14} className="text-accent fill-accent" /> 4.8 (120+ reviews)</span>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-16">
                        {/* Main */}
                        <div className="lg:col-span-2 space-y-14">
                            {/* Description */}
                            <ScrollReveal>
                                <h2 className="heading-md mb-6">About This Event</h2>
                                <p className="body-text">{event.fullDescription || event.description}</p>
                            </ScrollReveal>

                            {/* Features */}
                            {event.features?.length > 0 && (
                                <ScrollReveal>
                                    <h2 className="heading-md mb-6">What's Included</h2>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {event.features.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-primary text-sm text-text">
                                                <CheckCircle size={15} className="text-accent flex-shrink-0" />{f}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            )}

                            {/* Packages */}
                            <ScrollReveal>
                                <h2 className="heading-md mb-6">Choose Your Package</h2>
                                <div className="grid sm:grid-cols-3 gap-6">
                                    {event.packages.map((pkg, i) => (
                                        <div key={pkg.name} className={`package-card ${i === 1 ? 'popular' : ''}`}>
                                            <h3 className="font-serif font-bold text-lg mb-2">{pkg.name}</h3>
                                            <p className="text-2xl font-serif font-bold text-accent mb-4">₹{pkg.price.toLocaleString()}</p>
                                            <ul className="space-y-2 text-left mb-5">
                                                {pkg.features.map((f, j) => (
                                                    <li key={j} className="flex items-start gap-2 text-sm text-text-light">
                                                        <span className="text-accent">✓</span>{f}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Link to={`/book/${event.slug}?package=${pkg.name}`} className="btn btn-full btn-primary !text-xs">
                                                Book {pkg.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* Date slots */}
                            <ScrollReveal>
                                <h2 className="heading-md mb-6">Available Dates</h2>
                                <div className="flex flex-wrap gap-3">
                                    {event.dateSlots.map((d) => (
                                        <Link key={d} to={`/book/${event.slug}?date=${d}`} className="px-5 py-3 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-all text-sm font-ui font-medium text-text flex items-center gap-2">
                                            <Calendar size={14} className="text-accent" />
                                            {new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </Link>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* Reviews */}
                            <ScrollReveal>
                                <h2 className="heading-md mb-6">Reviews</h2>
                                <div className="space-y-5">
                                    {reviews.map((r, i) => (
                                        <div key={i} className="card-flat">
                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(r.rating)].map((_, j) => <Star key={j} size={13} className="fill-accent text-accent" />)}
                                            </div>
                                            <p className="text-sm text-text-light italic mb-2">"{r.text}"</p>
                                            <p className="font-ui text-xs font-semibold text-text">{r.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Sidebar - Book Now */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <div className="card">
                                    <p className="overline mb-1">Starting from</p>
                                    <p className="font-serif font-bold text-3xl text-accent mb-1">₹{event.price.toLocaleString()}</p>
                                    <p className="text-xs text-text-muted mb-5">per event</p>
                                    <Button to={`/book/${event.slug}`} variant="primary" fullWidth>Book Now</Button>
                                    <Button href={`https://wa.me/919841435108?text=Hi, I'm interested in ${event.title}`} variant="outline" fullWidth className="mt-2">WhatsApp Enquiry</Button>
                                    <div className="mt-4 pt-4 border-t border-border text-xs text-text-muted space-y-1.5">
                                        <p className="flex items-center gap-1.5"><MapPin size={12} className="text-accent" /> {event.venue}, Chennai</p>
                                        <p className="flex items-center gap-1.5"><Users size={12} className="text-accent" /> 50 — 500+ guests</p>
                                        <p className="flex items-center gap-1.5"><Calendar size={12} className="text-accent" /> {event.dateSlots.length} dates available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
