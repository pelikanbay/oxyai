import { useState, useEffect } from 'react';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  capabilities: string[];
  contextWindow: string;
  speed: 'fast' | 'medium' | 'slow';
  costPerRequest: string;
}

export const FREE_MODELS: AIModel[] = [
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash ⚡',
    provider: 'Lovable AI',
    description: 'Rapid și puternic - recomandat (FĂRĂ rate limits)',
    capabilities: ['Multimodal', 'Vision', 'Fast', 'Pentesting'],
    contextWindow: '1M tokens',
    speed: 'fast',
    costPerRequest: 'Included'
  },
  {
    id: 'google/gemini-2.5-pro',
    name: 'Gemini 2.5 Pro 🧠',
    provider: 'Lovable AI',
    description: 'Cel mai puternic - reasoning complex (FĂRĂ rate limits)',
    capabilities: ['Advanced Reasoning', 'Multimodal', 'Vision', 'Pentesting'],
    contextWindow: '1M tokens',
    speed: 'fast',
    costPerRequest: 'Included'
  },
  {
    id: 'openai/gpt-5-mini',
    name: 'GPT-5 Mini',
    provider: 'Lovable AI',
    description: 'OpenAI - echilibrat performanță/viteză (FĂRĂ rate limits)',
    capabilities: ['Multimodal', 'Vision', 'Coding', 'Analysis'],
    contextWindow: '128K tokens',
    speed: 'fast',
    costPerRequest: 'Included'
  },
  {
    id: 'openai/gpt-5',
    name: 'GPT-5',
    provider: 'Lovable AI',
    description: 'OpenAI - cel mai avansat model (FĂRĂ rate limits)',
    capabilities: ['Advanced', 'Multimodal', 'Vision', 'Complex Tasks'],
    contextWindow: '128K tokens',
    speed: 'medium',
    costPerRequest: 'Premium'
  }
];

const MODEL_SETTINGS_KEY = 'recyeai_model_settings';

export interface ModelSettings {
  selectedModel: string;
  temperature: number;
}

const DEFAULT_SETTINGS: ModelSettings = {
  selectedModel: FREE_MODELS[0].id,
  temperature: 0.7,
};

export const useModelSettings = () => {
  const [settings, setSettings] = useState<ModelSettings>(() => {
    const stored = localStorage.getItem(MODEL_SETTINGS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem(MODEL_SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const setSelectedModel = (modelId: string) => {
    setSettings(prev => ({ ...prev, selectedModel: modelId }));
  };

  const setTemperature = (temp: number) => {
    setSettings(prev => ({ ...prev, temperature: temp }));
  };

  const getSelectedModelInfo = (): AIModel | undefined => {
    return FREE_MODELS.find(m => m.id === settings.selectedModel);
  };

  return {
    selectedModel: settings.selectedModel,
    temperature: settings.temperature,
    setSelectedModel,
    setTemperature,
    getSelectedModelInfo,
    availableModels: FREE_MODELS,
  };
};
