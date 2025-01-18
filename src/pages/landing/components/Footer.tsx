export const Footer = () => {
  return (
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
  );
};