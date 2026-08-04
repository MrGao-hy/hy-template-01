import { createSSRApp } from 'vue';
import App from './App.vue';
import pinia from '@/store';
import { setupLocale } from '@/locale';

export function createApp() {
  const app = createSSRApp(App);

  app.use(pinia);
  setupLocale();
  return {
    app,
  };
}
