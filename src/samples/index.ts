export default function generateIndex(): string {
  return `import Vue from 'vue';
import VueI18n from 'vue-i18n';

import dateTimeFormats from '@/localization/dateTimeFormats';
import en from '@/localization/languages/en';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
  },
  dateTimeFormats,
});

export default i18n;
`
}
