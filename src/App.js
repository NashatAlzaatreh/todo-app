import React, { useContext } from "react";
import LoginContext from "./context/loginContext";

import List from "./context/List";
import LoginProvider from "./context/loginContext";
import ToDo from "./components/todo/Todo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Setting from "./components/setting/Setting";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Auth from "./components/login/Auth";

export default function App() {
  return (
    <LoginProvider>
      <Router>
        <List>
          <Header />
          <Login />
          <Switch>
            <Route exact path="/">
              <ToDo />
            </Route>
            <Route exact path="/setting">
              <Setting />
            </Route>
          </Switch>
        </List>
      </Router>
    </LoginProvider>
  );
}

{
  /* <Auth capability="read">
    <div>
      <h2>List of items</h2>
      <ul>
        <li>item1</li>
        <li>item2</li>
        <li>item3</li>
        <li>item4</li>
      </ul>
    </div>
  </Auth>
  <Auth capability="create">
    <button>create</button>
  </Auth>
  <Auth capability="update">
    <button>update</button>
  </Auth>
  <Auth capability="delete">
    <button>delete</button>
  </Auth> */
}
