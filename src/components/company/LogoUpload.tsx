import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageIcon } from "lucide-react";

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
    <div className="space-y-4">
      <Label htmlFor="logo">Logo da Empresa</Label>
      <div className="space-y-2">
        <label
          htmlFor="logo"
          className="relative block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
        >
          {(logoPreview || logoUrl) ? (
            <img
              src={logoPreview || logoUrl}
              alt="Logo Preview"
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ImageIcon className="w-8 h-8 mb-2" />
              <span className="text-sm">Clique para fazer upload do logo</span>
            </div>
          )}
          <input
            id="logo"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
        </label>
        <div className="flex items-center gap-2">
          <Switch
            id="display_logo"
            name="display_logo"
            checked={displayLogo}
            onCheckedChange={onDisplayLogoChange}
          />
          <Label htmlFor="display_logo" className="text-sm text-muted-foreground">
            Exibir logo na fatura
          </Label>
        </div>
      </div>
    </div>
  );
};