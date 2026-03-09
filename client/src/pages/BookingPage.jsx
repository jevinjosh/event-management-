import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, Users, Package, Plus, Minus, CreditCard, CheckCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { socialServices } from '../data/socialServices';
import { corporateServices } from '../data/corporateServices';
import { toast } from 'react-toastify';

const allEvents = [...socialServices, ...corporateServices].map((s, i) => ({
    ...s, _id: s.id, title: s.name,
    price: [25000, 50000, 75000, 35000, 45000, 100000][i % 6],
    dateSlots: ['2025-03-15', '2025-04-10', '2025-05-20', '2025-06-12'],
    packages: [
        { name: 'Standard', price: [25000, 35000, 45000][i % 3], features: ['Basic decor', 'Photography', 'Catering 50'] },
        { name: 'Premium', price: [75000, 85000, 95000][i % 3], features: ['Premium decor', 'Photo+Video', 'Catering 150', 'Coordinator'] },
        { name: 'VIP', price: [150000, 180000, 200000][i % 3], features: ['Luxury decor', 'Full production', 'Cinematic video', 'Catering 300+', 'Full team'] },
    ],
}));

const addOns = [
    { name: 'Live Band', price: 15000 },
    { name: 'Flower Decoration Upgrade', price: 8000 },
    { name: 'Fireworks Display', price: 12000 },
    { name: 'Photo Booth', price: 5000 },
    { name: 'Valet Parking', price: 6000 },
];

export default function BookingPage() {
    const { eventId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const event = allEvents.find(e => e.slug === eventId);
    const prePackage = searchParams.get('package') || '';
    const preDate = searchParams.get('date') || '';

    const [selectedPkg, setSelectedPkg] = useState(prePackage || 'Standard');
    const [selectedDate, setSelectedDate] = useState(preDate || (event?.dateSlots[0] || ''));
    const [tickets, setTickets] = useState(1);
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [bookingComplete, setBookingComplete] = useState(false);
    const [qrCode, setQrCode] = useState(null);

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-primary text-center">
                <h1 className="heading-lg mb-3">Login Required</h1>
                <p className="body-text mb-6">Please login to book events.</p>
                <Button to={`/login?redirect=/book/${eventId}`} variant="primary">Login to Continue</Button>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-primary">
                <h1 className="heading-lg mb-4">Event Not Found</h1>
                <Button to="/events" variant="primary"><ArrowLeft size={16} /> Back to Events</Button>
            </div>
        );
    }

    const pkg = event.packages.find(p => p.name === selectedPkg) || event.packages[0];
    const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    const totalPrice = (pkg.price * tickets) + addOnsTotal;

    const toggleAddOn = (addOn) => {
        setSelectedAddOns(prev =>
            prev.find(a => a.name === addOn.name)
                ? prev.filter(a => a.name !== addOn.name)
                : [...prev, addOn]
        );
    };

    const handlePayment = async () => {
        try {
            // Simulate Razorpay payment flow
            toast.info('Opening payment gateway...');
            await new Promise(r => setTimeout(r, 1500));

            // Mock QR code - in production this comes from server
            const mockQR = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="white" width="200" height="200"/><text x="100" y="90" text-anchor="middle" font-size="12" fill="#333">NOCTERRA BOOKING</text><text x="100" y="110" text-anchor="middle" font-size="10" fill="#D4A76B">ID: NB-${Date.now().toString(36).toUpperCase()}</text><text x="100" y="130" text-anchor="middle" font-size="9" fill="#666">${event.title}</text><rect x="40" y="20" width="120" height="8" fill="#D4A76B" rx="4"/></svg>`)}`;

            setQrCode(mockQR);
            setBookingComplete(true);
            toast.success('Payment successful! Booking confirmed.');
        } catch (error) {
            toast.error('Payment failed. Please try again.');
        }
    };

    if (bookingComplete) {
        return (
            <section className="section-padding bg-primary">
                <div className="container-custom max-w-lg text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }}>
                        <CheckCircle size={72} className="text-success mx-auto mb-4" />
                    </motion.div>
                    <h1 className="heading-lg mb-2">Booking Confirmed!</h1>
                    <p className="body-text mb-6">Your event has been booked successfully.</p>
                    <div className="card mb-6">
                        <div className="space-y-2 text-sm text-left">
                            <p><strong>Event:</strong> {event.title}</p>
                            <p><strong>Package:</strong> {selectedPkg}</p>
                            <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            <p><strong>Guests:</strong> {tickets}</p>
                            <p><strong>Total:</strong> <span className="text-accent font-bold">₹{totalPrice.toLocaleString()}</span></p>
                        </div>
                    </div>
                    {qrCode && (
                        <div className="qr-container mx-auto mb-6">
                            <img src={qrCode} alt="Booking QR Code" className="w-48 h-48" />
                            <p className="text-xs text-text-muted">Scan for booking details</p>
                            <a href={qrCode} download="booking-qr.png" className="btn btn-outline !text-xs !px-4 !py-2 mt-2">
                                <Download size={14} /> Download QR
                            </a>
                        </div>
                    )}
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button to="/dashboard" variant="primary">View Dashboard</Button>
                        <Button to="/events" variant="outline">Browse More Events</Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="relative hero-gradient py-12 md:py-16">
                <div className="container-custom">
                    <Button to={`/events/${event.slug}`} variant="white" className="!text-xs mb-4"><ArrowLeft size={14} /> Back to Event</Button>
                    <h1 className="heading-lg">Book: {event.title}</h1>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Form */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Date */}
                            <ScrollReveal>
                                <h2 className="heading-md mb-4 flex items-center gap-2"><Calendar size={20} className="text-accent" /> Select Date</h2>
                                <div className="flex flex-wrap gap-3">
                                    {event.dateSlots.map(d => (
                                        <button
                                            key={d}
                                            onClick={() => setSelectedDate(d)}
                                            className={`px-5 py-3 rounded-xl border text-sm font-ui font-medium transition-all cursor-pointer ${selectedDate === d ? 'bg-accent text-white border-accent' : 'bg-white border-border text-text hover:border-accent'
                                                }`}
                                        >
                                            {new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </button>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* Package */}
                            <ScrollReveal>
                                <h2 className="heading-md mb-4 flex items-center gap-2"><Package size={20} className="text-accent" /> Select Package</h2>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {event.packages.map((p, i) => (
                                        <button
                                            key={p.name}
                                            onClick={() => setSelectedPkg(p.name)}
                                            className={`package-card text-left cursor-pointer ${selectedPkg === p.name ? 'border-accent ring-2 ring-accent/20' : ''} ${i === 1 ? 'popular' : ''}`}
                                        >
                                            <h3 className="font-serif font-bold text-base mb-1">{p.name}</h3>
                                            <p className="text-xl font-serif font-bold text-accent mb-3">₹{p.price.toLocaleString()}</p>
                                            <ul className="space-y-1">
                                                {p.features.map((f, j) => (
                                                    <li key={j} className="text-xs text-text-light flex items-start gap-1.5"><span className="text-accent">✓</span>{f}</li>
                                                ))}
                                            </ul>
                                        </button>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* Guests */}
                            <ScrollReveal>
                                <h2 className="heading-md mb-4 flex items-center gap-2"><Users size={20} className="text-accent" /> Number of Guests</h2>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setTickets(Math.max(1, tickets - 1))} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors cursor-pointer">
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-serif font-bold text-2xl text-text min-w-[3ch] text-center">{tickets}</span>
                                    <button onClick={() => setTickets(tickets + 1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors cursor-pointer">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </ScrollReveal>

                            {/* Add-ons */}
                            <ScrollReveal>
                                <h2 className="heading-md mb-4">Add-Ons <span className="text-text-muted text-sm font-sans font-normal">(Optional)</span></h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {addOns.map(a => {
                                        const active = selectedAddOns.find(x => x.name === a.name);
                                        return (
                                            <button
                                                key={a.name}
                                                onClick={() => toggleAddOn(a)}
                                                className={`card-flat flex items-center justify-between cursor-pointer transition-all ${active ? 'border-accent bg-accent/5' : ''}`}
                                            >
                                                <div className="text-left">
                                                    <p className="font-ui font-medium text-sm text-text">{a.name}</p>
                                                    <p className="text-xs text-accent font-semibold">+₹{a.price.toLocaleString()}</p>
                                                </div>
                                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${active ? 'bg-accent border-accent' : 'border-border'}`}>
                                                    {active && <CheckCircle size={12} className="text-white" />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 card">
                                <h3 className="font-serif font-semibold text-text mb-4">Booking Summary</h3>
                                <div className="space-y-3 text-sm border-b border-border pb-4 mb-4">
                                    <div className="flex justify-between"><span className="text-text-light">Event</span><span className="font-medium text-text">{event.title}</span></div>
                                    <div className="flex justify-between"><span className="text-text-light">Date</span><span className="font-medium text-text">{selectedDate ? new Date(selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}</span></div>
                                    <div className="flex justify-between"><span className="text-text-light">Package</span><span className="font-medium text-text">{selectedPkg}</span></div>
                                    <div className="flex justify-between"><span className="text-text-light">Guests</span><span className="font-medium text-text">{tickets}</span></div>
                                    <div className="flex justify-between"><span className="text-text-light">Package × {tickets}</span><span className="font-medium text-text">₹{(pkg.price * tickets).toLocaleString()}</span></div>
                                    {selectedAddOns.map(a => (
                                        <div key={a.name} className="flex justify-between text-xs">
                                            <span className="text-text-muted">+ {a.name}</span>
                                            <span className="text-text-muted">₹{a.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mb-5">
                                    <span className="font-serif font-semibold text-text">Total</span>
                                    <span className="font-serif font-bold text-2xl text-accent">₹{totalPrice.toLocaleString()}</span>
                                </div>
                                <Button onClick={handlePayment} variant="primary" fullWidth>
                                    <CreditCard size={16} /> Pay & Confirm
                                </Button>
                                <p className="text-[10px] text-text-muted text-center mt-2">Secured by Razorpay</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
