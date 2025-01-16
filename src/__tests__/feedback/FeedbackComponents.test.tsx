import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';
import { FeedbackHeader } from '@/components/feedback/FeedbackHeader';
import { FeedbackActions } from '@/components/feedback/FeedbackActions';

describe('Feedback Components', () => {
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

  describe('FeedbackHeader', () => {
    it('should render with correct translation', () => {
      renderWithI18n(<FeedbackHeader />);
      expect(screen.getByText('Suporte & Feedback')).toBeInTheDocument();
    });
  });

  describe('FeedbackForm', () => {
    const mockProps = {
      type: 'bug',
      title: '',
      description: '',
      onTypeChange: jest.fn(),
      onTitleChange: jest.fn(),
      onDescriptionChange: jest.fn(),
    };

    it('should render all form fields with correct translations', () => {
      renderWithI18n(<FeedbackForm {...mockProps} />);
      
      expect(screen.getByText('Tipo de Feedback')).toBeInTheDocument();
      expect(screen.getByText('Título')).toBeInTheDocument();
      expect(screen.getByText('Descrição')).toBeInTheDocument();
    });

    it('should call onChange handlers when fields change', () => {
      renderWithI18n(<FeedbackForm {...mockProps} />);
      
      const titleInput = screen.getByLabelText('Título');
      fireEvent.change(titleInput, { target: { value: 'Novo título' } });
      
      expect(mockProps.onTitleChange).toHaveBeenCalled();
    });
  });

  describe('FeedbackActions', () => {
    it('should render submit button with correct text', () => {
      const mockProps = {
        isSubmitting: false,
        onSubmit: jest.fn(),
      };

      renderWithI18n(<FeedbackActions {...mockProps} />);
      expect(screen.getByText('Enviar Feedback')).toBeInTheDocument();
    });

    it('should show loading text when submitting', () => {
      const mockProps = {
        isSubmitting: true,
        onSubmit: jest.fn(),
      };

      renderWithI18n(<FeedbackActions {...mockProps} />);
      expect(screen.getByText('Enviando...')).toBeInTheDocument();
    });
  });
});