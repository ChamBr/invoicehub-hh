import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title?: string;
  description?: string;
}

export const CTASection = ({ title, description }: CTASectionProps) => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{description}</p>
          <Link to="/login">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 bg-white text-primary hover:bg-gray-100"
            >
              Começar Gratuitamente
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};