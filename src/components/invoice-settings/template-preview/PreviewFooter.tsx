interface PreviewFooterProps {
  content: {
    footer: {
      alignment: string;
      showTerms: boolean;
      showSignature: boolean;
      includeThankYouNote?: boolean;
    };
  };
}

export const PreviewFooter = ({ content }: PreviewFooterProps) => {
  return (
    <div className={`text-${content.footer.alignment} mt-8`}>
      {content.footer.showTerms && (
        <div className="text-sm text-gray-600 mb-4">
          <h3 className="font-semibold mb-2">Termos e Condições</h3>
          <p>1. Pagamento deve ser realizado em até 30 dias após a emissão da fatura.</p>
          <p>2. Aceitamos pagamentos via PIX, transferência bancária ou cartão de crédito.</p>
          <p>3. Em caso de dúvidas, entre em contato com nosso suporte.</p>
        </div>
      )}
      {content.footer.showSignature && (
        <div className="mt-8 pt-8 border-t">
          <div className="w-48 mx-auto text-center">
            _____________________
            <div className="text-sm text-gray-600">Assinatura Autorizada</div>
          </div>
        </div>
      )}
      {content.footer.includeThankYouNote && (
        <div className="text-center mt-4 text-gray-600">
          Obrigado pela preferência!
        </div>
      )}
    </div>
  );
};