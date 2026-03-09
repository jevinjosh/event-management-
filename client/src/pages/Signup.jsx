import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check, User, Phone, Lock, Star, Heart, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const steps = [
    { id: 1, title: 'Basic Info', icon: <User size={16} /> },
    { id: 2, title: 'Contact', icon: <Phone size={16} /> },
    { id: 3, title: 'Password', icon: <Lock size={16} /> },
];

export default function Signup() {
    const [step, setStep] = useState(1);
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const { register } = useAuth();
    const navigate = useNavigate();

    const updateForm = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

    const nextStep = () => {
        if (step === 1 && (!form.name || !form.email)) { toast.error('Name and email are required'); return; }
        if (step === 2 && !form.phone) { toast.error('Phone number is required'); return; }
        setStep(s => Math.min(s + 1, 3));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
        if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
        setLoading(true);
        try {
            await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
            toast.success('Account created! Welcome to NOCTERRA!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex">
            {/* Left side — Image panel (hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80"
                    alt="Beautiful event celebration"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-accent/30" />

                {/* Floating decorative elements */}
                <div className="absolute top-24 right-16 w-36 h-36 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-28 h-28 bg-accent/15 rounded-full blur-2xl" />
                <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-accent/60 rounded-full float-animation" />
                <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-white/30 rounded-full float-animation-delayed" />

                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                                <span className="font-serif font-bold text-xl text-white">N</span>
                            </div>
                            <span className="font-serif font-bold text-2xl text-white">NOCTERRA</span>
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <h2 className="font-serif text-4xl font-bold text-white leading-tight mb-4">
                            Start Your Journey<br />
                            with <span className="text-accent">NOCTERRA</span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-sm mb-8">
                            Create your account and start planning extraordinary events that leave lasting memories.
                        </p>

                        {/* Trust indicators */}
                        <div className="space-y-4">
                            {[
                                { icon: <Star size={16} />, title: 'Trusted by 500+ Clients', desc: 'Across Chennai & beyond' },
                                { icon: <Heart size={16} />, title: 'Personalized Experience', desc: 'Tailored to your vision' },
                                { icon: <Shield size={16} />, title: 'Secure & Reliable', desc: 'Your data is protected' },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-accent flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold">{item.title}</p>
                                        <p className="text-white/40 text-xs">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <p className="text-white/30 text-xs">© 2024 NOCTERRA Events. All rights reserved.</p>
                </div>
            </div>

            {/* Right side — Signup form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-primary p-6 sm:p-12">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden text-center mb-6">
                        <Link to="/" className="inline-flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                                <span className="font-serif font-bold text-xl text-white">N</span>
                            </div>
                            <span className="font-serif font-bold text-2xl text-text">NOCTERRA</span>
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6"
                    >
                        <h1 className="heading-lg mb-2">Create Account</h1>
                        <p className="body-text">Join NOCTERRA to book and manage events</p>
                    </motion.div>

                    {/* Progress Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex items-center justify-between mb-6 px-2"
                    >
                        {steps.map((s, i) => (
                            <div key={s.id} className="flex items-center">
                                <motion.div
                                    animate={{
                                        scale: step === s.id ? 1.1 : 1,
                                        backgroundColor: step > s.id ? 'var(--color-accent)' : step === s.id ? 'var(--color-accent)' : 'var(--color-secondary)',
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step > s.id ? 'text-white' : step === s.id ? 'text-white ring-4 ring-accent/20' : 'text-text-muted border border-border'
                                        }`}
                                >
                                    {step > s.id ? <Check size={16} /> : s.icon}
                                </motion.div>
                                {i < steps.length - 1 && (
                                    <div className={`w-16 sm:w-24 h-0.5 mx-2 transition-colors duration-300 ${step > s.id ? 'bg-accent' : 'bg-border'}`} />
                                )}
                            </div>
                        ))}
                    </motion.div>
                    <div className="progress-bar mb-6">
                        <motion.div
                            className="progress-fill"
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="card"
                    >
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }} className="space-y-5">
                                        <h3 className="font-serif font-semibold text-text mb-2">Basic Information</h3>
                                        <div className="form-group">
                                            <input type="text" placeholder=" " className="form-input focus-glow" value={form.name} onChange={e => updateForm('name', e.target.value)} required />
                                            <label className="floating-label">Full Name</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" placeholder=" " className="form-input focus-glow" value={form.email} onChange={e => updateForm('email', e.target.value)} required />
                                            <label className="floating-label">Email Address</label>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(212,167,107,0.35)' }}
                                            whileTap={{ scale: 0.98 }}
                                            type="button" onClick={nextStep} className="btn btn-primary btn-full cursor-pointer"
                                        >
                                            Next <ArrowRight size={16} />
                                        </motion.button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }} className="space-y-5">
                                        <h3 className="font-serif font-semibold text-text mb-2">Contact Details</h3>
                                        <div className="form-group">
                                            <input type="tel" placeholder=" " className="form-input focus-glow" value={form.phone} onChange={e => updateForm('phone', e.target.value)} required />
                                            <label className="floating-label">Phone Number</label>
                                        </div>
                                        <div className="flex gap-3">
                                            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => setStep(1)} className="btn btn-white flex-1 cursor-pointer"><ArrowLeft size={16} /> Back</motion.button>
                                            <motion.button whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(212,167,107,0.35)' }} whileTap={{ scale: 0.98 }} type="button" onClick={nextStep} className="btn btn-primary flex-1 cursor-pointer">Next <ArrowRight size={16} /></motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }} className="space-y-5">
                                        <h3 className="font-serif font-semibold text-text mb-2">Set Password</h3>
                                        <div className="form-group relative">
                                            <input type={showPass ? 'text' : 'password'} placeholder=" " className="form-input focus-glow !pr-12" value={form.password} onChange={e => updateForm('password', e.target.value)} required minLength={6} />
                                            <label className="floating-label">Password (min 6 chars)</label>
                                            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent cursor-pointer">
                                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" placeholder=" " className="form-input focus-glow" value={form.confirmPassword} onChange={e => updateForm('confirmPassword', e.target.value)} required />
                                            <label className="floating-label">Confirm Password</label>
                                        </div>
                                        <div className="flex gap-3">
                                            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => setStep(2)} className="btn btn-white flex-1 cursor-pointer"><ArrowLeft size={16} /> Back</motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(212,167,107,0.35)' }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit" disabled={loading} className="btn btn-primary flex-1"
                                            >
                                                {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Create Account'}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="text-center text-sm text-text-light mt-6"
                    >
                        Already have an account? <Link to="/login" className="text-accent font-semibold hover:text-accent-hover">Sign In</Link>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
