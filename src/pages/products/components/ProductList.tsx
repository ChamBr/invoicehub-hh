import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  stock: number | null;
  status: string;
}

interface ProductListProps {
  products: Product[] | null;
  isLoading: boolean;
}

const ProductList = ({ products, isLoading }: ProductListProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="p-4">Carregando...</div>;
  }

  if (!products?.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        Nenhum produto cadastrado
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Preço
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estoque
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.type === "product" ? "Produto" : "Serviço"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.type === "product" ? product.stock : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status === "active" ? "Ativo" : "Inativo"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;