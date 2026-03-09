import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';

const galleryCategories = ['All', 'Weddings', 'Corporate', 'Birthdays', 'Cultural', 'Receptions'];

const galleryItems = [
    { id: 1, category: 'Weddings', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Royal Wedding Ceremony', desc: 'A grand traditional wedding at ECR convention hall' },
    { id: 2, category: 'Corporate', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', title: 'Tech Summit 2024', desc: 'Annual technology conference for 500+ attendees' },
    { id: 3, category: 'Birthdays', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', title: 'Magical 1st Birthday', desc: 'Fairy-tale themed birthday for little princess' },
    { id: 4, category: 'Cultural', image: 'https://images.unsplash.com/photo-1574265365637-2aa19a85e8df?w=800&q=80', title: 'Diwali Gala Night', desc: 'Traditional Diwali celebration with fireworks' },
    { id: 5, category: 'Receptions', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', title: 'Elegant Reception', desc: 'Sophisticated reception dinner at 5-star hotel' },
    { id: 6, category: 'Weddings', image: 'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=800&q=80', title: 'Beach Wedding', desc: 'Beautiful seaside ceremony at Mahabalipuram' },
    { id: 7, category: 'Corporate', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', title: 'Product Launch', desc: 'Exclusive product unveiling with live demos' },
    { id: 8, category: 'Birthdays', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', title: 'Superhero Party', desc: 'Action-packed kids birthday celebration' },
    { id: 9, category: 'Cultural', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', title: 'Pongal Festival', desc: 'Traditional harvest festival celebration' },
    { id: 10, category: 'Weddings', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80', title: 'Garden Wedding', desc: 'Intimate outdoor ceremony with floral decor' },
    { id: 11, category: 'Corporate', image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80', title: 'Award Ceremony', desc: 'Annual awards night celebrating excellence' },
    { id: 12, category: 'Receptions', image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80', title: 'Grand Reception', desc: 'Luxury reception with live entertainment' },
];

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter(i => i.category === activeCategory);

    return (
        <>
            {/* Hero with background image */}
            <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80"
                    alt="Event gallery showcase"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
                <div className="absolute bottom-20 left-16 w-3 h-3 bg-accent/60 rounded-full float-animation" />
                <div className="container-custom relative z-10">
                    <ScrollReveal>
                        <span className="badge !bg-white/10 !border-white/20 !text-accent-light mb-5 backdrop-blur-sm">Gallery</span>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
                            Our Event <span className="text-accent italic">Portfolio</span>
                        </h1>
                        <p className="text-white/70 mt-5 max-w-xl text-lg leading-relaxed">
                            Browse our collection of beautifully executed events across Chennai.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="py-24 md:py-32 bg-white">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center gap-3 mb-14">
                        {galleryCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`font-ui font-medium text-sm px-5 py-2.5 rounded-full border transition-all cursor-pointer ${activeCategory === cat ? 'bg-accent text-white border-accent' : 'bg-white border-border text-text-light hover:border-accent'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filtered.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ y: -4 }}
                                    className="card overflow-hidden group"
                                >
                                    <div className="h-52 rounded-lg mb-5 relative overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="overline text-[10px]">{item.category}</span>
                                    <h3 className="font-serif font-semibold text-text mt-2 mb-2">{item.title}</h3>
                                    <p className="text-sm text-text-light leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-dark text-center">
                <div className="container-custom">
                    <ScrollReveal>
                        <h2 className="font-serif text-3xl font-bold text-white mb-4">Want Us to Create Your Event?</h2>
                        <p className="text-white/60 mb-8 max-w-md mx-auto leading-relaxed">Let's turn your vision into an unforgettable experience.</p>
                        <div className="mt-10">
                            <Button to="/contact" variant="primary">Start Planning</Button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
