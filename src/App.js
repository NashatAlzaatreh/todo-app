import React from "react";
import List from "./context/List";
import ToDo from "./components/todo/Todo";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import Setting from "./components/setting/Setting";
import Header from "./components/header/Header";

export default function App() {
  return (
    <List>
      <Router>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <ToDo />
            </Route>
            <Route exact path="/setting">
              <Setting />
            </Route>
          </Switch>
        </BrowserRouter>
      </Router>
    </List>
  );
}
