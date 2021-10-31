import React from "react";
import { Route, Switch } from "react-router-dom";
import { SearchParametersProvider } from "./store/SearchParametersContext";

import MainPage from "./pages/MainPage";
import SynonymsPage from "./pages/SynonymsPage";
import ScoringPage from "./pages/ScoringPage";
import Navbar from "./components/Navbar";

function App() {
  // const [showAggregation, setShowAggregation] = useState(false); // TO SHOW MODAL FOR AGGREGATION CODE

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
          <Route path="/scoring">
            <ScoringPage />
          </Route>
        </Switch>
      </SearchParametersProvider>
    </>
  );
}

export default App;
