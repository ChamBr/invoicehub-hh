import { supabase } from "./client";

export async function uploadAvatar(file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function uploadCompanyLogo(file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log('Iniciando upload do logo:', { fileName, filePath });

    const { error: uploadError } = await supabase.storage
      .from('company-logos')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Erro no upload:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('company-logos')
      .getPublicUrl(filePath);

    console.log('Logo enviado com sucesso:', data.publicUrl);
    return data.publicUrl;
  } catch (error) {
    console.error('Erro ao fazer upload do logo:', error);
    throw error;
  }
}