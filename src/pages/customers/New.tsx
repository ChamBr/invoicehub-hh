import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { Switch } from "@/components/ui/switch";
import { Building, User, DollarSign, Mail, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  type: z.enum(["personal", "company"]),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido").optional().nullable(),
  phone: z.string().optional().nullable(),
  taxExempt: z.boolean().default(false),
  taxId: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
});

const NewCustomer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "personal",
      taxExempt: false,
    },
  });

  const handleAddressSelect = (address: any) => {
    form.setValue("address", address.line1);
    form.setValue("city", address.city);
    form.setValue("state", address.state);
    form.setValue("zipCode", address.postalCode);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.from("customers").insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        state: values.state,
        zip_code: values.zipCode,
        notes: values.notes,
        tax_exempt: values.taxExempt,
        tax_id: values.taxId,
        type: values.type,
      });

      if (error) throw error;

      toast({
        title: "Cliente cadastrado com sucesso!",
        description: "Você será redirecionado para a lista de clientes.",
      });

      navigate("/customers");
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar cliente",
        description: "Por favor, tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Novo Cliente</h1>
          <p className="text-muted-foreground">
            Cadastre um novo cliente para emissão de faturas
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de Cliente</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="personal" id="personal" />
                        <User className="w-4 h-4 text-muted-foreground" />
                        <label htmlFor="personal">Pessoa Física</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="company" id="company" />
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <label htmlFor="company">Empresa</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.watch("type") === "personal" ? "Nome Completo" : "Nome da Empresa"}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="email@exemplo.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="(123) 456-7890" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <AddressAutocomplete onAddressSelect={handleAddressSelect} />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Isenção de Impostos</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    O cliente está isento de impostos?
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="taxExempt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {form.watch("taxExempt") && (
                <FormField
                  control={form.control}
                  name="taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax ID (EIN/SSN)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="XX-XXXXXXX" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Adicione observações sobre o cliente..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/customers")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Cliente"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewCustomer;