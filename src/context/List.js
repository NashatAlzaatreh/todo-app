import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
export const ListContext = React.createContext();
import cookie from "react-cookies";

function list(props) {
  const [list, setList] = useState([]);
  const [values, setValues] = useState({});
  const [incomplete, setIncomplete] = useState([]);
  const [number, setNumber] = useState(3);
  const [showIncomplete, setShowIncomplete] = useState(false);

  function handleSubmit(event) {
    if (event) event.preventDefault();
    values.id = uuid();
    values.complete = false;
    setList([...list, values]);
    // cookie.remove("list");
    // cookie.save("list", list);
    // cookie.load("list");
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    event.target.reset();
    // cookie.remove("list");
    // cookie.save("list", list);
    if (event) saveList(event);
  }
  // useEffect(() => {
  //   if (list) {
  //     const myListCookie = cookie.load("list");
  //     setList(myListCookie);
  //   }
  // }, []);

  function handleChange(event) {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
    cookie.remove("list");
    cookie.save("list", list);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }
  function handleNumber(e) {
    setNumber(Number(e.target.value));
  }
  function handleIncomplete() {
    setShowIncomplete(!showIncomplete);
  }

  function saveList(e) {
    e.preventDefault();
    localStorage.setItem("list", JSON.stringify(list));
  }
  useEffect(() => {
    // localStorage.setItem("list", []);
    let localList = localStorage.getItem("list");

    console.log(localList);

    if (localList) {
      let lists = JSON.parse(localList);
      setList(lists);
    }
  }, []);
  // import states related to setting to save them in local storage
  function save(e) {
    e.preventDefault();

    const obj = {
      number: e.target.pageNumber.value,
      showIncomplete: e.target.incomplete.value,
    };
    localStorage.setItem("settings", JSON.stringify(obj));
    // localStorage.setItem("list", JSON.stringify(list));
  }
  // use useEffect when mounting to check local storage settings and update the states
  useEffect(() => {
    // let localList = localStorage.getItem("list");
    let local = localStorage.getItem("settings");
    // console.log(localList);
    console.log(local);
    if (local) {
      let settings = JSON.parse(local);
      setNumber(Number(settings.number));
      if (settings.showIncomplete == "true") setShowIncomplete(true);
      if (settings.showIncomplete == "false") setShowIncomplete(false);
    }
    // if (localList) {
    //   let lists = JSON.parse(localList);
    //   setList(lists);
    // }
  }, []);

  return (
    <ListContext.Provider
      value={{
        list,
        handleSubmit,
        handleChange,
        incomplete,
        toggleComplete,
        number,
        handleNumber,
        showIncomplete,
        handleIncomplete,
        save,
        deleteItem,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
}

export default list;
