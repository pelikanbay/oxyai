import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import AvatarUpload from "./AvatarUpload";

const profileSchema = z.object({
  full_name: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere").max(100),
  phone: z.string().optional(),
  bio: z.string().max(500, "Bio-ul nu poate depăși 500 de caractere").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: any;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      bio: "",
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          form.reset({
            full_name: data.full_name || "",
            phone: data.phone || "",
            bio: data.bio || "",
          });
          setAvatarUrl(data.avatar_url);
        }
      } catch (error: any) {
        console.error("Error loading profile:", error);
      }
    };

    if (user?.id) {
      loadProfile();
    }
  }, [user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: values.full_name,
          phone: values.phone,
          bio: values.bio,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profil actualizat cu succes!");
    } catch (error: any) {
      toast.error("Eroare la actualizarea profilului: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (url: string | null) => {
    setAvatarUrl(url);
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader>
        <CardTitle>Informații Personale</CardTitle>
        <CardDescription>
          Actualizează-ți informațiile de profil și imaginea
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <AvatarUpload
          userId={user.id}
          currentAvatarUrl={avatarUrl}
          onAvatarChange={handleAvatarChange}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume Complet</FormLabel>
                  <FormControl>
                    <Input placeholder="Ion Popescu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input value={user.email} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground mt-1">
                Email-ul nu poate fi modificat
              </p>
            </FormItem>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon (opțional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+40 712 345 678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (opțional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Spune-ne ceva despre tine..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvează Modificările
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
