import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { CompanyBasicInfo } from '@/components/company/CompanyBasicInfo';
import { CompanyContact } from '@/components/company/CompanyContact';
import { CompanyAddress } from '@/components/company/CompanyAddress';
import { LogoUpload } from '@/components/company/LogoUpload';

describe('Company Profile Translations', () => {
  const renderWithI18n = (component: React.ReactNode) => {
    return render(
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    );
  };

  beforeEach(() => {
    i18n.changeLanguage('pt');
  });

  describe('CompanyBasicInfo Component', () => {
    it('should render with correct Portuguese translations', () => {
      renderWithI18n(
        <CompanyBasicInfo
          onCountryChange={() => {}}
          onDisplayTaxIdChange={() => {}}
        />
      );
      
      expect(screen.getByText('País')).toBeInTheDocument();
      expect(screen.getByText('Nome da Empresa')).toBeInTheDocument();
      expect(screen.getByText('CNPJ/CPF')).toBeInTheDocument();
    });
  });

  describe('CompanyContact Component', () => {
    it('should render with correct Portuguese translations', () => {
      renderWithI18n(
        <CompanyContact
          onDisplayPhoneChange={() => {}}
        />
      );
      
      expect(screen.getByText('Contato')).toBeInTheDocument();
      expect(screen.getByText('Telefone')).toBeInTheDocument();
      expect(screen.getByText('Celular')).toBeInTheDocument();
      expect(screen.getByText('E-mail')).toBeInTheDocument();
      expect(screen.getByText('Website')).toBeInTheDocument();
    });
  });

  describe('CompanyAddress Component', () => {
    it('should render with correct Portuguese translations', () => {
      renderWithI18n(
        <CompanyAddress
          onAddressSelect={() => {}}
        />
      );
      
      expect(screen.getByText('Endereço')).toBeInTheDocument();
      expect(screen.getByText('Complemento (Opcional)')).toBeInTheDocument();
      expect(screen.getByText('Cidade')).toBeInTheDocument();
      expect(screen.getByText('Estado')).toBeInTheDocument();
      expect(screen.getByText('CEP')).toBeInTheDocument();
    });
  });

  describe('LogoUpload Component', () => {
    it('should render with correct Portuguese translations', () => {
      renderWithI18n(
        <LogoUpload
          onLogoChange={() => {}}
          onDisplayLogoChange={() => {}}
        />
      );
      
      expect(screen.getByText('Logo da Empresa')).toBeInTheDocument();
      expect(screen.getByText('Exibir logo na fatura')).toBeInTheDocument();
    });
  });
});