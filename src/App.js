import React from "react";
import { Route, Switch } from "react-router-dom";
import { SearchParametersProvider } from "./store/SearchParametersContext";

import MainPage from "./pages/MainPage";
import SynonymsPage from "./pages/SynonymsPage";
import IndexPage from "./pages/IndexPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <SearchParametersProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route path="/synonyms">
            <SynonymsPage />
          </Route>
          <Route path="/indexes">
            <IndexPage />
          </Route>
        </Switch>
      </SearchParametersProvider>
    </>
  );
}

export default App;
