import { languages } from "./i18n";

function determineBestLocaleForUser() {
  let selectedLanguage = localStorage.getItem("locale");
  if (!selectedLanguage && navigator.languages) {
    selectedLanguage = navigator.languages.filter((nl) => languages[nl])[0];
  }
  if (!selectedLanguage) {
    selectedLanguage = languages[navigator.language]
      ? navigator.language
      : null;
  }
  if (!selectedLanguage) {
    selectedLanguage = "en-US";
  }
  return selectedLanguage;
}

export default determineBestLocaleForUser;
