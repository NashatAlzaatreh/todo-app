import React, { useEffect, useState, useContext } from "react";
import Header from "../header/Header";
import Form from "../content/Form";
import List from "../content/List";
import { ListContext } from "../../context/List";
import "./to-do.scss";
import { LoginContext } from "../../context/loginContext";

const ToDo = () => {
  const listObject = useContext(ListContext);
  const login = useContext(LoginContext);
  const { list, incomplete } = listObject;

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  useEffect(() => {
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      {login.loggedIn ? (
        <div className="form-list">
          <Form capability="create" />
          <List capability="update" />
        </div>
      ) : null}
    </>
  );
};

export default ToDo;
