import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Send, Phone, MessageCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import { socialServices } from '../data/socialServices';
import { corporateServices } from '../data/corporateServices';
import { toast } from 'react-toastify';

const allServices = [...socialServices, ...corporateServices];

const defaultPackages = [
    { name: 'Standard', price: 25000, features: ['Basic decor', 'Venue coordination', 'Photography', 'Catering for 50'] },
    { name: 'Premium', price: 75000, features: ['Premium decor', 'Venue + entertainment', 'Photo & video', 'Catering for 150', 'Event coordinator'] },
    { name: 'VIP', price: 150000, features: ['Luxury decor', 'Full production', 'Drone + cinematic video', 'Premium catering 300+', 'Dedicated team', 'After-party setup'] },
];

const processSteps = [
    { step: '01', title: 'Consultation', desc: 'We discuss your vision, budget, and requirements.' },
    { step: '02', title: 'Planning', desc: 'Our team creates a detailed plan and timeline.' },
    { step: '03', title: 'Coordination', desc: 'We handle vendors, venue, logistics, and design.' },
    { step: '04', title: 'Execution', desc: 'Flawless event delivery with on-site management.' },
];

export default function ServiceDetail() {
    const { slug } = useParams();
    const service = allServices.find(s => s.slug === slug);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', message: '' });

    if (!service) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-primary">
                <h1 className="heading-lg mb-4">Service Not Found</h1>
                <Button to="/services" variant="primary"><ArrowLeft size={16} /> Back to Services</Button>
            </div>
        );
    }

    const related = allServices.filter(s => s.category === service.category && s.id !== service.id).slice(0, 3);

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Enquiry sent! We\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', date: '', message: '' });
    };

    return (
        <>
            {/* Hero Section — Centered, Luxury, Balanced */}
            {/* Hero Section — Left Aligned, Luxury, Editorial */}
            <section className="relative py-32 pb-24 min-h-[60vh] flex items-center overflow-hidden">
                {/* Background Image */}
                {service.image && (
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        src={service.image}
                        alt={service.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {/* Overlay for Clarity */}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

                {/* Floating decorative elements */}
                <div className="absolute top-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl opacity-50" />

                {/* Content Container */}
                <div className="relative z-10 container-custom px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="max-w-6xl mx-auto flex flex-col items-start"
                    >
                        {/* 1. Breadcrumb - Subtle & Distinct */}
                        <Link
                            to="/services"
                            className="text-sm text-gray-300 hover:text-accent transition-colors mb-8 inline-flex items-center gap-2 font-ui tracking-wide"
                        >
                            <ArrowLeft size={14} /> All Services
                        </Link>

                        {/* Content Stack */}
                        <div className="flex flex-col items-start space-y-6 max-w-3xl">
                            {/* 2. Badge */}
                            <span className="badge !bg-white/10 !border-white/20 !text-accent-light backdrop-blur-sm uppercase tracking-wider text-xs px-4 py-1.5 rounded-full">
                                {service.category}
                            </span>

                            {/* 3. Main Heading */}
                            <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white leading-tight">
                                {service.name}
                            </h1>

                            {/* 4. Subtitle */}
                            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
                                {service.shortDesc}
                            </p>

                            {/* 5. CTA Button */}
                            <div className="pt-4">
                                <Button to="/contact" variant="primary" className="!px-8 !py-4 text-lg">
                                    Book This Service
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section with better spacing */}
            <section className="pt-24 pb-36 md:pt-32 md:pb-48 bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-14">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-16">
                            {/* Description */}
                            <ScrollReveal>
                                <h2 className="heading-md mb-5">About This Service</h2>
                                <p className="body-text leading-relaxed">{service.fullDescription || service.description}</p>
                            </ScrollReveal>

                            {/* Features */}
                            {service.features?.length > 0 && (
                                <ScrollReveal>
                                    <h2 className="heading-md mb-6">What's Included</h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {service.features.map((f, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                                viewport={{ once: true }}
                                                className="flex items-start gap-3 p-4 rounded-xl bg-primary hover:border-accent border border-transparent transition-all"
                                            >
                                                <CheckCircle size={18} className="text-accent mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-text font-medium">{f}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            )}

                            {/* Packages */}
                            <ScrollReveal>
                                <h2 className="heading-md mb-8">Packages</h2>
                                <div className="grid sm:grid-cols-3 gap-5">
                                    {defaultPackages.map((pkg, i) => (
                                        <motion.div
                                            key={pkg.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.15 }}
                                            viewport={{ once: true }}
                                            whileHover={{ y: -6, boxShadow: '0 25px 60px rgba(212,167,107,0.18)' }}
                                            className={`package-card ${i === 1 ? 'popular' : ''}`}
                                        >
                                            <h3 className="font-serif font-bold text-lg mb-2">{pkg.name}</h3>
                                            <p className="text-2xl font-serif font-bold text-accent mb-5">₹{pkg.price.toLocaleString()}</p>
                                            <ul className="space-y-2.5 text-left mb-6">
                                                {pkg.features.map((f, j) => (
                                                    <li key={j} className="flex items-start gap-2 text-sm text-text-light">
                                                        <span className="text-accent">✓</span>{f}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button to="/contact" variant={i === 1 ? 'primary' : 'outline'} fullWidth>Book Now</Button>
                                        </motion.div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* Process */}
                            <ScrollReveal>
                                <h2 className="heading-md mb-8">Our Process</h2>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    {processSteps.map((p, i) => (
                                        <motion.div
                                            key={p.step}
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                            className="card-flat flex items-start gap-4 hover:border-accent transition-colors"
                                        >
                                            <span className="font-serif font-bold text-2xl text-accent/30">{p.step}</span>
                                            <div>
                                                <h4 className="font-serif font-semibold text-text mb-1.5">{p.title}</h4>
                                                <p className="text-sm text-text-light leading-relaxed">{p.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Quick enquiry */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="card"
                                >
                                    <h3 className="font-serif font-semibold text-text mb-5">Quick Enquiry</h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input type="text" placeholder="Your Name" className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                        <input type="email" placeholder="Email" className="form-input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                                        <input type="tel" placeholder="Phone" className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                                        <input type="date" className="form-input" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                                        <textarea placeholder="Message..." className="form-input" rows="3" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                                        <Button type="submit" variant="primary" fullWidth><Send size={14} /> Send Enquiry</Button>
                                    </form>
                                </motion.div>

                                {/* Contact */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="card"
                                >
                                    <h3 className="font-serif font-semibold text-text mb-4">Need Help?</h3>
                                    <div className="space-y-3">
                                        <a href="tel:+919841435108" className="flex items-center gap-2 text-sm text-text-light hover:text-accent transition-colors">
                                            <Phone size={14} className="text-accent" /> +91 98414 35108
                                        </a>
                                        <a href="https://wa.me/919841435108" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-text-light hover:text-accent transition-colors">
                                            <MessageCircle size={14} className="text-accent" /> WhatsApp Us
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Related */}
                                {related.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        viewport={{ once: true }}
                                        className="card"
                                    >
                                        <h3 className="font-serif font-semibold text-text mb-4">Related Services</h3>
                                        <div className="space-y-3">
                                            {related.map(r => (
                                                <Link key={r.id} to={`/services/${r.slug}`} className="flex items-center gap-3 text-sm text-text-light hover:text-accent transition-colors py-2 border-b border-border/50 last:border-0">
                                                    {r.image ? (
                                                        <img src={r.image} alt={r.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                                                    ) : (
                                                        <span className="text-lg">{r.icon}</span>
                                                    )}
                                                    <span className="font-medium">{r.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}