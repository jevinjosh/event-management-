import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-primary">
            <div className="text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif font-bold text-[120px] md:text-[180px] leading-none text-accent/20"
                >
                    404
                </motion.h1>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h2 className="heading-md mb-3 -mt-8">Page Not Found</h2>
                    <p className="body-text mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button to="/" variant="primary"><Home size={16} /> Go Home</Button>
                        <Button to="/events" variant="outline"><ArrowLeft size={16} /> Browse Events</Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
