import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9ef7048a05e84b3ab2bf8e2dbfaa2fd8',
  appName: 'OxyAI',
  webDir: 'dist',
  server: {
    url: 'https://9ef7048a-05e8-4b3a-b2bf-8e2dbfaa2fd8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0F172A',
      showSpinner: false,
    },
  },
};

export default config;
