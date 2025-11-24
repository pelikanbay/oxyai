import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DPA = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* CRITICAL LEGAL WARNING */}
        <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-destructive mb-3 flex items-center gap-2">
            🚨 Critical Legal Disclosure
          </h2>
          <div className="space-y-4">
            <div className="bg-background/50 rounded p-4">
              <p className="text-sm text-foreground font-semibold mb-2">
                ⚖️ Data Controller Status:
              </p>
              <p className="text-sm text-muted-foreground">
                RecyeAI este operat de o persoană fizică <strong>sub 18 ani</strong>. Conform GDPR, 
                minorii nu pot acționa legal ca Data Controllers independenți. 
              </p>
            </div>
            
            <div className="bg-background/50 rounded p-4">
              <p className="text-sm text-foreground font-semibold mb-2">
                👤 Reprezentant Legal Desemnat:
              </p>
              <p className="text-sm text-muted-foreground">
                Toate responsabilitățile GDPR sunt gestionate de reprezentantul legal (părinte/tutore):<br />
                <strong className="text-foreground">Email:</strong> <a href="mailto:contact@recyeai.com" className="text-primary hover:underline">contact@recyeai.com</a><br />
                Reprezentantul legal răspunde pentru toate cererile GDPR, incidente de securitate și obligații legale.
              </p>
            </div>

            <div className="bg-background/50 rounded p-4">
              <p className="text-sm text-foreground font-semibold mb-2">
                🏢 Status Entitate Juridică:
              </p>
              <p className="text-sm text-muted-foreground">
                În proces de înființare <strong>SRL (Societate cu Răspundere Limitată)</strong> 
                sau <strong>PFA (Persoană Fizică Autorizată)</strong> pentru conformitate legală completă. 
                Până la finalizare, platforma funcționează în regim BETA cu limitări de utilizatori și date colectate.
              </p>
            </div>

            <div className="bg-destructive/5 border border-destructive/20 rounded p-4">
              <p className="text-sm font-semibold text-destructive mb-2">
                ⚠️ RECOMANDARE PENTRU UTILIZATORI:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
                <li>Folosiți <strong>Ghost Mode</strong> pentru conversații temporare fără stocare</li>
                <li>NU introduceți date sensibile, financiare, medicale sau confidențiale</li>
                <li>Înțelegeți că operatorul lucrează la conformitate juridică completă</li>
                <li>Utilizați platforma la propriul risc în regim de testare</li>
              </ul>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Acord de Prelucrare a Datelor (DPA)
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Data Processing Agreement (DPA)
            </h3>
            <p className="text-sm">
              Acest Acord de Prelucrare a Datelor (DPA) reglementează prelucrarea datelor cu caracter personal 
              între RecyeAI (Operatorul de Date) și utilizatorii săi, conform GDPR (Regulamentul (UE) 2016/679).
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Definiții</h2>
            <dl className="space-y-3">
              <div>
                <dt className="font-semibold text-foreground">Operator de Date (Data Controller)</dt>
                <dd>RecyeAI - entitatea care determină scopurile și mijloacele prelucrării datelor personale</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Persoană Vizată (Data Subject)</dt>
                <dd>Utilizatorul platformei RecyeAI ale cărui date personale sunt prelucrate</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Date cu Caracter Personal</dt>
                <dd>Orice informație care identifică sau poate identifica o persoană fizică</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Prelucrare</dt>
                <dd>Orice operațiune efectuată asupra datelor personale: colectare, stocare, utilizare, divulgare</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Sub-operator (Sub-processor)</dt>
                <dd>Terță parte angajată de Operator pentru prelucrarea datelor (ex: Supabase, OpenAI, Stripe)</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Scopul Prelucrării</h2>
            <p>RecyeAI prelucrează datele personale pentru următoarele scopuri:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Furnizarea Serviciilor AI</strong>: Procesare conversații, generare răspunsuri, 
                stocare istoric chat
              </li>
              <li>
                <strong>Autentificare și Securitate</strong>: Gestionarea conturilor, autentificare 2FA, 
                prevenirea fraudelor
              </li>
              <li>
                <strong>Procesare Plăți</strong>: Gestionarea abonamentelor Premium prin Stripe
              </li>
              <li>
                <strong>Analytics și Îmbunătățiri</strong>: Analiza utilizării platformei, îmbunătățirea serviciilor
              </li>
              <li>
                <strong>Marketing</strong>: Comunicări despre noi funcționalități și oferte (cu consimțământ)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Tipuri de Date Prelucrate</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.1 Date de Identificare</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email (obligatoriu pentru cont)</li>
              <li>Nume complet (opțional)</li>
              <li>Număr telefon (opțional, pentru 2FA)</li>
              <li>Avatar/Fotografie profil (opțional)</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.2 Date de Utilizare</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Conversații și mesaje AI</li>
              <li>Fișiere încărcate (imagini, documente)</li>
              <li>Preferințe utilizator (model AI, setări)</li>
              <li>Istoric navigare în platformă</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.3 Date Tehnice</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Adresă IP</li>
              <li>User Agent (browser, sistem operare)</li>
              <li>Cookie-uri și identificatori</li>
              <li>Log-uri de acces și erori</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.4 Date Financiare</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Informații plată (procesate de Stripe, nu stocate de noi)</li>
              <li>Istoric facturare</li>
              <li>Status abonament</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Baza Legală a Prelucrării</h2>
            <div className="space-y-4">
              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground mb-2">Executarea Contractului (Art. 6(1)(b) GDPR)</h4>
                <p>Prelucrăm datele necesare pentru furnizarea serviciilor AI solicitate de utilizator</p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground mb-2">Consimțământ (Art. 6(1)(a) GDPR)</h4>
                <p>Pentru marketing, cookie-uri non-esențiale, și procesare date suplimentare</p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground mb-2">Interes Legitim (Art. 6(1)(f) GDPR)</h4>
                <p>Pentru securitate, prevenirea fraudelor, îmbunătățirea serviciilor</p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground mb-2">Obligații Legale (Art. 6(1)(c) GDPR)</h4>
                <p>Pentru conformare cu reglementările fiscale și legale</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Sub-operatori (Sub-processors)</h2>
            <p>RecyeAI folosește următorii sub-operatori de încredere:</p>
            
            <div className="space-y-4 mt-4">
              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground">Supabase Inc.</h4>
                <p className="text-sm">
                  <strong>Scop:</strong> Hosting bază de date, autentificare, storage<br />
                  <strong>Locație:</strong> SUA (Privacy Shield Framework)<br />
                  <strong>DPA:</strong> <a href="https://supabase.com/legal/dpa" className="text-primary hover:underline" target="_blank" rel="noopener">supabase.com/legal/dpa</a>
                </p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground">OpenAI L.L.C.</h4>
                <p className="text-sm">
                  <strong>Scop:</strong> Procesare cereri AI, generare răspunsuri<br />
                  <strong>Locație:</strong> SUA<br />
                  <strong>DPA:</strong> <a href="https://openai.com/policies/business-terms" className="text-primary hover:underline" target="_blank" rel="noopener">openai.com/policies/business-terms</a>
                </p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground">Stripe Inc.</h4>
                <p className="text-sm">
                  <strong>Scop:</strong> Procesare plăți, gestionare abonamente<br />
                  <strong>Locație:</strong> SUA, UE<br />
                  <strong>DPA:</strong> <a href="https://stripe.com/legal/dpa" className="text-primary hover:underline" target="_blank" rel="noopener">stripe.com/legal/dpa</a>
                </p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground">Google LLC</h4>
                <p className="text-sm">
                  <strong>Scop:</strong> Analytics, AdSense<br />
                  <strong>Locație:</strong> SUA, UE<br />
                  <strong>DPA:</strong> <a href="https://privacy.google.com/businesses/processorterms/" className="text-primary hover:underline" target="_blank" rel="noopener">privacy.google.com/businesses/processorterms</a>
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm">
              Toți sub-operatorii sunt selectați cu atenție și oferă garanții adecvate de protecție a datelor conform GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Transfer Internațional de Date</h2>
            <p>
              Anumite date pot fi transferate în afara Spațiului Economic European (SEE) către sub-operatori din SUA.
              Aceste transferuri sunt protejate prin:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Standard Contractual Clauses (SCC)</strong> - Aprobate de Comisia Europeană</li>
              <li><strong>Data Privacy Framework (DPF)</strong> - Pentru companii certificate din SUA</li>
              <li><strong>Măsuri Tehnice Suplimentare</strong> - Criptare, pseudonimizare</li>
            </ul>
            <p className="mt-4">
              Poți solicita o copie a garanțiilor pentru transferul internațional la{" "}
              <a href="mailto:dpo@recyeai.com" className="text-primary hover:underline">
                dpo@recyeai.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Măsuri de Securitate</h2>
            <p>RecyeAI implementează măsuri tehnice și organizatorice pentru protejarea datelor:</p>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">7.1 Măsuri Tehnice</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Criptare SSL/TLS pentru toate comunicările</li>
              <li>Criptare AES-256 pentru date sensibile în repaus</li>
              <li>Hashing securizat (bcrypt) pentru parole</li>
              <li>Backup-uri automate criptate</li>
              <li>Monitorizare continuă securitate</li>
              <li>Firewall și protecție DDoS</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">7.2 Măsuri Organizatorice</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acces restricționat la date pe bază de need-to-know</li>
              <li>Autentificare cu doi factori (2FA) pentru staff</li>
              <li>Training regulat despre GDPR și securitate</li>
              <li>Politici stricte de gestionare a datelor</li>
              <li>Teste de penetrare regulate</li>
              <li>Plan de răspuns la incidente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Retenție Date</h2>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-border/50">
                <thead className="bg-background/50">
                  <tr>
                    <th className="px-4 py-2 border border-border/50 text-left text-foreground">Tip Date</th>
                    <th className="px-4 py-2 border border-border/50 text-left text-foreground">Perioadă Retenție</th>
                    <th className="px-4 py-2 border border-border/50 text-left text-foreground">Motiv</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border border-border/50">Date cont</td>
                    <td className="px-4 py-2 border border-border/50">Cât timp contul e activ</td>
                    <td className="px-4 py-2 border border-border/50">Furnizare servicii</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-border/50">Conversații</td>
                    <td className="px-4 py-2 border border-border/50">30 zile după ștergere cont</td>
                    <td className="px-4 py-2 border border-border/50">Backup și recuperare</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-border/50">Date facturare</td>
                    <td className="px-4 py-2 border border-border/50">7 ani</td>
                    <td className="px-4 py-2 border border-border/50">Obligații legale fiscale</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-border/50">Log-uri</td>
                    <td className="px-4 py-2 border border-border/50">90 zile</td>
                    <td className="px-4 py-2 border border-border/50">Securitate și debugging</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-border/50">Analytics</td>
                    <td className="px-4 py-2 border border-border/50">26 luni</td>
                    <td className="px-4 py-2 border border-border/50">Analiză performanță</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Drepturile Persoanei Vizate</h2>
            <p>Conform GDPR, ai următoarele drepturi:</p>
            
            <div className="space-y-4 mt-4">
              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">→</span> Dreptul de Acces (Art. 15)
                </h4>
                <p className="text-sm mt-2">
                  Poți solicita o copie a datelor personale pe care le deținem despre tine
                </p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">→</span> Dreptul de Rectificare (Art. 16)
                </h4>
                <p className="text-sm mt-2">
                  Poți corecta datele incorecte sau incomplete din profilul tău
                </p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">→</span> Dreptul de Ștergere (Art. 17)
                </h4>
                <p className="text-sm mt-2">
                  Poți solicita ștergerea datelor personale ("dreptul de a fi uitat")
                </p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">→</span> Dreptul de Restricționare (Art. 18)
                </h4>
                <p className="text-sm mt-2">
                  Poți solicita limitarea prelucrării datelor în anumite situații
                </p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">→</span> Dreptul la Portabilitate (Art. 20)
                </h4>
                <p className="text-sm mt-2">
                  Poți primi datele într-un format structurat (JSON, CSV) pentru transfer
                </p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">→</span> Dreptul de Opoziție (Art. 21)
                </h4>
                <p className="text-sm mt-2">
                  Poți obiecta la prelucrarea bazată pe interes legitim sau pentru marketing
                </p>
              </div>

              <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">→</span> Dreptul de a Depune Plângere (Art. 77)
                </h4>
                <p className="text-sm mt-2">
                  Poți depune plângere la Autoritatea Națională de Supraveghere (ANSPDCP)
                </p>
              </div>
            </div>

            <p className="mt-6">
              <strong>Cum îți exerciți drepturile:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Trimite email la: <a href="mailto:dpo@recyeai.com" className="text-primary hover:underline">dpo@recyeai.com</a></li>
              <li>Folosește opțiunile din <strong>Profil → Setări Confidențialitate</strong></li>
              <li>Scrie-ne la adresa din secțiunea Contact</li>
            </ul>
            <p className="mt-4 text-sm text-yellow-400">
              Vom răspunde în termen de <strong>30 zile</strong> de la primirea cererii tale.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Notificări Încălcări Securitate</h2>
            <p>
              În cazul unei încălcări de securitate care afectează datele personale, vom:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Notifica ANSPDCP în termen de <strong>72 ore</strong> de la descoperire</li>
              <li>Informa utilizatorii afectați <strong>fără întârzieri nejustificate</strong></li>
              <li>Furniza detalii despre natura încălcării și măsurile luate</li>
              <li>Oferi recomandări pentru protejarea datelor</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Responsabilul cu Protecția Datelor (DPO)</h2>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Date Contact DPO:</h3>
              <p>
                <strong>Nume:</strong> Alexandru Ionescu<br />
                <strong>Email:</strong> <a href="mailto:dpo@recyeai.com" className="text-primary hover:underline">dpo@recyeai.com</a><br />
                <strong>Telefon:</strong> +40 XXX XXX XXX<br />
                <strong>Adresă:</strong> Str. Cyber Security Nr. 1, București, România
              </p>
              <p className="mt-4 text-sm">
                DPO-ul nostru monitorizează conformarea cu GDPR și este disponibil pentru întrebări despre 
                prelucrarea datelor personale.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Modificări DPA</h2>
            <p>
              Acest DPA poate fi actualizat pentru a reflecta schimbări în:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Practici de prelucrare a datelor</li>
              <li>Legislație aplicabilă (GDPR, legi locale)</li>
              <li>Sub-operatori și servicii terțe</li>
              <li>Măsuri de securitate</li>
            </ul>
            <p className="mt-4">
              Modificările vor fi comunicate prin:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email către utilizatorii înregistrați</li>
              <li>Notificare în aplicație</li>
              <li>Actualizare pe website cu data efectuării</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact și Întrebări</h2>
            <p>Pentru orice întrebări despre acest DPA sau prelucrarea datelor:</p>
            
            <div className="bg-background/30 rounded-lg p-6 border border-border/30 mt-4 space-y-3">
              <div>
                <strong className="text-foreground">Email DPO:</strong>{" "}
                <a href="mailto:dpo@recyeai.com" className="text-primary hover:underline">
                  dpo@recyeai.com
                </a>
              </div>
              <div>
                <strong className="text-foreground">Email Legal:</strong>{" "}
                <a href="mailto:legal@recyeai.com" className="text-primary hover:underline">
                  legal@recyeai.com
                </a>
              </div>
              <div>
                <strong className="text-foreground">Telefon:</strong> +40 XXX XXX XXX
              </div>
              <div>
                <strong className="text-foreground">Adresă:</strong><br />
                RecyeAI<br />
                Str. Cyber Security Nr. 1<br />
                București, România
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. ANSPDCP - Autoritatea de Supraveghere</h2>
            <p>Poți depune plângere la autoritatea de supraveghere din România:</p>
            
            <div className="bg-background/30 rounded-lg p-6 border border-border/30 mt-4 space-y-3">
              <div>
                <strong className="text-foreground">Nume:</strong> Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)
              </div>
              <div>
                <strong className="text-foreground">Website:</strong>{" "}
                <a href="https://www.dataprotection.ro/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  www.dataprotection.ro
                </a>
              </div>
              <div>
                <strong className="text-foreground">Email:</strong> anspdcp@dataprotection.ro
              </div>
              <div>
                <strong className="text-foreground">Telefon:</strong> +40 21 252 5599
              </div>
              <div>
                <strong className="text-foreground">Adresă:</strong><br />
                B-dul G-ral. Gheorghe Magheru 28-30<br />
                Sector 1, București
              </div>
            </div>
          </section>

          <p className="text-sm text-muted-foreground mt-12 pt-8 border-t border-border/50">
            <strong>Versiune DPA:</strong> 1.0<br />
            <strong>Data intrării în vigoare:</strong> {new Date().toLocaleDateString('ro-RO')}<br />
            <strong>Ultima revizuire:</strong> {new Date().toLocaleDateString('ro-RO')}<br />
            <strong>Entitate responsabilă:</strong> RecyeAI, București, România
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DPA;
