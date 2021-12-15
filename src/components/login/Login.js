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
      role: [],
      switcher: false,
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.loginFunction(this.state.username, this.state.password);
  };
  handleSubmitSignup = (e) => {
    e.preventDefault();
    this.context.signupFunction(
      this.state.username,
      this.state.password,
      this.state.role
    );
  };
  switchBtn = (e) => {
    const switcher = e ? true : false;
    this.setState({
      switcher: switcher,
    });
  };
  render() {
    return (
      <>
        {!this.context.loggedIn && (
          <div className="login-page">
            <div className="form">
              {this.state.switcher && (
                <form onSubmit={this.handleSubmitSignup} className="login-form">
                  <input
                    type="text"
                    onChange={this.handleChange}
                    name="username"
                    placeholder="username"
                  />
                  <input
                    type="password"
                    onChange={this.handleChange}
                    name="password"
                    placeholder="password"
                  />
                  <label for="role">Choose a role:</label>
                  <select
                    onClick={this.handleChange}
                    style={{ width: "10rem", marginBottom: "14px" }}
                    name="role"
                    id="role"
                  >
                    <option value="admin">Admin</option>
                    <option value="teamLeader">Team Leader</option>
                    <option value="agent">Agent</option>
                  </select>
                  <button>Signup</button>
                  <p className="message">
                    Already registered?{" "}
                    <a onClick={() => this.switchBtn(false)} href="#">
                      Sign In
                    </a>
                  </p>
                </form>
              )}
              {!this.state.switcher && (
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    name="username"
                    placeholder="username"
                  />
                  <input
                    type="password"
                    onChange={this.handleChange}
                    name="password"
                    placeholder="password"
                  />
                  <button>login</button>
                  <p className="message">
                    Not registered?{" "}
                    <a onClick={() => this.switchBtn(true)} href="#">
                      Create an account
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

{
  /* <form id="signForm" onSubmit={this.handleSubmit}>
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
  <Button variant="primary" type="submit">
    login
  </Button>
</form>; */
}
// return (
//   <div>
//     <When condition={!this.context.loggedIn}>
//       <Form id="signForm" onSubmit={this.handleSubmit}>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             placeholder="username"
//             type="text"
//             name="username"
//             onChange={this.handleChange}
//           />
//           <Form.Text className="text-muted">
//             We'll never share your data with anyone else.
//           </Form.Text>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             placeholder="password"
//             type="password"
//             name="password"
//             onChange={this.handleChange}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           login
//         </Button>
//       </Form>
//     </When>
//   </div>
// );
