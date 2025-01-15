import { CustomerForm } from "@/components/customers/CustomerForm";

const NewCustomer = () => {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Novo Cliente</h1>
          <p className="text-muted-foreground">
            Cadastre um novo cliente para emissão de faturas
          </p>
        </div>

        <CustomerForm />
      </div>
    </div>
  );
};

export default NewCustomer;