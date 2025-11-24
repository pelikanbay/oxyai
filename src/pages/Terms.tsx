import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Termeni și Condiții
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptarea Termenilor</h2>
            <p>
              Prin accesarea și utilizarea platformei RecyeAI, acceptați să respectați acești termeni și condiții. 
              Dacă nu sunteți de acord cu aceștia, vă rugăm să nu utilizați serviciile noastre.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Descrierea Serviciului</h2>
            <p>
              RecyeAI este un AI assistant specializat în cybersecurity care oferă:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Asistență pentru penetration testing și security assessments</li>
              <li>Suport pentru red teaming și adversary simulation</li>
              <li>Educație în ethical hacking și vulnerability research</li>
              <li>Salvarea și gestionarea conversațiilor</li>
              <li>Servicii gratuite și premium</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Contul Utilizatorului</h2>
            <p>
              Pentru utilizarea serviciilor complete, trebuie să:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Creați un cont cu informații reale și corecte</li>
              <li>Mențineți confidențialitatea parolei</li>
              <li>Activați autentificarea cu doi factori pentru securitate sporită</li>
              <li>Notificați imediat orice utilizare neautorizată a contului</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Utilizare Acceptabilă</h2>
            <p>
              RecyeAI este destinat exclusiv pentru scopuri educaționale și etice. Sunteți de acord să NU utilizați serviciul pentru:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Activități ilegale sau atacuri neautorizate asupra sistemelor</li>
              <li>Activități de hacking fără autorizare scrisă prealabilă</li>
              <li>Transmiterea de malware, virusi sau cod malițios</li>
              <li>Încercări de acces neautorizat la sisteme sau rețele</li>
              <li>Orice activitate care încalcă legile privind securitatea informatică</li>
            </ul>
            <p className="mt-4 font-semibold text-foreground">
              IMPORTANT: Utilizați RecyeAI doar pentru teste autorizate, educație și scopuri defensive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Proprietate Intelectuală</h2>
            <p>
              Tot conținutul platformei RecyeAI, inclusiv design, logo, și tehnologie, este proprietatea noastră 
              și este protejat de legile drepturilor de autor. Conținutul generat de AI aparține utilizatorului, 
              dar ne rezervăm dreptul de a-l utiliza pentru îmbunătățirea serviciilor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Servicii Premium și Plăți</h2>
            <p>
              RecyeAI oferă atât servicii gratuite, cât și premium:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Planul gratuit FREE - acces la funcționalități de bază</li>
              <li>Planul PRO - funcții avansate și prioritate (în curând)</li>
              <li>Planul OPS - acces complet și suport premium (în curând)</li>
              <li>Plățile se procesează securizat prin Stripe</li>
              <li>Rambursările sunt disponibile în primele 14 zile</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitări de Răspundere</h2>
            <p>
              RecyeAI furnizează servicii "așa cum sunt". Nu garantăm:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acuratețea completă a răspunsurilor AI</li>
              <li>Disponibilitatea neîntreruptă a serviciului</li>
              <li>Absența erorilor sau bug-urilor</li>
            </ul>
            <p className="mt-4">
              Nu suntem responsabili pentru utilizarea necorespunzătoare a informațiilor furnizate. Utilizați informațiile doar în scopuri legale și etice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Suspendarea și Încetarea</h2>
            <p>
              Ne rezervăm dreptul de a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Suspenda sau închide conturi care încalcă termenii</li>
              <li>Modifica sau întrerupe serviciile cu notificare prealabilă</li>
              <li>Refuza accesul oricărei persoane din orice motiv</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Modificări ale Termenilor</h2>
            <p>
              Ne rezervăm dreptul de a modifica acești termeni. Modificările importante vor fi comunicate 
              prin email și pe platformă. Utilizarea continuă a serviciului după modificări constituie 
              acceptarea noilor termeni.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Legea Aplicabilă</h2>
            <p>
              Acești termeni sunt guvernați de legile din România. Orice litigiu va fi soluționat de 
              instanțele competente din București.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact</h2>
            <p>
              Pentru întrebări despre acești termeni, contactează-ne la:{" "}
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

export default Terms;
