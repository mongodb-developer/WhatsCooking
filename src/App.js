import React from "react";
import { Route, Switch } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SynonymsPage from "./pages/SynonymsPage";
import ScoringPage from "./pages/ScoringPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact={true}>
          <MainPage />
        </Route>
        <Route path="/synonyms">
          <SynonymsPage />
        </Route>
        <Route path="/scoring">
          <ScoringPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
