import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Shield, Loader2, Check, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TwoFactorAuth = () => {
  const [loading, setLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [factorsData, setFactorsData] = useState<any[]>([]);

  useEffect(() => {
    loadFactors();
  }, []);

  const loadFactors = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) throw error;
      setFactorsData(data?.totp || []);
    } catch (error: any) {
      console.error("Error loading factors:", error);
    }
  };

  const enrollMFA = async () => {
    try {
      setLoading(true);
      setEnrolling(true);

      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'OxyAI Authenticator'
      });

      if (error) throw error;

      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
      toast.success("Scanează codul QR cu aplicația ta de autentificare");
    } catch (error: any) {
      toast.error("Eroare la activarea 2FA: " + error.message);
      setEnrolling(false);
    } finally {
      setLoading(false);
    }
  };

  const verifyMFA = async () => {
    if (!verifyCode || verifyCode.length !== 6) {
      toast.error("Te rugăm să introduci un cod valid de 6 cifre");
      return;
    }

    try {
      setLoading(true);

      const factors = await supabase.auth.mfa.listFactors();
      const factorId = factors.data?.totp?.[factors.data.totp.length - 1]?.id;

      if (!factorId) {
        throw new Error("Nu s-a găsit factor ID");
      }

      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: verifyCode,
      });

      if (error) throw error;

      toast.success("2FA activat cu succes!");
      setEnrolling(false);
      setVerifyCode("");
      setQrCode(null);
      setSecret(null);
      loadFactors();
    } catch (error: any) {
      toast.error("Cod invalid. Te rugăm să încerci din nou.");
    } finally {
      setLoading(false);
    }
  };

  const unenrollMFA = async (factorId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.mfa.unenroll({ factorId });

      if (error) throw error;

      toast.success("2FA dezactivat cu succes");
      loadFactors();
    } catch (error: any) {
      toast.error("Eroare la dezactivarea 2FA: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelEnrollment = () => {
    setEnrolling(false);
    setQrCode(null);
    setSecret(null);
    setVerifyCode("");
  };

  const hasActiveMFA = factorsData.some(f => f.status === 'verified');

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <CardTitle>Autentificare cu Doi Factori (2FA)</CardTitle>
        </div>
        <CardDescription>
          Adaugă un nivel suplimentar de securitate contului tău
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {hasActiveMFA && (
          <Alert className="border-green-500/50 bg-green-500/10">
            <Check className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-500">
              Autentificarea cu doi factori este activată pentru contul tău
            </AlertDescription>
          </Alert>
        )}

        {!enrolling && !hasActiveMFA && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              2FA protejează contul tău prin solicitarea unui cod din aplicația ta de autentificare
              la fiecare conectare. Recomandăm aplicații ca Google Authenticator sau Authy.
            </p>
            <Button onClick={enrollMFA} disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Activează 2FA
            </Button>
          </div>
        )}

        {enrolling && qrCode && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <img src={qrCode} alt="QR Code" className="mx-auto" />
            </div>
            
            {secret && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs font-medium mb-2">Sau introdu manual codul:</p>
                <code className="text-sm break-all">{secret}</code>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Cod de Verificare</label>
              <Input
                type="text"
                placeholder="000000"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
              <p className="text-xs text-muted-foreground">
                Introdu codul din aplicația ta de autentificare
              </p>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={verifyMFA} 
                disabled={loading || verifyCode.length !== 6}
                className="flex-1"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verifică și Activează
              </Button>
              <Button 
                variant="outline" 
                onClick={cancelEnrollment}
                disabled={loading}
              >
                Anulează
              </Button>
            </div>
          </div>
        )}

        {hasActiveMFA && factorsData.map((factor) => (
          factor.status === 'verified' && (
            <div key={factor.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">{factor.friendly_name}</p>
                  <p className="text-xs text-muted-foreground">Activ</p>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => unenrollMFA(factor.id)}
                disabled={loading}
              >
                <X className="w-4 h-4 mr-1" />
                Dezactivează
              </Button>
            </div>
          )
        ))}
      </CardContent>
    </Card>
  );
};

export default TwoFactorAuth;
