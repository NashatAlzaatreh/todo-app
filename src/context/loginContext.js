import React, { useState, useEffect } from "react";
import superagent from "superagent";
import base64 from "base-64";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";
export const LoginContext = React.createContext();

export default function LoginProvider(props) {
  const API = "https://houses--safe.herokuapp.com";
  const [loggedIn, setLoggedIn] = useState(false);
  //   const [user, setUser] = useState({});
  const [user, setUser] = useState({ email: "", capabilities: [] });

  user.capabilities = ["read", "create", "update", "delete"];
  //   user.capabilities = ["read", "create"];

  // it will update the LoggedIn flag into true
  const loginFunction = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set(
          "authorization",
          `Basic ${base64.encode(`${username}:${password}`)}`
        );
      console.log("response.body >>>", response.body);
      validateMyToken(response.body.token);
    } catch (err) {
      console.log(err);
    }
  };

  // it will update the LoggedIn flag into false
  const logoutFunction = () => {
    setLoggedIn(false);
    setUser({});
    cookie.remove("token");
  };

  const validateMyToken = (token) => {
    if (token) {
      const user = jwt.decode(token);
      console.log("user >>>", user);
      setLoggedIn(true);
      setUser(user);
      cookie.save("token", token);
    } else {
      setLoggedIn(false);
      setUser({});
    }
  };

  useEffect(() => {
    // check the token
    const myTokenCookie = cookie.load("token");
    validateMyToken(myTokenCookie);
  }, []);

  const can = (capability) => {
    // chaining
    //optional chaining
    return user?.capabilities?.includes(capability);
  };
  const state = {
    loggedIn: loggedIn,
    user: user,
    loginFunction: loginFunction,
    logoutFunction: logoutFunction,
    can: can,
  };
  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
