import i18n from 'i18next';
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from 'react-i18next';
import resources from './resources';

i18n
	.use(detector)
	.use(reactI18nextModule)
	.init({
    fallbackLng: 'en',
		keySeparator: false,
		lng: 'en',
		resources,
	});

export default i18n;
