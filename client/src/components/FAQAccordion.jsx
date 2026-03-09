import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ faqs }) {
    const [openId, setOpenId] = useState(null);

    return (
        <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq) => (
                <div key={faq.id} className="card-flat overflow-hidden">
                    <button
                        onClick={() =>
                            setOpenId(openId === faq.id ? null : faq.id)
                        }
                        className="w-full flex items-center justify-between py-4 px-5 text-left cursor-pointer"
                    >
                        <span className="font-serif font-semibold text-text pr-4">
                            {faq.question}
                        </span>

                        <ChevronDown
                            size={18}
                            className={`text-accent flex-shrink-0 transition-transform duration-300 ${
                                openId === faq.id ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    <AnimatePresence>
                        {openId === faq.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="px-5 pb-4 text-sm text-text-light leading-relaxed">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}