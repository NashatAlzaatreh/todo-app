import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
export const ListContext = React.createContext();
import cookie from "react-cookies";
import superagent from "superagent";
import base64 from "base-64";

function list(props) {
  const [list, setList] = useState([]);
  const [values, setValues] = useState({});
  const [incomplete, setIncomplete] = useState([]);
  const [number, setNumber] = useState(3);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const API = "https://todo-nashat.herokuapp.com";

  async function handleSubmit(event) {
    if (event) event.preventDefault();
    values.id = uuid();
    values.complete = false;
    // post new list item
    let description = values.text;
    let assignee = values.assignee;
    let difficulty = values.difficulty;
    console.log(description, assignee, difficulty);
    const myTokenCookie = cookie.load("token");

    try {
      console.log("list post");
      const response = await superagent
        .post(`${API}/api/v1/list`, {
          description,
          assignee,
          difficulty,
        })
        .set("authorization", `Bearer ${myTokenCookie}`);
      // console.log(response.body);
      // console.log(list);
      // setList([...list, response.body]);
      // console.log(list);
      // console.log(response.body);
    } catch (err) {
      console.log(err);
    }
    // setList([...list, values]);
    console.log("list", list);
    console.log("values", values);

    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    event.target.reset();

    // if (event) rendering();
  }

  // async function newList() {
  //   const myTokenCookie = cookie.load("token");

  //   try {
  //     console.log("list post");
  //     const response = await superagent
  //       .post(`${API}/api/v1/list`, {
  //         description,
  //         assignee,
  //         difficulty,
  //       })
  //       .set("authorization", `Bearer ${myTokenCookie}`);
  //     console.log(response.body);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  function handleChange(event) {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  }

  async function deleteItem(id) {
    const myTokenCookie = cookie.load("token");
    try {
      console.log("list delete");
      const response = await superagent
        .delete(`${API}/api/v1/list/${id}`)
        .set("authorization", `Bearer ${myTokenCookie}`);

      // setList(response.body);
      console.log(response.body);
      // console.log(list);
    } catch (err) {
      console.log(err);
    }
    // const items = list.filter((item) => item.id !== id);
    // setList(items);
  }

  async function toggleComplete(id, completeStatus) {
    const myTokenCookie = cookie.load("token");

    completeStatus = completeStatus === "no" ? "yes" : "no";
    try {
      console.log("list put");
      const response = await superagent
        .put(`${API}/api/v1/list/${id}`, {
          completeStatus,
        })
        .set("authorization", `Bearer ${myTokenCookie}`);
    } catch (err) {
      console.log(err);
    }
    // const items = list.map((item) => {
    //   if (item.id == id) {
    //     item.complete = !item.complete;
    //   }
    //   return item;
    // });

    // setList(items);
  }
  function handleNumber(e) {
    setNumber(Number(e.target.value));
  }
  function handleIncomplete() {
    setShowIncomplete(!showIncomplete);
  }

  // async function rendering() {
  //   const myTokenCookie = cookie.load("token");
  //   try {
  //     console.log("list get");
  //     const response = await superagent
  //       .get(`${API}/api/v1/list`)
  //       .set("authorization", `Bearer ${myTokenCookie}`);

  //     setList(response.body);
  //     console.log(response.body);
  //     console.log(list);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  useEffect(async () => {
    const myTokenCookie = cookie.load("token");
    try {
      const response = await superagent
        .get(`${API}/api/v1/list`)
        .set("authorization", `Bearer ${myTokenCookie}`);

      setList(response.body);
    } catch (err) {
      console.log(err);
    }
  }, [list]);

  // function saveList(e) {
  //   e.preventDefault();
  //   localStorage.setItem("list", JSON.stringify(list));
  // }
  // useEffect(() => {
  //   // localStorage.setItem("list", []);
  //   let localList = localStorage.getItem("list");

  //   // console.log(localList);

  //   if (localList) {
  //     let lists = JSON.parse(localList);
  //     setList(lists);
  //   }
  // }, []);
  // // import states related to setting to save them in local storage
  // function save(e) {
  //   e.preventDefault();

  //   const obj = {
  //     number: e.target.pageNumber.value,
  //     showIncomplete: e.target.incomplete.value,
  //   };
  //   localStorage.setItem("settings", JSON.stringify(obj));
  //   // localStorage.setItem("list", JSON.stringify(list));
  // }
  // // use useEffect when mounting to check local storage settings and update the states
  // useEffect(() => {
  //   // let localList = localStorage.getItem("list");
  //   let local = localStorage.getItem("settings");
  //   // console.log(localList);
  //   // console.log(local);
  //   if (local) {
  //     let settings = JSON.parse(local);
  //     setNumber(Number(settings.number));
  //     if (settings.showIncomplete == "true") setShowIncomplete(true);
  //     if (settings.showIncomplete == "false") setShowIncomplete(false);
  //   }
  //   // if (localList) {
  //   //   let lists = JSON.parse(localList);
  //   //   setList(lists);
  //   // }
  // }, []);

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
        // save,
        deleteItem,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
}

export default list;
