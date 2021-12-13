import React from "react";
import { Navbar, Button, Alignment } from "@blueprintjs/core";
import "./header.scss";
function Header(props) {
  return (
    <>
      <Navbar className="bp3-navbar bp3-dark">
        <Navbar.Group>
          <Navbar.Heading>
            To Do List: {props.incomplete} items pending
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="home" text="Home" />
          <Button className="bp3-minimal" icon="settings" text="Settings" />
        </Navbar.Group>
      </Navbar>
    </>
  );
}

export default Header;
