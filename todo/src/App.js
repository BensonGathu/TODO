import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import ItemsPage from "./pages/Items/ItemsPage";
import Modal from "react-modal";


import "semantic-ui-css/semantic.min.css";

import {
  Switch,
  Route,
  BrowserRouter,
  Routes,
  Redirect,
} from "react-router-dom";

function App() {
  
  return (
    <React.Fragment>
      <Header></Header>
     

      <Switch>
        <Route path="/" exact>
          <ItemsPage></ItemsPage>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
