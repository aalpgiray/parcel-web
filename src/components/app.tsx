import { hot } from "react-hot-loader";
const hotModule = hot(module);

import React, { useState } from "react";
import { Router } from "react-router-dom";
import history from "../configuration/history";
import { IntlProvider } from "react-intl";
import { languages } from "../helpers/locale/i18n";
import { useStore } from "../store";
import { Vector3 } from "babylonjs";
import Todos from "./todos/todos";

const App = () => {
  const locale = useStore((state) => state.locale.selectedLanguage);
  const [] = useState<Vector3>(
    new Vector3(2.9919602193198074, 6.171492757246064, 11.75068035621533),
  );

  return (
    <Router history={history}>
      <IntlProvider messages={languages[locale]} locale={locale}>
        <Todos />
      </IntlProvider>
    </Router>
  );
};

export default hotModule(App);
