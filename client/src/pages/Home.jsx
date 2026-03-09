import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Calendar, Users, Award, CheckCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import EventCard from '../components/EventCard';
import CountUpStat from '../components/CountUpStat';
import FAQAccordion from '../components/FAQAccordion';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import TickerMarquee from '../components/TickerMarquee';
import Button from '../components/Button';
import { socialServices } from '../data/socialServices';
import { corporateServices } from '../data/corporateServices';
import { testimonials } from '../data/testimonials';
import { faqs } from '../data/faqs';
import { stats } from '../data/stats';
import { whyChoose } from '../data/whyChoose';

export default function Home() {
    const [showAll, setShowAll] = useState(false);
    const displayedServices = showAll ? socialServices : socialServices.slice(0, 6);
    const corpDisplay = corporateServices.slice(0, 4);

    return (
        <>
            {/* HERO */}
            <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
                {/* Decorative shapes */}
                <div className="absolute top-20 right-20 w-72 h-72 bg-accent/[0.06] rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-hero/50 rounded-full blur-3xl" />
                <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-accent/40 rounded-full float-animation" />
                <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-accent/30 rounded-full float-animation-delayed" />

                <div className="container-custom relative z-10 py-28">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <ScrollReveal>
                                <span className="badge mb-6">
                                    <Star size={12} className="text-accent" />
                                    Chennai's Premium Event Management
                                </span>
                            </ScrollReveal>
                            <ScrollReveal delay={0.1}>
                                <h1 className="heading-xl mb-6 text-balance">
                                    Creating <span className="text-accent italic">Unforgettable</span> Moments, One Event at a Time
                                </h1>
                            </ScrollReveal>
                            <ScrollReveal delay={0.2}>
                                <p className="body-text text-lg max-w-xl mb-8">
                                    From dream weddings to corporate milestones, we craft bespoke events that leave a lasting impression. Your vision, our expertise.
                                </p>
                            </ScrollReveal>
                            <ScrollReveal delay={0.3}>
                                <div className="flex flex-wrap gap-4 mt-12">
                                    <Button to="/services" variant="primary">Explore Services <ArrowRight size={16} /></Button>
                                    <Button to="/contact" variant="outline">Plan Your Event</Button>
                                </div>
                            </ScrollReveal>

                            {/* Hero stats */}
                            <ScrollReveal delay={0.4}>
                                <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    {stats.map((s) => (
                                        <CountUpStat key={s.id} number={s.number} suffix={s.suffix} label={s.label} />
                                    ))}
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Hero Image */}
                        <ScrollReveal delay={0.2}>
                            <div className="hidden lg:block relative">
                                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                                    <img
                                        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80"
                                        alt="Elegant wedding venue with floral decorations"
                                        className="w-full h-[500px] object-cover"
                                        loading="eager"
                                    />
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-xl overflow-hidden shadow-xl border-2 border-white">
                                    <img
                                        src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&q=80"
                                        alt="Party celebration"
                                        className="w-full h-full object-cover"
                                        loading="eager"
                                    />
                                </div>
                                <div className="absolute -top-4 -right-4 w-28 h-28 rounded-xl overflow-hidden shadow-xl border-2 border-white">
                                    <img
                                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80"
                                        alt="Corporate conference"
                                        className="w-full h-full object-cover"
                                        loading="eager"
                                    />
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Ticker */}
            <TickerMarquee />

            {/* ABOUT SNIPPET */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <ScrollReveal>
                            <div className="rounded-2xl overflow-hidden h-80 shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"
                                    alt="NOCTERRA event team at work"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.15}>
                            <p className="overline mb-3">About NOCTERRA</p>
                            <h2 className="heading-lg mb-5">We Make Events <span className="text-accent italic">Extraordinary</span></h2>
                            <p className="body-text mb-4">
                                With over a decade of experience in Chennai's event industry, NOCTERRA transforms your vision into reality. We specialize in weddings, corporate events, celebrations, and cultural programs.
                            </p>
                            <p className="body-text mb-8">
                                Our team of 50+ professionals handles every detail with precision and creativity, ensuring your event is a memorable experience for all.
                            </p>
                            <div className="mt-12">
                                <Button to="/about" variant="outline">Learn More About Us <ArrowRight size={16} /></Button>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="section-padding bg-primary">
                <div className="container-custom">
                    <SectionHeader overline="Our Services" title="Event Services We Offer" subtitle="From intimate gatherings to grand celebrations, we cover every occasion." />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedServices.map((s, i) => (
                            <ScrollReveal key={s.id} delay={i * 0.05}>
                                <EventCard
                                    event={s}
                                    basePath="/services"
                                />
                            </ScrollReveal>
                        ))}
                    </div>
                    {!showAll && socialServices.length > 6 && (
                        <div className="text-center mt-14">
                            <Button onClick={() => setShowAll(true)} variant="outline">View All Services</Button>
                        </div>
                    )}
                </div>
            </section>

            {/* CORPORATE */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <SectionHeader overline="Corporate" title="Corporate Event Solutions" subtitle="Professional event management for conferences, launches, and team building." />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {corpDisplay.map((s, i) => (
                            <ScrollReveal key={s.id} delay={i * 0.05}>
                                <EventCard
                                    event={s}
                                    basePath="/services"
                                />
                            </ScrollReveal>
                        ))}
                    </div>
                    <div className="text-center mt-14">
                        <Button to="/services" variant="outline">View All Corporate Services <ArrowRight size={16} /></Button>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="section-padding bg-primary">
                <div className="container-custom">
                    <SectionHeader overline="Why Choose Us" title="What Makes NOCTERRA Different" />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChoose.slice(0, 8).map((item, i) => (
                            <ScrollReveal key={item.id} delay={i * 0.05}>
                                <div className="card text-center">
                                    <span className="text-3xl mb-3 block">{item.icon}</span>
                                    <h4 className="font-serif font-semibold text-text mb-2">{item.title}</h4>
                                    <p className="text-xs text-text-light">{item.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS BANNER */}
            <section className="py-20 md:py-28 bg-gradient-to-r from-hero via-white to-hero">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((s) => (
                            <CountUpStat key={s.id} number={s.number} suffix={s.suffix} label={s.label} />
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <SectionHeader overline="Testimonials" title="What Our Clients Say" subtitle="Don't just take our word for it — hear from the people who trust us." />
                    <TestimonialsCarousel testimonials={testimonials} />
                </div>
            </section>

            {/* FAQS */}
            <section className="section-padding bg-primary">
                <div className="container-custom">
                    <SectionHeader overline="FAQ" title="Frequently Asked Questions" />
                    <FAQAccordion faqs={faqs} />
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-dark text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-accent/10 to-transparent" />
                <div className="container-custom text-center relative z-10">
                    <ScrollReveal>
                        <p className="overline text-accent/80 mb-4">Ready to Begin?</p>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">Let's Plan Your Perfect Event</h2>
                        <p className="text-white/60 mb-10 max-w-lg mx-auto">Get in touch with our team to start planning your dream event today.</p>
                        <div className="flex flex-wrap justify-center gap-4 mt-12">
                            <Button to="/contact" variant="primary">Plan Your Event <ArrowRight size={16} /></Button>
                            <Button href="https://wa.me/919841435108" variant="outline" className="!border-white/30 !text-white hover:!bg-white/10">WhatsApp Us</Button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
