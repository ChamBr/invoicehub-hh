import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountrySelect } from "@/components/ui/country-select";
import { ProfilePhotoUpload } from "./components/ProfilePhotoUpload";
import { profileSchema, type ProfileFormData } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      phone: profile?.phone || "",
      birth_month: profile?.birth_date ? new Date(profile.birth_date).getMonth().toString() : "",
      birth_year: profile?.birth_date ? new Date(profile.birth_date).getFullYear().toString() : "",
      gender: profile?.gender as "masculino" | "feminino" | undefined,
      country: profile?.country || "BR",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado");

      const birthDate = data.birth_month && data.birth_year 
        ? new Date(parseInt(data.birth_year), parseInt(data.birth_month)).toISOString()
        : null;

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: data.full_name,
          phone: data.phone,
          birth_date: birthDate,
          gender: data.gender,
          country: data.country,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: "Ocorreu um erro ao atualizar suas informações.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpdate = async (url: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("profiles")
      .update({ avatar_url: url })
      .eq("id", user.id);
  };

  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Seu Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <ProfilePhotoUpload
                avatarUrl={profile?.avatar_url}
                fullName={profile?.full_name}
                onUploadComplete={handleAvatarUpdate}
              />
            </div>

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
                    value={user?.email || ""}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;