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
    id: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
    name: 'DeepSeek R1 Qwen3 8B',
    provider: 'DeepSeek',
    description: 'Fast reasoning model, optimizat pentru coding și analytical tasks',
    capabilities: ['Coding', 'Analysis', 'Reasoning', 'Pentesting'],
    contextWindow: '8K tokens',
    speed: 'fast',
    costPerRequest: 'FREE'
  },
  {
    id: 'qwen/qwen-2.5-7b-instruct:free',
    name: 'Qwen 2.5 7B Instruct',
    provider: 'Alibaba',
    description: 'Model versatil pentru general purpose tasks și coding',
    capabilities: ['General', 'Coding', 'Multilingual'],
    contextWindow: '32K tokens',
    speed: 'fast',
    costPerRequest: 'FREE'
  },
  {
    id: 'meta-llama/llama-3.2-3b-instruct:free',
    name: 'Llama 3.2 3B Instruct',
    provider: 'Meta',
    description: 'Compact model pentru conversații și task-uri simple',
    capabilities: ['Conversation', 'General', 'Fast'],
    contextWindow: '128K tokens',
    speed: 'fast',
    costPerRequest: 'FREE'
  },
  {
    id: 'microsoft/phi-3-mini-128k-instruct:free',
    name: 'Phi-3 Mini 128K',
    provider: 'Microsoft',
    description: 'Small language model cu context window mare',
    capabilities: ['Coding', 'Math', 'Reasoning'],
    contextWindow: '128K tokens',
    speed: 'fast',
    costPerRequest: 'FREE'
  },
  {
    id: 'mistralai/mistral-7b-instruct:free',
    name: 'Mistral 7B Instruct',
    provider: 'Mistral AI',
    description: 'Efficient model pentru conversații și general tasks',
    capabilities: ['General', 'Conversation', 'Coding'],
    contextWindow: '32K tokens',
    speed: 'medium',
    costPerRequest: 'FREE'
  },
  {
    id: 'google/gemma-2-9b-it:free',
    name: 'Gemma 2 9B IT',
    provider: 'Google',
    description: 'Open model de la Google pentru diverse task-uri',
    capabilities: ['General', 'Safety', 'Reasoning'],
    contextWindow: '8K tokens',
    speed: 'medium',
    costPerRequest: 'FREE'
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
