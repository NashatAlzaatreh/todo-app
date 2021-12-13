import React, { useContext } from "react";
import { Navbar, Button, Alignment } from "@blueprintjs/core";
import "./header.scss";
import { ListContext } from "../../context/List";

function Header(props) {
  const listContext = useContext(ListContext);
  const { incomplete } = listContext;
  return (
    <>
      <Navbar className="bp3-navbar bp3-dark">
        <Navbar.Group>
          <Navbar.Heading>
            To Do List: {incomplete} items pending
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Navbar.Divider />
          <a href="/">
            <Button className="bp3-minimal" icon="home" text="Home" />
          </a>
          <a href="/setting">
            <Button className="bp3-minimal" icon="settings" text="Settings" />
          </a>
        </Navbar.Group>
      </Navbar>
    </>
  );
}

export default Header;
