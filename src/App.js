import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SynonymsPage from "./pages/SynonymsPage";
import ScoringPage from "./pages/ScoringPage";
import Navbar from "./components/Navbar";

function App() {
  const [showAggregation, setShowAggregation] = useState(false); // TO SHOW MODAL FOR AGGREGATION CODE
  return (
    <>
      <Navbar
        setShowAggregation={setShowAggregation}
        showAggregation={showAggregation}
      />
      <Switch>
        <Route path="/" exact={true}>
          <MainPage
            setShowAggregation={setShowAggregation}
            showAggregation={showAggregation}
          />
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
