import "./index.less";

import { StoreProvider } from "easy-peasy";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { notification } from "antd";
import { store } from "./store";

import { Provider } from "react-redux";
notification.config({
  placement: "bottomRight",
});

ReactDOM.render(
  <StoreProvider store={store}>
    <Provider store={store}>
      <App />
    </Provider>
  </StoreProvider>,
  document.getElementById("root"),
);
