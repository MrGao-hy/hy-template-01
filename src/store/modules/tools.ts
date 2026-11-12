import type { ThemeModeType } from '@hy-app/ui';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToolsStore = defineStore(
  'hy-tools',
  () => {
    const darkMode = ref<ThemeModeType>('light');
    const themeColor = ref('#3D7EFF');

    return {
      darkMode,
      themeColor,
    };
  },
  { persist: true }
);
