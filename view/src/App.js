import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./styles/styles.scss";
import "normalize.css";
import "typeface-raleway";
import "fontsource-ranchers";
import "typeface-dancing-script";

//primeReact css files
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

//internal imports
import AppRouter from "./routers/AppRouter";
import { configureStore } from "./store/configureStore";
import Loader from "./components/common/Loader";
import "./utils/interceptors";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const loadingJsx = <Loader />;

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("root"));
    hasRendered = true;
  }
};

ReactDOM.render(loadingJsx, document.getElementById("root"));

setTimeout(() => {
  renderApp();
}, 500);
