import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { socialServices } from '../data/socialServices';
import { corporateServices } from '../data/corporateServices';

const categories = [
    {
        title: 'Personal Events',
        items: socialServices.filter(s => s.category === 'wedding').slice(0, 6),
        basePath: '/services',
    },
    {
        title: 'Seasonal Events',
        items: socialServices.filter(s => s.category === 'cultural').slice(0, 6),
        basePath: '/services',
    },
    {
        title: 'Corporate Events',
        items: corporateServices.slice(0, 6),
        basePath: '/services',
    },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const [mobileAccordion, setMobileAccordion] = useState(null);
    const { user, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setMegaOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services', mega: true },
        { name: 'Events', path: '/events' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'FAQs', path: '/faqs' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <nav
                className={`sticky top-0 z-[100] transition-all duration-400 ${
                    scrolled
                        ? 'bg-white/95 backdrop-blur-xl border-b border-border shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
                        : 'bg-white/80 backdrop-blur-sm'
                }`}
            >
                <div className="container-custom flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                            <span className="font-serif font-bold text-xl text-white">N</span>
                        </div>
                        <div>
                            <span className="font-serif font-bold text-xl text-text tracking-tight">
                                NOCTERRA
                            </span>
                            <p className="font-ui text-[9px] text-text-muted tracking-[2px] -mt-1">
                                PREMIUM EVENTS
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-7">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative"
                                onMouseEnter={() => link.mega && setMegaOpen(true)}
                                onMouseLeave={() => link.mega && setMegaOpen(false)}
                            >
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `font-ui font-medium text-sm transition-colors duration-200 flex items-center gap-1 py-2 ${
                                            isActive
                                                ? 'text-accent'
                                                : 'text-text-light hover:text-accent'
                                        }`
                                    }
                                >
                                    {link.name}
                                    {link.mega && (
                                        <ChevronDown
                                            size={13}
                                            className={`transition-transform ${
                                                megaOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    )}
                                </NavLink>

                                {/* Mega Menu */}
                                <AnimatePresence>
                                    {link.mega && megaOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            className="mega-menu w-[720px]"
                                        >
                                            <div className="grid grid-cols-3 gap-6">
                                                {categories.map((cat) => (
                                                    <div key={cat.title}>
                                                        <p className="font-serif font-semibold text-sm text-text mb-3">
                                                            {cat.title}
                                                        </p>
                                                        <div className="space-y-1">
                                                            {cat.items.map((s) => (
                                                                <Link
                                                                    key={s.id}
                                                                    to={`${cat.basePath}/${s.slug}`}
                                                                    className="flex items-center gap-2 px-2 py-2 rounded-lg text-text-light hover:text-accent hover:bg-secondary transition-all text-[13px]"
                                                                >
                                                                    <span className="text-base">{s.icon}</span>
                                                                    <span className="truncate">{s.name}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-border">
                                                <Link
                                                    to="/services"
                                                    className="font-ui font-semibold text-sm text-accent hover:text-accent-hover flex items-center gap-1"
                                                >
                                                    View All Services <ChevronRight size={14} />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <div className="hidden md:flex items-center gap-3">
                                <Link
                                    to="/dashboard"
                                    className="font-ui text-sm text-text-light hover:text-accent transition-colors flex items-center gap-1.5"
                                >
                                    <User size={16} />
                                    {user.name?.split(' ')[0]}
                                </Link>
                                <button
                                    onClick={logout}
                                    className="font-ui text-sm text-text-muted hover:text-error transition-colors cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="font-ui font-medium text-sm text-text-light hover:text-accent transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="font-ui font-medium text-sm text-text-light hover:text-accent transition-colors"
                                >
                                    Signup
                                </Link>
                            </div>
                        )}

                        <Link
                            to="/contact"
                            className="hidden md:inline-flex btn btn-primary !text-xs !px-5 !py-2.5"
                        >
                            Plan Your Event
                        </Link>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden text-text p-1 cursor-pointer"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed inset-0 top-[72px] z-[99] bg-white/98 backdrop-blur-lg overflow-y-auto lg:hidden"
                    >
                        <div className="p-6 space-y-1">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    <div className="flex items-center justify-between">
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) =>
                                                `font-ui font-medium text-base py-3 block ${
                                                    isActive ? 'text-accent' : 'text-text'
                                                }`
                                            }
                                        >
                                            {link.name}
                                        </NavLink>

                                        {link.mega && (
                                            <button
                                                onClick={() =>
                                                    setMobileAccordion(
                                                        mobileAccordion === 'services'
                                                            ? null
                                                            : 'services'
                                                    )
                                                }
                                                className="text-accent p-2 cursor-pointer"
                                            >
                                                <ChevronDown
                                                    size={16}
                                                    className={`transition-transform ${
                                                        mobileAccordion === 'services'
                                                            ? 'rotate-180'
                                                            : ''
                                                    }`}
                                                />
                                            </button>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {link.mega && mobileAccordion === 'services' && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: 'auto' }}
                                                exit={{ height: 0 }}
                                                className="overflow-hidden pl-4 pb-3 space-y-1"
                                            >
                                                {[...socialServices, ...corporateServices]
                                                    .slice(0, 12)
                                                    .map((s) => (
                                                        <Link
                                                            key={s.id + s.slug}
                                                            to={`/services/${s.slug}`}
                                                            className="flex items-center gap-2 py-1.5 text-text-light text-sm"
                                                        >
                                                            <span>{s.icon}</span>
                                                            {s.name}
                                                        </Link>
                                                    ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            <div className="pt-4 border-t border-border space-y-2">
                                {user ? (
                                    <>
                                        <Link
                                            to="/dashboard"
                                            className="block py-2 font-ui text-text"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="block py-2 font-ui text-error cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="block py-2 font-ui text-text"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="block py-2 font-ui text-text"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}

                                <Link
                                    to="/contact"
                                    className="btn btn-primary btn-full mt-3"
                                >
                                    Plan Your Event
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}