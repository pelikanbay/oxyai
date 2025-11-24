# Model Selection - RecyeAI

## Descriere
Model Selection permite utilizatorilor să aleagă modelul AI și să ajusteze parametrii pentru a controla comportamentul răspunsurilor. Toate modelele disponibile sunt **100% gratuite** prin OpenRouter.

## Modele Disponibile (FREE)

### 1. DeepSeek R1 Qwen3 8B ⚡ (DEFAULT)
- **Provider**: DeepSeek
- **Context**: 8K tokens
- **Speed**: Fast
- **Capabilities**: Coding, Analysis, Reasoning, Pentesting
- **Best For**: Analytical tasks, coding, penetration testing
- **Recomandat pentru**: Red teaming, vulnerability analysis

### 2. Qwen 2.5 7B Instruct ⚡
- **Provider**: Alibaba
- **Context**: 32K tokens
- **Speed**: Fast
- **Capabilities**: General, Coding, Multilingual
- **Best For**: General purpose tasks cu context mare
- **Recomandat pentru**: Documentation, long conversations

### 3. Llama 3.2 3B Instruct ⚡
- **Provider**: Meta
- **Context**: 128K tokens (!!)
- **Speed**: Fast
- **Capabilities**: Conversation, General, Fast
- **Best For**: Simple tasks cu context foarte mare
- **Recomandat pentru**: Long document analysis

### 4. Phi-3 Mini 128K ⚡
- **Provider**: Microsoft
- **Context**: 128K tokens
- **Speed**: Fast
- **Capabilities**: Coding, Math, Reasoning
- **Best For**: Technical problems, mathematics
- **Recomandat pentru**: Complex calculations, code review

### 5. Mistral 7B Instruct 🕐
- **Provider**: Mistral AI
- **Context**: 32K tokens
- **Speed**: Medium
- **Capabilities**: General, Conversation, Coding
- **Best For**: Balanced performance
- **Recomandat pentru**: General pentesting queries

### 6. Gemma 2 9B IT 🕐
- **Provider**: Google
- **Context**: 8K tokens
- **Speed**: Medium
- **Capabilities**: General, Safety, Reasoning
- **Best For**: Safety-focused tasks
- **Recomandat pentru**: Compliance questions, safe coding

## Parametri AI

### Temperatură (Temperature)
Control asupra creativității și randomness-ului răspunsurilor.

**Range**: 0.0 - 1.5

**Valori Recomandate:**
- **0.0 - 0.3**: Precis
  - Răspunsuri deterministice
  - Aceeași întrebare = același răspuns
  - Perfect pentru: code generation, exact answers
  
- **0.4 - 0.7**: Balansat (DEFAULT: 0.7)
  - Mix între precizie și creativitate
  - Variație moderată
  - Perfect pentru: conversații generale, explanations
  
- **0.8 - 1.0**: Creativ
  - Răspunsuri mai diverse
  - Mai mult "out of the box thinking"
  - Perfect pentru: brainstorming, ideation
  
- **1.1 - 1.5**: Foarte Creativ
  - Maximum randomness
  - Poate produce răspunsuri neașteptate
  - Perfect pentru: creative writing, unusual approaches

### Impact în Cybersecurity Context:

**Low Temperature (0.0-0.3)**: Pentesting Scripts
```
User: "Write a Nmap scan command for port scanning"
Response (temp=0.2): nmap -sS -p- -T4 192.168.1.1
(Mereu același răspuns, corect și precis)
```

**Medium Temperature (0.4-0.7)**: Explanations
```
User: "Explain SQL injection"
Response (temp=0.7): Varies slightly, includes different examples
(Diverse explicații, toate corecte)
```

**High Temperature (0.8-1.5)**: Attack Scenarios
```
User: "Suggest creative attack vectors"
Response (temp=1.2): Unusual, creative approaches
(Idei neconvenționale, poate miss some classics)
```

## Cum Să Alegi Modelul

### Pentru Pentesting & Red Teaming:
**DeepSeek R1 Qwen3 8B** (default) - Best all-rounder
- Rapid, bun la reasoning
- Perfect pentru analytical tasks

### Pentru Long Documents:
**Llama 3.2 3B** sau **Phi-3 Mini**
- 128K tokens context
- Analizează rapoarte mari de vulnerabilități

### Pentru Conversații Generale:
**Mistral 7B** sau **Qwen 2.5**
- Balanced performance
- Good pentru mixed tasks

### Pentru Compliance & Safety:
**Gemma 2 9B**
- Safety-focused
- Good pentru legal/compliance questions

## UI/UX

### Locație
- **Desktop**: Top bar în chat, sub header
- **Mobile**: Același, dar condensat

### Componente Vizuale

**Model Selector Button:**
- Iconiță Brain (🧠)
- Numele modelului curent (trunked pe mobile)
- Chevron down pentru dropdown

**Dropdown Menu:**
- Lista tuturor modelelor gratuite
- Pentru fiecare model:
  - Nume + Check mark (dacă selectat)
  - Speed icon (⚡ fast, 🕐 medium)
  - Description (1-2 lines)
  - Capability badges (max 3)
  - Context window badge
- Footer cu info despre rate limits

**Settings Button:**
- Iconiță Info (ℹ️)
- Toggle pentru a arăta/ascunde temperature slider

**Temperature Slider:**
- Range: 0.0 - 1.5
- Step: 0.1
- Label: "Creativitate"
- Badge cu nivel: Precis/Balansat/Creativ/Foarte Creativ
- Display numeric: 0.7

### State Management

**localStorage Keys:**
```typescript
{
  "recyeai_model_settings": {
    "selectedModel": "deepseek/deepseek-r1-0528-qwen3-8b:free",
    "temperature": 0.7
  }
}
```

**Persist:**
- Model selection persistă între sesiuni
- Temperature persistă între sesiuni
- Se aplică tuturor conversațiilor noi

**Per-conversation:**
- Settings sunt globale, nu per-conversație
- Dacă vrei behavior diferit, schimbă înainte de a trimite

## Rate Limits (FREE Models)

### OpenRouter Free Tier:
- **Requests Per Minute (RPM)**: ~20-60 (varies per model)
- **Tokens Per Day**: Limited but generous
- **No Cost**: 100% free

### Handling Rate Limits:

**429 Error (Rate Limited):**
```
Error: "Rate limit depășit. Te rog încearcă din nou în câteva momente."
```

**Solution:**
1. Așteaptă 60 secunde
2. Retry request
3. Consider spacing out requests

**Best Practices:**
- Nu trimite rapid multiple requests
- Folosește Ghost Mode pentru teste intensive
- Space out requests cu ~2-3 secunde între ele

## Combinații Recomandate

### Maximum Privacy + Performance:
- **Model**: DeepSeek R1 (fast)
- **Temperature**: 0.7 (balanced)
- **Ghost Mode**: ON
- **Voice Mode**: OFF

### Interactive Pentesting Session:
- **Model**: DeepSeek R1
- **Temperature**: 0.5 (precise)
- **Ghost Mode**: ON
- **Voice Mode**: ON

### Creative Attack Planning:
- **Model**: Mistral 7B
- **Temperature**: 1.0 (creative)
- **Ghost Mode**: ON
- **Voice Mode**: OFF

### Documentation Analysis:
- **Model**: Llama 3.2 3B (128K context)
- **Temperature**: 0.3 (precise)
- **Ghost Mode**: OFF (save for reference)
- **Voice Mode**: OFF

## Troubleshooting

### "Model nu răspunde / Timeout"
- Check OpenRouter status
- Try alt model din listă
- Check rate limits (429 error)

### "Răspunsuri inconsistente"
- Lower temperature pentru consistency
- DeepSeek R1 e cel mai consistent la temp<0.5

### "Context prea mic / Truncated responses"
- Switch to Llama 3.2 (128K) sau Phi-3 (128K)
- Break down întrebarea în părți mai mici

### "Model nu înțelege română"
- Toate modelele suportă română
- DeepSeek R1 și Qwen 2.5 sunt best la multilingual

## Comparație Modele

| Model | Speed | Context | Best For | Multilingual |
|-------|-------|---------|----------|--------------|
| DeepSeek R1 | ⚡⚡⚡ | 8K | Coding, Analysis | ✅ |
| Qwen 2.5 | ⚡⚡⚡ | 32K | General, Code | ✅✅ |
| Llama 3.2 | ⚡⚡⚡ | 128K | Long docs | ✅ |
| Phi-3 Mini | ⚡⚡⚡ | 128K | Math, Code | ✅ |
| Mistral 7B | ⚡⚡ | 32K | Balanced | ✅ |
| Gemma 2 | ⚡⚡ | 8K | Safety | ✅ |

**Legend:**
- ⚡⚡⚡ = Very Fast (<2s)
- ⚡⚡ = Fast (2-4s)
- ⚡ = Medium (4-6s)

## API Integration

### Edge Function (`chat/index.ts`):
```typescript
const { message, files, model, temperature } = await req.json();

const selectedModel = model || "deepseek/deepseek-r1-0528-qwen3-8b:free";
const selectedTemperature = temperature ?? 0.7;

const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: selectedModel,
    temperature: selectedTemperature,
    messages: [...],
    stream: true,
  }),
});
```

### Frontend (`Hero.tsx`):
```typescript
const { selectedModel, temperature } = useModelSettings();

const resp = await fetch(CHAT_URL, {
  body: JSON.stringify({ 
    message: input,
    files: filesData,
    model: selectedModel,
    temperature: temperature
  }),
});
```

## Planuri Viitoare

- [ ] Per-conversation model selection
- [ ] Model comparison mode (2 models side-by-side)
- [ ] Custom system prompts per model
- [ ] Token usage tracking și visualization
- [ ] Model performance benchmarks
- [ ] Auto-select best model based on query type
- [ ] Paid models support (GPT-5, Claude)
- [ ] Fine-tuned RecyeAI model (specialized)

## Cod Sursă

### Hook
- `src/hooks/useModelSettings.tsx` - State management + model definitions

### Componente
- `src/components/ModelSelector.tsx` - UI pentru selection + settings

### Edge Function
- `supabase/functions/chat/index.ts` - API integration

### Integrare
- `src/components/Hero.tsx` - Usage in chat
