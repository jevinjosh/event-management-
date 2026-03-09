import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Star } from 'lucide-react';

export default function TestimonialsCarousel({ testimonials }) {
    return (
        <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            className="testimonials-swiper"
        >
            {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                    <div className="card h-full">
                        {/* Rating */}
                        <div className="flex gap-1 mb-3">
                            {[...Array(t.rating || 5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className="fill-accent text-accent"
                                />
                            ))}
                        </div>

                        {/* Review */}
                        <p className="text-sm text-text-light leading-relaxed italic mb-4">
                            "{t.review}"
                        </p>

                        {/* Author */}
                        <div className="mt-auto pt-3 border-t border-border">
                            <p className="font-serif font-semibold text-text text-sm">
                                {t.name}
                            </p>
                            <p className="text-xs text-text-muted">{t.role}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}