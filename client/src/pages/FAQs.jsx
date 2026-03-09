import ScrollReveal from '../components/ScrollReveal';
import FAQAccordion from '../components/FAQAccordion';
import Button from '../components/Button';
import { faqs } from '../data/faqs';
import { ArrowRight } from 'lucide-react';

export default function FAQs() {
    return (
        <>
            {/* Hero with background image */}
            <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1400&q=80"
                    alt="Event planning discussion"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
                <div className="absolute top-24 right-24 w-36 h-36 bg-accent/10 rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <ScrollReveal>
                        <span className="badge !bg-white/10 !border-white/20 !text-accent-light mb-5 backdrop-blur-sm">FAQs</span>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
                            Frequently Asked <span className="text-accent italic">Questions</span>
                        </h1>
                        <p className="text-white/70 mt-5 max-w-xl text-lg leading-relaxed">
                            Get answers to common questions about our event services.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="py-24 md:py-32 bg-white">
                <div className="container-custom">
                    <FAQAccordion faqs={faqs} />
                </div>
            </section>

            <section className="py-20 md:py-28 bg-primary text-center">
                <div className="container-custom">
                    <ScrollReveal>
                        <h2 className="heading-md mb-4">Still have questions?</h2>
                        <p className="body-text mb-8 leading-relaxed">Feel free to reach out to our team anytime.</p>
                        <Button to="/contact" variant="primary">Contact Us <ArrowRight size={16} /></Button>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
