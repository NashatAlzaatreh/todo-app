import React from "react";
import { When } from "react-if";
import { LoginContext } from "../../context/loginContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.scss";

export default class Login extends React.Component {
  static contextType = LoginContext;
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.loginFunction(this.state.username, this.state.password);
  };

  render() {
    return (
      <div>
        <When condition={!this.context.loggedIn}>
          <form id="signForm" onSubmit={this.handleSubmit}>
            <label>Username</label>
            <input
              placeholder="username"
              type="text"
              name="username"
              onChange={this.handleChange}
            />
            <br />
            <label>Password</label>
            <input
              placeholder="password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button type="submit">login</button>
          </form>
        </When>
      </div>
    );
  }
}
