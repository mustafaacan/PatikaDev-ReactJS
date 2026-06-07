import { useEffect, useState } from "react";
import "./App.css";
import { IntlProvider, FormattedMessage } from "react-intl";

function App() {
  const messages = {
    tr: {
      title: "Ilk Ceviri",
      desc: "Bu bir deneme çalışmasıdır",
      selection: "{lan} is selected",
    },
    en: {
      title: "First Translation",
      desc: "this is for a trial work",
      selection: "{lan} is selected",
    },
  };

  // Default Browser Language
  const defaultLang = navigator.language;

  // Checking the lang option from locale storage
  const langFromStorage = () => {
    return localStorage.getItem("LANG") ? localStorage.getItem("LANG") : "tr";
  };

  const [lang, setLang] = useState(langFromStorage());

  // Normally, we can handle this operation within handleLang function. However, if any new feature could be added to
  // manage the lang variable without using handleLang can cause a structural error. The clear way is using useEffect
  useEffect(() => {
    localStorage.setItem("LANG", lang);
  }, [lang]);

  const handleLang = (e) => {
    e.preventDefault();
    setLang(e.target.value);
  };

  return (
    <IntlProvider
      messages={messages[lang]}
      locale={defaultLang}
      defaultLocale="en"
    >
      <p>
        {/* id should be the key from the needed object */}
        <FormattedMessage id="title" />
        <br />
        <FormattedMessage id="desc" />
        <br />
        <FormattedMessage id="selection" values={{ lan: lang.toUpperCase() }} />
        <br />
      </p>
      <button value="tr" onClick={handleLang}>
        TR
      </button>
      <button value="en" onClick={handleLang}>
        ENG
      </button>
    </IntlProvider>
  );
}

export default App;
