import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Calendar, DollarSign, Plus, Trash2, Edit, Eye, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const mockStats = [
    { label: 'Total Revenue', value: '₹24.5L', change: '+12%', icon: <DollarSign size={20} /> },
    { label: 'Bookings', value: '156', change: '+8%', icon: <Calendar size={20} /> },
    { label: 'Users', value: '892', change: '+23%', icon: <Users size={20} /> },
    { label: 'Events', value: '35', change: '+3', icon: <BarChart3 size={20} /> },
];

const mockBookings = [
    { _id: '1', user: { name: 'Priya S.', email: 'priya@gmail.com' }, event: { title: 'Wedding' }, date: '2025-03-15', package: 'Premium', totalPrice: 85000, status: 'confirmed' },
    { _id: '2', user: { name: 'Vikram R.', email: 'vikram@gmail.com' }, event: { title: 'Conference' }, date: '2025-04-10', package: 'VIP', totalPrice: 200000, status: 'pending' },
    { _id: '3', user: { name: 'Ananya M.', email: 'ananya@gmail.com' }, event: { title: 'Birthday' }, date: '2025-03-20', package: 'Standard', totalPrice: 25000, status: 'confirmed' },
];

const mockUsers = [
    { _id: '1', name: 'Priya Sharma', email: 'priya@gmail.com', role: 'user', createdAt: '2025-01-15' },
    { _id: '2', name: 'Vikram Raj', email: 'vikram@gmail.com', role: 'user', createdAt: '2025-02-01' },
    { _id: '3', name: 'Ananya Menon', email: 'ananya@gmail.com', role: 'user', createdAt: '2025-02-10' },
];

const tabs = [
    { key: 'overview', label: 'Overview', icon: <BarChart3 size={15} /> },
    { key: 'events', label: 'Events', icon: <Calendar size={15} /> },
    { key: 'bookings', label: 'Bookings', icon: <DollarSign size={15} /> },
    { key: 'users', label: 'Users', icon: <Users size={15} /> },
];

export default function AdminDashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <section className="section-padding bg-primary">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                    <div>
                        <h1 className="heading-lg">Admin Dashboard</h1>
                        <p className="body-text">Welcome back, {user?.name || 'Admin'}</p>
                    </div>
                    <Button to="/events" variant="primary" className="mt-3 md:mt-0"><Plus size={16} /> Add Event</Button>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full border text-sm font-ui font-medium transition-all cursor-pointer ${activeTab === tab.key ? 'bg-accent text-white border-accent' : 'bg-white border-border text-text-light hover:border-accent'
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Overview */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {mockStats.map((s, i) => (
                                <motion.div key={i} whileHover={{ y: -2 }} className="stats-card">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-accent">{s.icon}</span>
                                        <span className="text-xs font-ui font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">{s.change}</span>
                                    </div>
                                    <p className="stats-number">{s.value}</p>
                                    <p className="text-xs text-text-muted mt-1">{s.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recent Bookings */}
                        <div className="card">
                            <h3 className="font-serif font-semibold text-text mb-4">Recent Bookings</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-xs text-text-muted border-b border-border">
                                            <th className="pb-3 font-ui font-semibold">Customer</th>
                                            <th className="pb-3 font-ui font-semibold">Event</th>
                                            <th className="pb-3 font-ui font-semibold">Date</th>
                                            <th className="pb-3 font-ui font-semibold">Amount</th>
                                            <th className="pb-3 font-ui font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockBookings.map(b => (
                                            <tr key={b._id} className="border-b border-border/50 text-sm">
                                                <td className="py-3">
                                                    <p className="font-medium text-text">{b.user.name}</p>
                                                    <p className="text-xs text-text-muted">{b.user.email}</p>
                                                </td>
                                                <td className="py-3 text-text-light">{b.event.title}</td>
                                                <td className="py-3 text-text-light">{new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                                                <td className="py-3 font-serif font-bold text-accent">₹{b.totalPrice.toLocaleString()}</td>
                                                <td className="py-3">
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-ui font-semibold uppercase ${b.status === 'confirmed' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'
                                                        }`}>{b.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Manage Events */}
                {activeTab === 'events' && (
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-serif font-semibold text-text">Manage Events</h3>
                            <Button variant="primary" className="!text-xs"><Plus size={14} /> Add Event</Button>
                        </div>
                        <p className="text-sm text-text-muted text-center py-8">Event management coming soon. Use the API to create events.</p>
                    </div>
                )}

                {/* Bookings */}
                {activeTab === 'bookings' && (
                    <div className="card">
                        <h3 className="font-serif font-semibold text-text mb-4">All Bookings</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-xs text-text-muted border-b border-border">
                                        <th className="pb-3 font-ui font-semibold">Customer</th>
                                        <th className="pb-3 font-ui font-semibold">Event</th>
                                        <th className="pb-3 font-ui font-semibold">Package</th>
                                        <th className="pb-3 font-ui font-semibold">Date</th>
                                        <th className="pb-3 font-ui font-semibold">Amount</th>
                                        <th className="pb-3 font-ui font-semibold">Status</th>
                                        <th className="pb-3 font-ui font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockBookings.map(b => (
                                        <tr key={b._id} className="border-b border-border/50 text-sm">
                                            <td className="py-3 font-medium text-text">{b.user.name}</td>
                                            <td className="py-3 text-text-light">{b.event.title}</td>
                                            <td className="py-3 text-text-light">{b.package}</td>
                                            <td className="py-3 text-text-light">{new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                                            <td className="py-3 font-serif font-bold text-accent">₹{b.totalPrice.toLocaleString()}</td>
                                            <td className="py-3">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${b.status === 'confirmed' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'}`}>{b.status}</span>
                                            </td>
                                            <td className="py-3">
                                                <button className="text-accent hover:text-accent-hover cursor-pointer"><Eye size={15} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Users */}
                {activeTab === 'users' && (
                    <div className="card">
                        <h3 className="font-serif font-semibold text-text mb-4">Registered Users</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-xs text-text-muted border-b border-border">
                                        <th className="pb-3 font-ui font-semibold">Name</th>
                                        <th className="pb-3 font-ui font-semibold">Email</th>
                                        <th className="pb-3 font-ui font-semibold">Role</th>
                                        <th className="pb-3 font-ui font-semibold">Joined</th>
                                        <th className="pb-3 font-ui font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockUsers.map(u => (
                                        <tr key={u._id} className="border-b border-border/50 text-sm">
                                            <td className="py-3 font-medium text-text">{u.name}</td>
                                            <td className="py-3 text-text-light">{u.email}</td>
                                            <td className="py-3"><span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-text-muted font-semibold uppercase">{u.role}</span></td>
                                            <td className="py-3 text-text-light">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                                            <td className="py-3">
                                                <button onClick={() => toast.success('User deleted')} className="text-error hover:text-red-700 cursor-pointer"><Trash2 size={15} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
