import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, ArrowRight, Star, Sparkles, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate(redirect);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex">
            {/* Left side — Image panel (hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
                    alt="Elegant event venue"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-accent/30" />

                {/* Floating decorative elements */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute bottom-32 right-16 w-24 h-24 bg-accent/15 rounded-full blur-2xl" />
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent/60 rounded-full float-animation" />
                <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/30 rounded-full float-animation-delayed" />

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
                            Welcome Back to<br />
                            <span className="text-accent">NOCTERRA</span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-sm mb-8">
                            Sign in to manage your events, track bookings, and create unforgettable experiences.
                        </p>

                        {/* Floating feature pills */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: <Star size={14} />, text: '500+ Events' },
                                { icon: <Sparkles size={14} />, text: 'Premium Quality' },
                                { icon: <Calendar size={14} />, text: 'Easy Booking' },
                            ].map((pill, i) => (
                                <motion.div
                                    key={pill.text}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 text-sm text-white/80"
                                >
                                    <span className="text-accent">{pill.icon}</span>
                                    {pill.text}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <p className="text-white/30 text-xs">© 2024 NOCTERRA Events. All rights reserved.</p>
                </div>
            </div>

            {/* Right side — Login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-primary p-6 sm:p-12">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden text-center mb-8">
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
                        className="mb-8"
                    >
                        <h1 className="heading-lg mb-2">Welcome Back</h1>
                        <p className="body-text">Sign in to manage your events & bookings</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="card"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder=" "
                                    className="form-input focus-glow"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="floating-label">Email Address</label>
                            </div>

                            <div className="form-group relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder=" "
                                    className="form-input focus-glow !pr-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="floating-label">Password</label>
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors cursor-pointer">
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-border text-accent focus:ring-accent" />
                                    <span className="text-text-light">Remember me</span>
                                </label>
                                <a href="#" className="text-accent hover:text-accent-hover font-medium">Forgot Password?</a>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(212,167,107,0.35)' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary btn-full"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <><LogIn size={16} /> Sign In</>
                                )}
                            </motion.button>
                        </form>

                        {/* Social login */}
                        <div className="mt-6 pt-6 border-t border-border">
                            <p className="text-xs text-text-muted text-center mb-4">Or continue with</p>
                            <div className="grid grid-cols-2 gap-3">
                                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="btn btn-white !text-xs cursor-pointer">
                                    <span className="text-lg">G</span> Google
                                </motion.button>
                                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="btn btn-white !text-xs cursor-pointer">
                                    <span className="text-lg">📘</span> Facebook
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-center text-sm text-text-light mt-6"
                    >
                        Don't have an account? <Link to="/signup" className="text-accent font-semibold hover:text-accent-hover">Sign Up <ArrowRight size={12} className="inline" /></Link>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
