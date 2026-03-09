import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, QrCode, User, History, Download, Eye, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';

const mockBookings = [
    {
        _id: 'b1', event: { title: 'Royal Wedding Ceremony', icon: '💍' }, date: '2025-03-15', package: 'Premium', tickets: 1, totalPrice: 85000, status: 'confirmed',
        qrCode: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="white" width="100" height="100"/><text x="50" y="50" text-anchor="middle" font-size="8" fill="#333">QR-NB001</text></svg>')}`
    },
    {
        _id: 'b2', event: { title: 'Tech Summit 2024', icon: '🏢' }, date: '2025-04-10', package: 'Standard', tickets: 3, totalPrice: 75000, status: 'confirmed',
        qrCode: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="white" width="100" height="100"/><text x="50" y="50" text-anchor="middle" font-size="8" fill="#333">QR-NB002</text></svg>')}`
    },
    { _id: 'b3', event: { title: 'Diwali Gala Night', icon: '🪔' }, date: '2024-11-01', package: 'VIP', tickets: 2, totalPrice: 300000, status: 'completed' },
];

const tabs = [
    { key: 'upcoming', label: 'Upcoming', icon: <Calendar size={15} /> },
    { key: 'qr', label: 'QR Codes', icon: <QrCode size={15} /> },
    { key: 'history', label: 'History', icon: <History size={15} /> },
    { key: 'profile', label: 'Profile', icon: <User size={15} /> },
];

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('upcoming');

    const upcoming = mockBookings.filter(b => b.status === 'confirmed');
    const past = mockBookings.filter(b => b.status === 'completed');

    return (
        <section className="section-padding bg-primary">
            <div className="container-custom">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card mb-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-light mx-auto mb-3 flex items-center justify-center">
                                <span className="font-serif font-bold text-2xl text-white">{user?.name?.charAt(0) || 'U'}</span>
                            </div>
                            <h3 className="font-serif font-semibold text-text">{user?.name || 'User'}</h3>
                            <p className="text-xs text-text-muted">{user?.email || 'user@email.com'}</p>
                        </div>
                        <nav className="space-y-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-ui font-medium transition-all cursor-pointer ${activeTab === tab.key ? 'bg-accent text-white' : 'text-text-light hover:bg-secondary'
                                        }`}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Main */}
                    <div className="lg:col-span-3">
                        <h1 className="heading-lg mb-6">
                            {activeTab === 'upcoming' && 'Upcoming Bookings'}
                            {activeTab === 'qr' && 'Your QR Codes'}
                            {activeTab === 'history' && 'Booking History'}
                            {activeTab === 'profile' && 'Edit Profile'}
                        </h1>

                        {/* Upcoming */}
                        {activeTab === 'upcoming' && (
                            <div className="space-y-4">
                                {upcoming.length === 0 && (
                                    <div className="card text-center py-12">
                                        <p className="text-text-muted mb-4">No upcoming bookings</p>
                                        <Button to="/events" variant="primary">Browse Events</Button>
                                    </div>
                                )}
                                {upcoming.map(b => (
                                    <motion.div key={b._id} whileHover={{ y: -2 }} className="card flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-hero to-secondary flex items-center justify-center flex-shrink-0">
                                            <span className="text-2xl">{b.event.icon}</span>
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-serif font-semibold text-text">{b.event.title}</h4>
                                            <div className="flex flex-wrap gap-3 text-xs text-text-muted mt-1">
                                                <span>{new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                <span>{b.package} Package</span>
                                                <span>{b.tickets} guest(s)</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-serif font-bold text-accent">₹{b.totalPrice.toLocaleString()}</p>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-ui font-semibold uppercase">Confirmed</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* QR Codes */}
                        {activeTab === 'qr' && (
                            <div className="grid sm:grid-cols-2 gap-6">
                                {upcoming.filter(b => b.qrCode).map(b => (
                                    <div key={b._id} className="card text-center">
                                        <div className="qr-container mx-auto mb-4">
                                            <img src={b.qrCode} alt="QR Code" className="w-36 h-36" />
                                        </div>
                                        <h4 className="font-serif font-semibold text-text mb-1">{b.event.title}</h4>
                                        <p className="text-xs text-text-muted mb-3">{new Date(b.date).toLocaleDateString('en-IN')}</p>
                                        <a href={b.qrCode} download={`booking-${b._id}.png`} className="btn btn-outline !text-xs !px-4 !py-2">
                                            <Download size={14} /> Download QR
                                        </a>
                                    </div>
                                ))}
                                {upcoming.filter(b => b.qrCode).length === 0 && (
                                    <div className="card text-center py-12 col-span-2">
                                        <p className="text-text-muted">No QR codes available yet.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* History */}
                        {activeTab === 'history' && (
                            <div className="space-y-4">
                                {past.length === 0 && <div className="card text-center py-12"><p className="text-text-muted">No past bookings yet.</p></div>}
                                {past.map(b => (
                                    <div key={b._id} className="card flex items-center gap-4 opacity-80">
                                        <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                                            <span className="text-2xl">{b.event.icon}</span>
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-serif font-semibold text-text">{b.event.title}</h4>
                                            <p className="text-xs text-text-muted">{new Date(b.date).toLocaleDateString('en-IN')} · {b.package} · {b.tickets} guest(s)</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-serif font-bold text-text-muted">₹{b.totalPrice.toLocaleString()}</p>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-text-muted font-ui font-semibold uppercase">Completed</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Profile */}
                        {activeTab === 'profile' && (
                            <div className="card max-w-lg">
                                <h3 className="font-serif font-semibold text-text mb-4">Edit Profile</h3>
                                <form className="space-y-4">
                                    <input type="text" className="form-input" defaultValue={user?.name || ''} placeholder="Full Name" />
                                    <input type="email" className="form-input" defaultValue={user?.email || ''} placeholder="Email" disabled />
                                    <input type="tel" className="form-input" defaultValue={user?.phone || ''} placeholder="Phone" />
                                    <Button type="button" variant="primary" onClick={() => toast.success('Profile updated!')}>
                                        <Edit size={14} /> Save Changes
                                    </Button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
