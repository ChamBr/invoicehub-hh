import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-4 bg-gray-50 text-sm text-gray-600">
      <div className="container mx-auto text-center">
        <p>
          InvoiceHub {t('footer.version')} {t('footer.separator')} {t('footer.by')} {t('footer.company')} {t('footer.separator')} {t('footer.ai')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;