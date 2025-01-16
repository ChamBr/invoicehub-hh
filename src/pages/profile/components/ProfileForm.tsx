import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProfileFormData, profileSchema } from "../schema";
import { useNavigate } from "react-router-dom";

interface ProfileFormProps {
  initialData: Partial<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  userEmail?: string;
  isLoading?: boolean;
}

export function ProfileForm({ initialData, onSubmit, userEmail, isLoading }: ProfileFormProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  const getGenderLabel = (gender: string) => {
    if (i18n.language === 'es') {
      return gender === 'masculino' ? 'Masculino' : 'Femenino';
    }
    if (i18n.language === 'en') {
      return gender === 'masculino' ? 'Male' : 'Female';
    }
    return gender === 'masculino' ? 'Masculino' : 'Feminino';
  };

  const getCountryLabel = (code: string) => {
    const countries = {
      BR: {
        pt: 'Brasil',
        en: 'Brazil',
        es: 'Brasil'
      },
      US: {
        pt: 'Estados Unidos',
        en: 'United States',
        es: 'Estados Unidos'
      }
    };
    
    return countries[code as keyof typeof countries]?.[i18n.language as keyof typeof countries['BR']] || code;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={userEmail || ""}
            disabled
            className="bg-gray-100"
          />
          <p className="text-sm text-gray-500">
            O e-mail não pode ser alterado pois é usado para autenticação
          </p>
        </div>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>País</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BR">{getCountryLabel('BR')}</SelectItem>
                  <SelectItem value="US">{getCountryLabel('US')}</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Celular</FormLabel>
              <FormControl>
                <Input {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="birth_month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mês de Nascimento</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {new Date(2000, i).toLocaleString(i18n.language, { month: 'long' })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birth_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano de Nascimento</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder="AAAA"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexo</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">
                    {getGenderLabel('masculino')}
                  </SelectItem>
                  <SelectItem value="feminino">
                    {getGenderLabel('feminino')}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </Form>
  );
}