import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-2 bg-gray-50 text-xs text-gray-600 opacity-75">
      <div className="container mx-auto text-center">
        <p>
          InvoiceHub v0.01b - By HiveHub | alisson.ai
        </p>
      </div>
    </footer>
  );
};

export default Footer;