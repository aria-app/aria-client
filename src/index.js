import "firebase/auth";
import "firebase/firestore";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import app from "./features/app";
import shared from "./features/shared";
import store from "./store";
import "./resets.css";

const { AppContainer } = app.components;

store.dispatch(shared.actions.initialized());

render(
  <BrowserRouter
    basename={process.env.NODE_ENV === "production" ? "/zen-app" : undefined}
  >
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>,
  document.querySelector("#root")
);
