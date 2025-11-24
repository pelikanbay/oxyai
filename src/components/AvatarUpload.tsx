import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, User } from "lucide-react";
import { toast } from "sonner";

interface AvatarUploadProps {
  userId: string;
  currentAvatarUrl: string | null;
  onAvatarChange: (url: string | null) => void;
}

const AvatarUpload = ({ userId, currentAvatarUrl, onAvatarChange }: AvatarUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Te rugăm să încarci o imagine validă");
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Imaginea nu poate depăși 5MB");
        return;
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${Math.random()}.${fileExt}`;

      // Delete old avatar if exists
      if (currentAvatarUrl) {
        const oldPath = currentAvatarUrl.split('/').pop();
        if (oldPath) {
          await supabase.storage.from('avatars').remove([`${userId}/${oldPath}`]);
        }
      }

      // Upload new avatar
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      onAvatarChange(publicUrl);
      toast.success("Avatar actualizat cu succes!");
    } catch (error: any) {
      toast.error("Eroare la încărcarea avatarului: " + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="w-32 h-32 border-4 border-primary/20">
          <AvatarImage src={currentAvatarUrl || undefined} alt="Avatar" />
          <AvatarFallback className="bg-muted">
            <User className="w-16 h-16 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="absolute bottom-0 right-0 rounded-full shadow-lg"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        className="hidden"
      />
      <p className="text-xs text-muted-foreground text-center">
        Click pe cameră pentru a schimba avatarul<br />
        Maxim 5MB (JPG, PNG, WEBP, GIF)
      </p>
    </div>
  );
};

export default AvatarUpload;
