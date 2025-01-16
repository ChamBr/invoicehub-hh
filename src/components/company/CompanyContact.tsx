import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface CompanyContactProps {
  phone?: string;
  mobile?: string;
  email?: string;
  website?: string;
  displayPhone?: boolean;
  onDisplayPhoneChange: (checked: boolean) => void;
}

export const CompanyContact = ({
  phone,
  mobile,
  email,
  website,
  displayPhone = false,
  onDisplayPhoneChange,
}: CompanyContactProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contato</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={phone}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">Celular</Label>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            defaultValue={mobile}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="display_phone"
          name="display_phone"
          checked={displayPhone}
          onCheckedChange={onDisplayPhoneChange}
        />
        <Label htmlFor="display_phone">
          Exibir telefone/celular na fatura
        </Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={email}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="url"
            defaultValue={website}
            placeholder="https://exemplo.com"
            pattern="https?://.*"
            title="Digite uma URL válida começando com http:// ou https://"
          />
        </div>
      </div>
    </div>
  );
};