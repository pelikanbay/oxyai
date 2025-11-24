import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Politică de Cookie-uri
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Ce sunt Cookie-urile?</h2>
            <p>
              Cookie-urile sunt fișiere text mici stocate pe dispozitivul dvs. atunci când vizitați un website. 
              Acestea ne ajută să îmbunătățim experiența de utilizare și să înțelegem cum este folosită platforma noastră.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Tipuri de Cookie-uri Folosite</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1. Cookie-uri Esențiale</h3>
            <p>Necesare pentru funcționarea de bază a platformei:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>supabase-auth-token</strong>: Menține sesiunea de autentificare</li>
              <li><strong>ghost-mode</strong>: Stochează preferința pentru Ghost Mode</li>
              <li><strong>voice-mode</strong>: Salvează setările Voice Mode</li>
              <li><strong>model-settings</strong>: Păstrează modelul AI selectat și temperatura</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2. Cookie-uri de Performanță</h3>
            <p>Pentru analytics și îmbunătățirea serviciilor:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics (_ga, _gid, _gat)</strong>: Analizează traficul și comportamentul utilizatorilor</li>
              <li>Durată: 2 ani (_ga), 24 ore (_gid)</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3. Cookie-uri de Marketing</h3>
            <p>Pentru publicitate relevantă:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google AdSense</strong>: Afișează reclame personalizate</li>
              <li><strong>Cookie-uri de afiliere</strong>: Tracking pentru programe de afiliere (Amazon, NordVPN, etc.)</li>
              <li>Durată: până la 90 zile</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4. Cookie-uri Funcționale</h3>
            <p>Pentru funcționalități avansate:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Preferințe utilizator</strong>: Tema dark/light, limbă</li>
              <li><strong>Setări chat</strong>: Preferințe conversație și istoric</li>
              <li>Durată: permanentă (până la ștergere manuală)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Cookie-uri Terță Parte</h2>
            <p>Folosim servicii terțe care pot seta propriile cookie-uri:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics</strong>: google.com/analytics</li>
              <li><strong>Google AdSense</strong>: google.com/adsense</li>
              <li><strong>Stripe</strong>: stripe.com (pentru procesarea plăților)</li>
              <li><strong>Supabase</strong>: supabase.com (pentru autentificare și bază de date)</li>
            </ul>
            <p className="mt-4">
              Pentru mai multe detalii despre aceste cookie-uri, consultați politicile de confidențialitate ale serviciilor respective.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Gestionarea Cookie-urilor</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Preferințe Cookie-uri</h3>
            <p>
              La prima vizită, vei vedea un banner de cookie-uri unde poți alege:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceptă toate</strong>: Toate tipurile de cookie-uri</li>
              <li><strong>Doar esențiale</strong>: Numai cookie-urile necesare</li>
              <li><strong>Personalizează</strong>: Alege ce categorii dorești</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Setări Browser</h3>
            <p>Poți gestiona cookie-urile din setările browser-ului:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Chrome</strong>: Settings → Privacy and security → Cookies</li>
              <li><strong>Firefox</strong>: Options → Privacy & Security → Cookies</li>
              <li><strong>Safari</strong>: Preferences → Privacy → Cookies</li>
              <li><strong>Edge</strong>: Settings → Privacy & Security → Cookies</li>
            </ul>
            <p className="mt-4 text-yellow-400">
              ⚠️ Notă: Blocarea tuturor cookie-urilor poate afecta funcționalitatea platformei.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Cookie-uri și GDPR</h2>
            <p>
              Conform GDPR, avem obligația de a obține consimțământul tău explicit înainte de a seta cookie-uri 
              non-esențiale. Consimțământul poate fi retras oricând din setările cookie-urilor.
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Drepturile Tale</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dreptul de a refuza cookie-urile non-esențiale</li>
              <li>Dreptul de a-ți retrage consimțământul oricând</li>
              <li>Dreptul de a șterge cookie-urile existente</li>
              <li>Dreptul de acces la datele colectate prin cookie-uri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Durata Cookie-urilor</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-border/50 mt-4">
                <thead className="bg-background/50">
                  <tr>
                    <th className="px-4 py-2 border border-border/50 text-left text-foreground">Tip Cookie</th>
                    <th className="px-4 py-2 border border-border/50 text-left text-foreground">Durată</th>
                    <th className="px-4 py-2 border border-border/50 text-left text-foreground">Scop</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border border-border/50">Sesiune</td>
                    <td className="px-4 py-2 border border-border/50">Până la închiderea browser-ului</td>
                    <td className="px-4 py-2 border border-border/50">Autentificare temporară</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-border/50">Persistent</td>
                    <td className="px-4 py-2 border border-border/50">30 zile - 2 ani</td>
                    <td className="px-4 py-2 border border-border/50">Preferințe utilizator, Analytics</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-border/50">Third-party</td>
                    <td className="px-4 py-2 border border-border/50">Conform politicii terță parte</td>
                    <td className="px-4 py-2 border border-border/50">Publicitate, Tracking</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Actualizări Politică</h2>
            <p>
              Această politică de cookie-uri poate fi actualizată periodic pentru a reflecta schimbările în 
              practicile noastre sau cerințele legale. Te vom notifica despre modificările semnificative prin:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Notificare în aplicație</li>
              <li>Email către utilizatorii înregistrați</li>
              <li>Actualizare banner cookie-uri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
            <p>
              Pentru întrebări despre folosirea cookie-urilor, contactează-ne la:{" "}
              <a href="mailto:privacy@recyeai.com" className="text-primary hover:underline">
                privacy@recyeai.com
              </a>
            </p>
            <p className="mt-4">
              Sau scrie-ne la:<br />
              RecyeAI<br />
              Str. Cyber Security Nr. 1<br />
              București, România
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Resurse Utile</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  All About Cookies
                </a> - Ghid complet despre cookie-uri
              </li>
              <li>
                <a href="https://gdpr.eu/cookies/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  GDPR Cookie Policy
                </a> - Informații GDPR despre cookie-uri
              </li>
              <li>
                <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Your Online Choices
                </a> - Gestionează publicitatea comportamentală
              </li>
            </ul>
          </section>

          <p className="text-sm text-muted-foreground mt-8 pt-8 border-t border-border/50">
            <strong>Ultima actualizare:</strong> {new Date().toLocaleDateString('ro-RO')}<br />
            <strong>Versiune:</strong> 1.0
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
