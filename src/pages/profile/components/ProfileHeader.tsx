import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfilePhotoUpload } from "./ProfilePhotoUpload";

interface ProfileHeaderProps {
  avatarUrl?: string | null;
  fullName?: string | null;
  onAvatarUpdate: (url: string) => void;
}

export function ProfileHeader({ avatarUrl, fullName, onAvatarUpdate }: ProfileHeaderProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Meu Perfil</h2>
      <div className="flex items-start gap-6">
        <ProfilePhotoUpload
          avatarUrl={avatarUrl}
          fullName={fullName}
          onUploadComplete={onAvatarUpdate}
        />
        <div className="space-y-1">
          <p className="text-lg font-medium text-gray-900">{fullName || "Usuário"}</p>
          <p className="text-sm text-gray-500">
            Mantenha seus dados pessoais atualizados
          </p>
        </div>
      </div>
    </div>
  );
}