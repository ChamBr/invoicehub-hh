import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface LogoUploadProps {
  logoUrl?: string | null;
  onLogoChange: (file: File) => void;
  displayLogo?: boolean;
  onDisplayLogoChange: (checked: boolean) => void;
}

export const LogoUpload = ({
  logoUrl,
  onLogoChange,
  displayLogo,
  onDisplayLogoChange,
}: LogoUploadProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onLogoChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="logo">Logo da Empresa</Label>
      <div className="flex items-center gap-4">
        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
          {(logoPreview || logoUrl) && (
            <img
              src={logoPreview || logoUrl}
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
              checked={displayLogo}
              onCheckedChange={onDisplayLogoChange}
            />
            <Label htmlFor="display_logo">Exibir logo na fatura</Label>
          </div>
        </div>
      </div>
    </div>
  );
};