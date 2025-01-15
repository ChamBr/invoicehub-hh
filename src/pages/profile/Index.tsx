import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { CountrySelect } from "@/components/ui/country-select";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";

const ProfileIndex = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: companyProfile, isLoading: isLoadingCompany } = useQuery({
    queryKey: ["company-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("company_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const updateCompanyProfile = useMutation({
    mutationFn: async (formData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      let logoUrl = companyProfile?.logo_url;

      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const filePath = `${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from('company-logos')
          .upload(filePath, logoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('company-logos')
          .getPublicUrl(filePath);

        logoUrl = publicUrl;
      }

      const companyData = {
        user_id: user.id,
        company_name: formData.get('company_name'),
        address_line1: formData.get('address_line1'),
        address_line2: formData.get('address_line2'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip_code: formData.get('zip_code'),
        country: formData.get('country'),
        phone: formData.get('phone'),
        mobile: formData.get('mobile'),
        display_phone: formData.get('display_phone') === 'true',
        tax_id: formData.get('tax_id'),
        display_tax_id: formData.get('display_tax_id') === 'true',
        email: formData.get('email'),
        website: formData.get('website'),
        logo_url: logoUrl,
        display_logo: formData.get('display_logo') === 'true',
      };

      const { error } = await supabase
        .from('company_profiles')
        .upsert(companyData);

      if (error) throw error;
      return companyData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-profile"] });
      toast({
        title: "Profile updated",
        description: "Company information has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating",
        description: "An error occurred while updating company information.",
        variant: "destructive",
      });
      console.error("Error updating profile:", error);
    },
  });

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressSelect = (address: any) => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('address_line1', address.line1);
      formData.set('address_line2', address.line2 || '');
      formData.set('city', address.city);
      formData.set('state', address.state);
      formData.set('zip_code', address.postalCode);
      formData.set('country', address.country);
      updateCompanyProfile.mutate(formData);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    updateCompanyProfile.mutate(formData);
  };

  if (isLoadingProfile || isLoadingCompany) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* User Profile */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">User Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200">
              {profile?.avatar_url && (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{profile?.full_name}</h3>
              <p className="text-gray-600">{profile?.company}</p>
            </div>
          </div>
        </div>

        {/* Company Profile */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-2xl font-bold">Company Information</h2>

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label htmlFor="logo">Company Logo</Label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {(logoPreview || companyProfile?.logo_url) && (
                  <img
                    src={logoPreview || companyProfile?.logo_url}
                    alt="Logo Preview"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
                <div className="flex items-center gap-2">
                  <Switch
                    id="display_logo"
                    name="display_logo"
                    defaultChecked={companyProfile?.display_logo}
                  />
                  <Label htmlFor="display_logo">Display logo on invoice</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                name="company_name"
                defaultValue={companyProfile?.company_name}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax_id">Tax ID</Label>
              <div className="space-y-2">
                <Input
                  id="tax_id"
                  name="tax_id"
                  defaultValue={companyProfile?.tax_id}
                />
                <div className="flex items-center gap-2">
                  <Switch
                    id="display_tax_id"
                    name="display_tax_id"
                    defaultChecked={companyProfile?.display_tax_id}
                  />
                  <Label htmlFor="display_tax_id">Display Tax ID on invoice</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
            <div className="space-y-2">
              <Label htmlFor="address_line2">Address Line 2 (Optional)</Label>
              <Input
                id="address_line2"
                name="address_line2"
                defaultValue={companyProfile?.address_line2}
                placeholder="Apartment, suite, unit, etc."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={companyProfile?.city}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  defaultValue={companyProfile?.state}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip_code">ZIP Code</Label>
                <Input
                  id="zip_code"
                  name="zip_code"
                  defaultValue={companyProfile?.zip_code}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <CountrySelect
                value={companyProfile?.country || 'US'}
                onValueChange={(value) => {
                  const form = document.querySelector('form');
                  if (form) {
                    const formData = new FormData(form);
                    formData.set('country', value);
                    updateCompanyProfile.mutate(formData);
                  }
                }}
              />
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={companyProfile?.phone}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  defaultValue={companyProfile?.mobile}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="display_phone"
                name="display_phone"
                defaultChecked={companyProfile?.display_phone}
              />
              <Label htmlFor="display_phone">
                Display phone/mobile on invoice
              </Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={companyProfile?.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  defaultValue={companyProfile?.website}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={updateCompanyProfile.isPending}
          >
            {updateCompanyProfile.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileIndex;