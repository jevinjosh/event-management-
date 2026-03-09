import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Youtube, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Events', path: '/events' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'FAQs', path: '/faqs' },
        { name: 'Contact', path: '/contact' },
    ];

    const services = [
        'Weddings',
        'Receptions',
        'Birthdays',
        'Conferences',
        'Product Launches',
        'Corporate Events',
    ];

    const socials = [
        { Icon: Instagram, href: '#' },
        { Icon: Facebook, href: '#' },
        { Icon: Linkedin, href: '#' },
        { Icon: Youtube, href: '#' },
    ];

    return (
        <footer className="bg-dark text-white/80">
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                                <span className="font-serif font-bold text-lg text-white">N</span>
                            </div>
                            <span className="font-serif font-bold text-xl text-white">NOCTERRA</span>
                        </Link>

                        <p className="text-sm leading-relaxed text-white/60 mb-5">
                            Chennai's premium event management platform. Creating unforgettable experiences
                            since 2015.
                        </p>

                        <div className="flex gap-3">
                            {socials.map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif font-semibold text-white text-sm mb-5">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((l) => (
                                <li key={l.name}>
                                    <Link
                                        to={l.path}
                                        className="text-sm text-white/60 hover:text-accent transition-colors"
                                    >
                                        {l.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-serif font-semibold text-white text-sm mb-5">Our Services</h4>
                        <ul className="space-y-2.5">
                            {services.map((s) => (
                                <li key={s}>
                                    <Link
                                        to="/services"
                                        className="text-sm text-white/60 hover:text-accent transition-colors"
                                    >
                                        {s}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif font-semibold text-white text-sm mb-5">Contact</h4>
                        <div className="space-y-3 text-sm text-white/60">
                            <p className="flex items-start gap-2">
                                <MapPin size={14} className="text-accent mt-0.5 flex-shrink-0" />
                                NO:4, 2nd Street, Thangam Colony, Anna Nagar West, Chennai – 600040
                            </p>

                            <a
                                href="tel:+919841435108"
                                className="flex items-center gap-2 hover:text-accent transition-colors"
                            >
                                <Phone size={14} className="text-accent" />
                                +91 98414 35108
                            </a>

                            <a
                                href="mailto:info@nocterra.in"
                                className="flex items-center gap-2 hover:text-accent transition-colors"
                            >
                                <Mail size={14} className="text-accent" />
                                info@nocterra.in
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-white/40">© 2025 NOCTERRA. All Rights Reserved.</p>

                    <div className="flex gap-4 text-xs text-white/40">
                        <a href="#" className="hover:text-accent transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-accent transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}