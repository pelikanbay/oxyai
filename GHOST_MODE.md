# Ghost Mode - RecyeAI

## Descriere
Ghost Mode este o funcționalitate de privacy care permite utilizatorilor să aibă conversații private care **nu se salvează în baza de date**. Toate conversațiile în Ghost Mode sunt temporare și există doar în memorie.

## Caracteristici Principale

### 🕵️ Privacy Complet
- **Zero salvare în DB**: Conversațiile nu sunt scrise în baza de date
- **Memorie temporară**: Mesajele există doar în RAM
- **Ștergere automată**: La închidere sau dezactivare, toate datele dispar

### 🎯 Cazuri de Utilizare
- Teste de penetration testing sensibile
- Discuții despre vulnerabilități nedivulgate
- Cercetare confidențială în cybersecurity
- Orice conversație care necesită privacy maximă

### 🔒 Securitate
- Datele nu ajung pe server (în DB)
- Nu există istoric persistent
- Nu există recovery - odată șters, dispare complet

## Cum Funcționează

### Activare Ghost Mode

**Desktop:**
1. După autentificare, vezi butonul cu iconița de ochi în header (lângă meniul user)
2. Click pe butonul cu ochi → Ghost Mode activ
3. Butonul devine colorat (gradient purple) cu animație puls
4. Apare indicator "Ghost Mode" cu badge animat

**Mobile:**
1. După autentificare, vezi butonul cu iconița de ochi în header
2. Tap pe butonul cu ochi → Ghost Mode activ
3. Visual: buton colorat + animație

### Indicator Vizual

Când Ghost Mode este activ:
- **Badge "Ghost Mode"** în header (gradient secondary + puls)
- **Icon EyeOff** (ochi tăiat) - sugerează că nu există "observare"/salvare
- **Animație continuă** - ping effect pe badge pentru awareness constant
- **Tooltip** - info clară despre ce face Ghost Mode

Când Ghost Mode este inactiv:
- **Icon Eye** simplu (gri)
- **Hover state** pentru awareness

### Comportament

#### Cu Ghost Mode ACTIV:
1. **Crearea conversației**:
   - Nu se creează în DB
   - Se folosește ID temporar: `ghost-{timestamp}`
   - ID-ul există doar în memory (React state)

2. **Trimiterea mesajelor**:
   - Mesajul user se adaugă doar în state
   - Nu se face INSERT în tabela `messages`
   - Se trimite la AI pentru procesare

3. **Primirea răspunsurilor**:
   - Răspunsul AI se afișează în chat
   - Se adaugă în state, nu în DB
   - Streaming funcționează normal

4. **Navigare între pagini**:
   - Conversația dispare dacă părăsești pagina
   - Nu există recovery - e temporar by design

#### Cu Ghost Mode INACTIV:
- Comportament normal: toate mesajele se salvează în DB
- Istoric persistent în ConversationHistory
- Recovery posibil dacă reîncarci pagina

### Dezactivare

**Metoda 1 - Manual:**
1. Click/tap pe butonul "Ghost Mode" din header
2. Conversația curentă dispare instant
3. Toast notification: "Ghost Mode dezactivat - Conversația temporară a fost ștearsă"

**Metoda 2 - Automată:**
- Refresh pagina → conversația ghost dispare
- Închizi tab-ul → conversația ghost dispare
- Logout → conversația ghost dispare

## Flow Tehnic

### Activare
```
User click → toggleGhostMode() → isGhostMode = true → localStorage.setItem('recyeai_ghost_mode', 'true')
```

### Conversație Nouă (Ghost)
```
handleGenerate() → 
  if (isGhostMode) {
    conversationId = 'ghost-' + Date.now()
    // Skip DB insert
  }
  → mesaje doar în state
```

### Dezactivare
```
User click → toggleGhostMode() → isGhostMode = false → 
  if (conversationId.startsWith('ghost-')) {
    clear messages
    clear conversationId
    toast("Ghost Mode dezactivat")
  }
```

### Unmount Cleanup
```
useEffect cleanup → 
  if (isGhostMode && conversationId.startsWith('ghost-')) {
    console.log('Ghost conversation cleared')
  }
```

## State Management

### localStorage
- **Key**: `recyeai_ghost_mode`
- **Value**: `"true"` sau `"false"`
- **Scop**: Persist preferința între sesiuni
- **IMPORTANT**: Doar preferința, NU conversațiile

### React State
```typescript
const [conversationId, setConversationId] = useState<string | null>(null);
const [messages, setMessages] = useState<Message[]>([]);
const { isGhostMode, toggleGhostMode } = useGhostMode();
```

### Conversation ID Format
- **Normal**: `uuid` from Supabase (ex: `123e4567-e89b-12d3-a456-426614174000`)
- **Ghost**: `ghost-{timestamp}` (ex: `ghost-1703248400000`)

## Limitări

### ⚠️ Nu Este Un Tor/VPN
- Ghost Mode **NU ascunde IP-ul**
- Ghost Mode **NU criptează traficul extra**
- Ghost Mode **NU te protejează de monitoring la nivel de rețea**

Ghost Mode doar **previne salvarea în baza de date RecyeAI**.

### ⚠️ Server-Side Logs
- Request-urile ajung tot pe server (edge functions)
- Logs pot exista în Supabase/Lovable Cloud
- Pentru privacy absolută, ai nevoie de self-hosted solution

### ⚠️ Recovery Imposibil
- Odată șters = șters definitiv
- Nu există "Undo" sau "Restore"
- Salvează manual informații importante înainte de a dezactiva

## Combinarea cu Voice Mode

Ghost Mode + Voice Mode = **Maximum Privacy**:
- Conversații vocale care nu se salvează
- Perfect pentru red teaming live exercises
- Testare vulnerabilități în timp real fără istoric

Ambele pot fi active simultan:
- Iconiță Ghost Mode în header
- Iconiță Voice Mode în chat input
- Indicator vocal floating când vorbești

## Comparație: Normal vs Ghost Mode

| Feature | Normal Mode | Ghost Mode |
|---------|-------------|------------|
| Salvare în DB | ✅ Da | ❌ Nu |
| Istoric persistent | ✅ Da | ❌ Nu |
| Recovery după refresh | ✅ Da | ❌ Nu |
| ConversationHistory | ✅ Apare | ❌ Nu apare |
| Export date | ✅ Posibil | ❌ Nu există date |
| Privacy | 🟡 Standard | 🟢 Maximum |
| Use case | Zi cu zi | Confidențial |

## Securitate & Best Practices

### ✅ Când să folosești Ghost Mode:
- Discuții despre 0-days
- Red team planning
- Vulnerability research
- Teste de penetration confidențiale
- Orice topic unde privacy este critică

### ❌ Când să NU folosești Ghost Mode:
- Learning & tutorials (vrei să salvezi)
- Documentare pentru rapoarte
- Conversații pe care vrei să revii
- Situații unde ai nevoie de audit trail

### 🔐 Combinații Recomandate:
1. **Ghost Mode + Voice Mode** - Conversații live fără urmă
2. **Ghost Mode + VPN** - Privacy la nivel de rețea + DB
3. **Ghost Mode + Tor** - Maximum anonymity (dacă ai acces)

## Troubleshooting

### "Ghost Mode nu salvează preferința între sesiuni"
- Verifică localStorage în DevTools
- Key: `recyeai_ghost_mode`
- Șterge cookies/storage și încearcă din nou

### "Conversația Ghost apare în istoric"
- Bug! Nu ar trebui să se întâmple
- Verifică: ID-ul începe cu "ghost-"?
- Verifică: ConversationHistory filtrează ghost conversations?

### "Ghost Mode se dezactivează singur"
- Normal behavior: la logout se resetează
- La refresh: preferința se păstrează, dar conversația dispare
- La schimbare tab: preferința rămâne

## Planuri Viitoare

- [ ] Export temporar (download) înainte de ștergere
- [ ] Timer automat pentru auto-clear după X minute
- [ ] Screenshot-proof mode (prevent screenshots)
- [ ] Encrypted local storage pentru conversații ghost
- [ ] Ghost Mode history in session storage (doar sesiune curentă)
- [ ] Warning visual când părăsești pagina în Ghost Mode

## Cod Sursă

### Hook
- `src/hooks/useGhostMode.tsx` - State management

### Componente
- `src/components/GhostModeIndicator.tsx` - Badge în header
- `src/components/Hero.tsx` - Logic de skip DB
- `src/components/Header.tsx` - Toggle button

### Integrare
- `src/pages/Index.tsx` - Props propagation
