import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star, Shield, Users, ChartBarIcon, DollarSign, CreditCard, CheckCircle, Rocket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LandingContent {
  id: string;
  section: string;
  title: string;
  description: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  order_index: number;
}

interface Testimonial {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  avatar_url: string | null;
  content: string;
  rating: number;
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

const LandingPage = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState<LandingContent[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const { data: landingContent, error: contentError } = await supabase
        .from("landing_page_content")
        .select("*")
        .order("order_index");

      if (contentError) {
        console.error("Error fetching landing content:", contentError);
      } else {
        setContent(landingContent);
      }

      const { data: testimonialData, error: testimonialError } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("is_featured", { ascending: false });

      if (testimonialError) {
        console.error("Error fetching testimonials:", testimonialError);
      } else {
        setTestimonials(testimonialData);
      }
    };

    fetchContent();
  }, []);

  const heroContent = content.find(item => item.section === "hero");
  const featuresContent = content.find(item => item.section === "features");
  const pricingContent = content.find(item => item.section === "pricing");
  const ctaContent = content.find(item => item.section === "cta");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.svg" alt="InvoiceHub" className="h-8 w-auto" />
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/login">
              <Button>Começar Grátis</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {heroContent?.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {heroContent?.description}
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {featuresContent?.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {featuresContent?.description}
            </p>
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

      {/* Testimonials Section */}
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

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">{ctaContent?.title}</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">{ctaContent?.description}</p>
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">InvoiceHub</h3>
              <p className="text-sm">
                Simplifique sua gestão financeira com a melhor plataforma de faturamento.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li>Recursos</li>
                <li>Preços</li>
                <li>Integrações</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>Sobre</li>
                <li>Blog</li>
                <li>Carreiras</li>
                <li>Contato</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>Privacidade</li>
                <li>Termos</li>
                <li>Segurança</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; 2024 InvoiceHub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;