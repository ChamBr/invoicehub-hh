import { motion } from "framer-motion";
import { Shield, Users, ChartBarIcon, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeaturesSectionProps {
  title?: string;
  description?: string;
}

const features = [
  {
    icon: <Shield className="w-12 h-12 text-primary mb-4" />,
    title: "Segurança Garantida",
    description: "Seus dados protegidos com criptografia de ponta a ponta"
  },
  {
    icon: <Users className="w-12 h-12 text-primary mb-4" />,
    title: "Multiusuários",
    description: "Gerencie acessos e permissões para sua equipe"
  },
  {
    icon: <ChartBarIcon className="w-12 h-12 text-primary mb-4" />,
    title: "Relatórios Detalhados",
    description: "Visualize métricas e insights importantes do seu negócio"
  },
  {
    icon: <CreditCard className="w-12 h-12 text-primary mb-4" />,
    title: "Pagamentos Integrados",
    description: "Receba pagamentos diretamente nas faturas"
  }
];

export const FeaturesSection = ({ title, description }: FeaturesSectionProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full flex flex-col items-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};