import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Room from "./components/Room/CollabRoom";
import "@fontsource/poppins";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:roomId" component={Room} />
      </Switch>
    </Router>
  );
};

export default App;
