import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfilePhotoUpload } from "./ProfilePhotoUpload";

interface ProfileHeaderProps {
  avatarUrl?: string | null;
  fullName?: string | null;
  onAvatarUpdate: (url: string) => void;
}

export function ProfileHeader({ avatarUrl, fullName, onAvatarUpdate }: ProfileHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seu Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <ProfilePhotoUpload
            avatarUrl={avatarUrl}
            fullName={fullName}
            onUploadComplete={onAvatarUpdate}
          />
        </div>
      </CardContent>
    </Card>
  );
}