import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import CountUpStat from '../components/CountUpStat';
import Button from '../components/Button';
import { stats } from '../data/stats';
import { whyChoose } from '../data/whyChoose';
import { ArrowRight, Target, Eye, Heart } from 'lucide-react';

const team = [
    { name: 'Rajesh Kumar', role: 'Founder & CEO', bio: 'With 15+ years in event management, Rajesh leads the team with vision and passion.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
    { name: 'Priya Sharma', role: 'Creative Director', bio: 'Award-winning designer transforming concepts into breathtaking event experiences.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
    { name: 'Arjun Menon', role: 'Operations Head', bio: 'Logistics expert ensuring flawless execution of every event, big or small.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
];

export default function About() {
    return (
        <>
            {/* Hero with background image */}
            <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden ">
                <img
                    src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&q=80"
                    alt="NOCTERRA team at work"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
                <div className="absolute top-16 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                <div className="container-custom relative z-10 py-16">
                    <ScrollReveal>
                        <span className="badge !bg-white/10 !border-white/20 !text-accent-light mb-5 inline-block backdrop-blur-sm">About Us</span>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight mt-4">
                            The People Behind Your <span className="text-accent italic">Perfect</span> Events
                        </h1>
                        <p className="text-white/70 mt-6 max-w-xl text-lg leading-relaxed">
                            A passionate team dedicated to creating extraordinary experiences since 2015.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Our Story / Mission */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <ScrollReveal>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="rounded-2xl overflow-hidden h-72 md:h-80">
                                    <img
                                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80"
                                        alt="Luxury event venue"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden h-72 md:h-80 mt-12">
                                    <img
                                        src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80"
                                        alt="Cultural performance at event"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.15}>
                            <div className="lg:pl-4">
                                <p className="overline mb-5">Our Story</p>
                                <h2 className="heading-lg mb-8">A Decade of Creating <span className="text-accent italic">Memories</span></h2>
                                <p className="body-text mb-6 leading-relaxed">
                                    Founded in 2015, NOCTERRA began with a simple belief: every event deserves to be exceptional. Starting from a small office in Anna Nagar, Chennai, we have grown into a full-service event management company trusted by hundreds of clients.
                                </p>
                                <p className="body-text mb-10 leading-relaxed">
                                    We combine creativity with meticulous planning, ensuring every detail is perfect — from intimate family celebrations to large-scale corporate conferences. Our diverse team brings together expertise in design, logistics, technology, and hospitality.
                                </p>

                                <div className="grid grid-cols-3 gap-5 mt-8">
                                    {[{ icon: <Target size={22} />, label: 'Mission-Driven' }, { icon: <Eye size={22} />, label: 'Detail-Oriented' }, { icon: <Heart size={22} />, label: 'Client-First' }].map((v, i) => (
                                        <div key={i} className="text-center py-6 px-4 rounded-xl border border-border">
                                            <span className="text-accent flex justify-center mb-3">{v.icon}</span>
                                            <p className="font-ui text-xs font-semibold text-text uppercase tracking-wider">{v.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 md:py-32 bg-primary">
                <div className="container-custom">
                    <SectionHeader overline="Our Team" title="Meet the Experts" subtitle="Passionate professionals dedicated to making your events extraordinary." />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14 mt-14">
                        {team.map((m, i) => (
                            <ScrollReveal key={m.name} delay={i * 0.1}>
                                <div className="card text-center p-10">
                                    <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden border-4 border-accent/20">
                                        <img
                                            src={m.image}
                                            alt={m.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="font-serif font-semibold text-xl text-text mb-2">{m.name}</h3>
                                    <p className="font-ui text-xs text-accent font-semibold tracking-widest uppercase mb-4">{m.role}</p>
                                    <p className="text-sm text-text-light leading-relaxed">{m.bio}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container-custom">
                    <SectionHeader overline="Why NOCTERRA" title="What Sets Us Apart" />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
                        {whyChoose.slice(0, 8).map((w, i) => (
                            <ScrollReveal key={w.id} delay={i * 0.05}>
                                <div className="card text-center p-8 h-full flex flex-col items-center justify-center">
                                    <span className="text-4xl mb-5 text-accent block">{w.icon}</span>
                                    <h4 className="font-serif font-semibold text-text text-base mb-3">{w.title}</h4>
                                    <p className="text-sm text-text-light leading-relaxed">{w.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 md:py-32 bg-gradient-to-r from-hero via-white to-hero">
                <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 text-center">
                    {stats.map((s) => (
                        <CountUpStat key={s.id} number={s.number} suffix={s.suffix} label={s.label} />
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-28 bg-dark text-center">
                <div className="container-custom max-w-2xl mx-auto">
                    <ScrollReveal>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">Ready to Work With Us?</h2>
                        <p className="text-white/60 mb-10 max-w-md mx-auto text-lg leading-relaxed">Let our team help you create your next unforgettable event.</p>
                        <div className="mt-10">
                            <Button to="/contact" variant="primary">Get in Touch <ArrowRight size={16} /></Button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
