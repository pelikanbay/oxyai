# Voice Mode - RecyeAI

## Descriere
Voice Mode permite utilizatorilor să interacționeze cu RecyeAI folosind vocea lor. Funcționalitatea include:
- **Speech-to-Text**: Recunoaștere vocală pentru input utilizator (Web Speech API)
- **Text-to-Speech**: Citirea răspunsurilor AI cu voce sintetizată
- **Toggle On/Off**: Control complet asupra activării/dezactivării

## Funcționalități

### 1. Recunoaștere Vocală (Speech-to-Text)
- **Browser Support**: Chrome, Edge, Safari (necesită Web Speech API)
- **Limbă**: Română (ro-RO)
- **Auto-Send**: După ce vorbești, textul este trimis automat către AI
- **Continuous Mode**: Ascultă continuu până când dezactivezi Voice Mode

### 2. Text-to-Speech
- **Voce Sintetizată**: Folosește Web Speech Synthesis API
- **Auto-Play**: Răspunsurile AI sunt citite automat când Voice Mode este activ
- **Parametri**:
  - Rate: 1.0 (viteză normală)
  - Pitch: 1.0 (ton normal)
  - Volume: 1.0 (volum maxim)
  - Lang: ro-RO (română)

### 3. Indicatori Vizuali
- **Listening**: Iconiță microfon animată (puls cyan)
- **Speaking**: Iconiță volum animată (puls purple)
- **Disabled**: Iconiță microfon tăiat (gri)
- **Floating Indicator**: Card în dreapta sus care arată starea curentă

## Cum Funcționează

### Activare Voice Mode
1. Click pe butonul cu iconița de microfon în chat
2. Browser-ul va cere permisiune pentru microfon (prima dată)
3. Acceptă permisiunea
4. Voice Mode este acum activ (butonul devine colorat)

### Utilizare
1. **Vorbește**: Când Voice Mode este activ, vorbește clar în microfon
2. **Auto-Send**: După ce termini de vorbit, textul este transcris și trimis automat
3. **AI Răspunde**: AI procesează cererea și generează răspuns
4. **Text-to-Speech**: Răspunsul este citit cu voce tare automat

### Dezactivare
- Click din nou pe butonul de microfon
- Voice Mode se dezactivează instant

## States & Behavior

### isListening (Ascult)
- Microfon activ, ascultă vocea utilizatorului
- Indicator: Microfon cu puls cyan
- Textarea dezactivat pentru input manual
- Send button dezactivat

### isSpeaking (Vorbesc)
- AI citește răspunsul cu voce
- Indicator: Volum cu puls purple
- Ascultarea este pausată până termină de vorbit
- După ce termină, reîncep ascultarea automat

### isVoiceModeEnabled (Voice Mode Activ)
- State global pentru Voice Mode
- Când activ: ciclu continuu de listen → speak → listen
- Când inactiv: totul oprit

## Compatibilitate Browser

### ✅ Suportat Complet
- **Chrome** 25+ (Desktop & Android)
- **Edge** 79+
- **Safari** 14.1+ (macOS & iOS)
- **Opera** 27+

### ⚠️ Limitat
- **Firefox**: Nu suportă Web Speech API nativ
- **Safari iOS < 14.1**: Funcționalitate limitată

### ❌ Nu Funcționează
- Browser-e foarte vechi
- Browsere fără suport Web Speech API

## Cerințe Tehnice

### Permisiuni
- **Microfon**: Obligatoriu pentru speech-to-text
- **HTTPS**: Necesară pentru accesul la microfon (sau localhost)

### Hardware
- Microfon funcțional
- Difuzoare/căști pentru text-to-speech

## Troubleshooting

### "Permisiune necesară - Te rugăm să permiți accesul la microfon"
- Browser-ul a blocat accesul la microfon
- Soluție: Click pe iconița de lăcățel din address bar → Permite microfon

### "Nu este suportat - Speech Recognition nu este suportat"
- Browser-ul nu suportă Web Speech API
- Soluție: Folosește Chrome, Edge sau Safari

### Voice Mode nu ascultă continuu
- Verifică dacă Voice Mode este activat (buton colorat)
- Verifică console pentru erori
- Reîmprospătează pagina

### Text-to-Speech nu funcționează
- Verifică volumul device-ului
- Verifică dacă browser-ul suportă Speech Synthesis
- Reîmprospătează pagina

## Limitări

1. **Limbi**: Momentan doar română (ro-RO)
2. **Zgomot de Fundal**: Poate afecta acuratețea recunoașterii
3. **Acuratețea**: Depinde de claritatea vocii și calitatea microfonului
4. **Browser Support**: Nu toate browser-ele suportă Web Speech API
5. **Offline**: Nu funcționează offline (necesită conexiune la internet)

## Planuri Viitoare

- [ ] Suport multi-limbă (EN, FR, DE, etc.)
- [ ] Ajustare parametri TTS (viteză, ton)
- [ ] Selectare voce preferată
- [ ] Wake word detection ("Hey RecyeAI")
- [ ] Îmbunătățire handling zgomot de fundal
- [ ] Voice commands ("stop", "pause", "repeat")
- [ ] Historicul comenzilor vocale

## Cod Sursă

### Hook Principal
- `src/hooks/useVoiceMode.tsx` - Logic pentru Voice Mode

### Componente
- `src/components/Hero.tsx` - Integrare în chat
- `src/components/VoiceIndicator.tsx` - Indicator vizual

### APIs Folosite
- **Web Speech API** (SpeechRecognition)
- **Web Speech Synthesis API** (SpeechSynthesis)
