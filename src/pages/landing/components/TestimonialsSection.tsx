import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Testimonial } from "../types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 flex-grow">{testimonial.content}</p>
                <div className="flex items-center">
                  {testimonial.avatar_url ? (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};