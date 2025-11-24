import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Politică de Confidențialitate
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Informații Colectate</h2>
            <p>
              RecyeAI colectează următoarele tipuri de informații:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Informații de cont: email, parolă (criptată)</li>
              <li>Informații de profil: nume, telefon, bio, avatar (opțional)</li>
              <li>Date de utilizare: conversații, mesaje, fișiere încărcate</li>
              <li>Date tehnice: adresă IP, browser, dispozitiv</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Utilizarea Informațiilor</h2>
            <p>
              Informațiile colectate sunt utilizate pentru:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Furnizarea serviciilor AI și stocarea conversațiilor</li>
              <li>Îmbunătățirea experienței utilizatorului</li>
              <li>Securitatea contului și autentificare 2FA</li>
              <li>Comunicări despre serviciu și actualizări</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Securitatea Datelor</h2>
            <p>
              Ne angajăm să protejăm informațiile tale personale prin:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Criptare SSL/TLS pentru toate comunicările</li>
              <li>Parole criptate folosind algoritmi de hash securizați</li>
              <li>Autentificare cu doi factori (2FA) disponibilă</li>
              <li>Politici stricte de acces la date (RLS)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Partajarea Datelor</h2>
            <p>
              Nu vindem sau închiriem informațiile tale personale. Datele pot fi partajate doar în următoarele situații:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cu furnizori de servicii pentru funcționarea platformei</li>
              <li>Când este necesar conform legii</li>
              <li>Pentru protejarea drepturilor și securității noastre</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cookie-uri și Tehnologii Similare</h2>
            <p>
              Folosim cookie-uri pentru:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Menținerea sesiunii de autentificare</li>
              <li>Analytics și îmbunătățirea serviciilor</li>
              <li>Publicitate (Google AdSense)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Drepturile Tale</h2>
            <p>
              Conform GDPR, ai următoarele drepturi:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dreptul de acces la datele personale</li>
              <li>Dreptul de rectificare și ștergere a datelor</li>
              <li>Dreptul de restricționare a prelucrării</li>
              <li>Dreptul la portabilitatea datelor</li>
              <li>Dreptul de opoziție</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Retenția Datelor</h2>
            <p>
              Păstrăm datele tale personale atât timp cât ai un cont activ sau cât este necesar pentru furnizarea serviciilor. 
              Poți șterge contul oricând din setările profilului.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Modificări ale Politicii</h2>
            <p>
              Ne rezervăm dreptul de a actualiza această politică de confidențialitate. Modificările vor fi comunicate 
              prin email și pe platforma noastră.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact</h2>
            <p>
              Pentru întrebări despre această politică de confidențialitate, contactează-ne la:{" "}
              <a href="mailto:contact@recyeai.com" className="text-primary hover:underline">
                contact@recyeai.com
              </a>
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
