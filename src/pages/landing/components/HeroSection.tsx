import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title?: string;
  description?: string;
}

export const HeroSection = ({ title, description }: HeroSectionProps) => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {description}
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button size="lg" className="text-lg px-8">
                Começar Agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Ver Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};