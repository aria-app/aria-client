import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import resources from "./resources";

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    keySeparator: false,
    lng: "en",
    resources,
  });

export default i18n;
