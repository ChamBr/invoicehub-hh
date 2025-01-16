import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfilePhotoUploadProps {
  avatarUrl?: string | null;
  fullName?: string | null;
  onUploadComplete: (url: string) => void;
}

export function ProfilePhotoUpload({ avatarUrl, fullName, onUploadComplete }: ProfilePhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl);

      toast({
        title: "Foto atualizada",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar foto",
        description: "Ocorreu um erro ao fazer upload da sua foto.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={avatarUrl ?? undefined} />
        <AvatarFallback>{fullName?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          disabled={isUploading}
          onClick={() => document.getElementById('photo-upload')?.click()}
        >
          {isUploading ? "Enviando..." : "Alterar foto"}
        </Button>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-sm text-muted-foreground">
          JPG ou PNG. Máximo 2MB.
        </p>
      </div>
    </div>
  );
}