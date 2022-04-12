import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { WidgetLoadingStatus } from "../Widget/types/types";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    resources: {
      ru: {
        translation: {
          widget: {
            [WidgetLoadingStatus.FirstStep]: "Виджет крузится",
            [WidgetLoadingStatus.SecondStep]: "Виджет ещё грузится",
            [WidgetLoadingStatus.ThirdStep]:
              "Загрузка идёт дольше чем обычно. Пожалуйста, подождите",
            [WidgetLoadingStatus.ErrorLoading]:
              "Ошибка при загрузке. Пожалуйста обновите окно",
            [WidgetLoadingStatus.SuccessLoading]: "Виджет загружен!",
          },
        },
      },
      en: {
        translation: {
          widget: {
            [WidgetLoadingStatus.FirstStep]: "Widget is loading",
            [WidgetLoadingStatus.SecondStep]: "Widget is still loading",
            [WidgetLoadingStatus.ThirdStep]:
              "Loading takes longer than usual. Please wait",
            [WidgetLoadingStatus.ErrorLoading]:
              "Error while loading. Please refresh the page",
            [WidgetLoadingStatus.SuccessLoading]: "Widget is loaded!",
          },
        },
      },
    },
  });

export default i18n;
