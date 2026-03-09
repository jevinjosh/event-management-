import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import { socialServices } from '../data/socialServices';
import { corporateServices } from '../data/corporateServices';
import { toast } from 'react-toastify';

const allEvents = [...socialServices.map(s => s.name), ...corporateServices.map(s => s.name)];

const contactCards = [
    { icon: <MapPin size={20} />, title: 'Visit Us', text: 'NO:4, 2nd Street, Thangam Colony, Anna Nagar West, Chennai – 600040' },
    { icon: <Phone size={20} />, title: 'Call Us', text: '+91 98414 35108', href: 'tel:+919841435108' },
    { icon: <Mail size={20} />, title: 'Email Us', text: 'info@nocterra.in', href: 'mailto:info@nocterra.in' },
    { icon: <MessageCircle size={20} />, title: 'WhatsApp', text: 'Chat with us', href: 'https://wa.me/919841435108' },
    { icon: <Clock size={20} />, title: 'Open Hours', text: 'Mon – Sat: 9AM – 8PM' },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: '', date: '', guests: '', budget: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Your enquiry has been sent! We\'ll respond within 24 hours.');
        setForm({ name: '', email: '', phone: '', eventType: '', date: '', guests: '', budget: '', message: '' });
    };

    return (
        <>
            {/* Hero with background image */}
            <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=80"
                    alt="Contact us - luxury venue"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
                <div className="absolute bottom-16 left-20 w-3 h-3 bg-accent/60 rounded-full float-animation" />
                <div className="container-custom relative z-10">
                    <ScrollReveal>
                        <span className="badge !bg-white/10 !border-white/20 !text-accent-light mb-5 backdrop-blur-sm">Contact Us</span>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
                            Let's Plan Your <span className="text-accent italic">Dream</span> Event
                        </h1>
                        <p className="text-white/70 mt-5 max-w-xl text-lg leading-relaxed">
                            Reach out and let us bring your vision to life. We're just a message away.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="py-24 md:py-32 bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-5 gap-14">
                        {/* Form */}
                        <div className="lg:col-span-3">
                            <ScrollReveal>
                                <h2 className="heading-md mb-8">Send an Enquiry</h2>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <input type="text" placeholder="Full Name *" className="form-input" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                        <input type="email" placeholder="Email Address *" className="form-input" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <input type="tel" placeholder="Phone Number *" className="form-input" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                        <select className="form-input" value={form.eventType} onChange={e => setForm({ ...form, eventType: e.target.value })} required>
                                            <option value="">Select Event Type *</option>
                                            {allEvents.map(e => <option key={e} value={e}>{e}</option>)}
                                        </select>
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-5">
                                        <input type="date" className="form-input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                        <select className="form-input" value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })}>
                                            <option value="">Expected Guests</option>
                                            <option value="1-50">1 – 50</option>
                                            <option value="50-100">50 – 100</option>
                                            <option value="100-250">100 – 250</option>
                                            <option value="250-500">250 – 500</option>
                                            <option value="500+">500+</option>
                                        </select>
                                        <select className="form-input" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                                            <option value="">Budget Range</option>
                                            <option value="under-50k">Under ₹50,000</option>
                                            <option value="50k-1l">₹50,000 – ₹1 Lakh</option>
                                            <option value="1l-3l">₹1 – 3 Lakhs</option>
                                            <option value="3l-5l">₹3 – 5 Lakhs</option>
                                            <option value="5l+">₹5 Lakhs+</option>
                                        </select>
                                    </div>
                                    <textarea placeholder="Tell us about your event..." className="form-input" rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                                    <div className="mt-8">
                                        <Button type="submit" variant="primary"><Send size={15} /> Send Enquiry</Button>
                                    </div>
                                </form>
                            </ScrollReveal>
                        </div>

                        {/* Contact Cards */}
                        <div className="lg:col-span-2 space-y-6">
                            {contactCards.map((c, i) => (
                                <ScrollReveal key={i} delay={i * 0.05}>
                                    <div className="card flex items-start gap-4">
                                        <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">{c.icon}</div>
                                        <div>
                                            <h4 className="font-serif font-semibold text-text text-sm mb-1">{c.title}</h4>
                                            {c.href ? (
                                                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} className="text-sm text-text-light hover:text-accent transition-colors">{c.text}</a>
                                            ) : (
                                                <p className="text-sm text-text-light leading-relaxed">{c.text}</p>
                                            )}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
