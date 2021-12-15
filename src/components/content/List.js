import React, { useContext, useState, useEffect } from "react";
import "./list.scss";
import { ListContext } from "../../context/List";
import { Button, Card, Elevation, Switch } from "@blueprintjs/core";
import { When } from "react-if";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginContext } from "../../context/loginContext";

function List(props) {
  const login = useContext(LoginContext);
  const { loggedIn, can } = login;
  const doHaveCapabilities = can(props.capability);

  const {
    list,
    toggleComplete,
    number,
    showIncomplete,
    handleNumber,
    handleIncomplete,
    deleteItem,
  } = useContext(ListContext);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  const [filter, setFilter] = useState([]);
  // const [number, setNumber] = useState(3);
  const [page, setPage] = useState(null);

  useEffect(() => {
    setStart(0);
    setEnd(number);
    const pages = [];
    for (let i = 1; i <= Math.ceil(filter.length / number); i++) {
      pages[i] = i;
    }
    setPage(pages);
  }, [number]);

  useEffect(() => {
    setFilter(list);
  }, [list]);

  useEffect(() => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(filter.length / number); i++) {
      pages[i] = i;
    }
    setPage(pages);
  }, [filter]);

  useEffect(() => {
    if (showIncomplete)
      setFilter(() => filter.filter((item) => item.complete != true));
    else setFilter(list);
  }, [showIncomplete]);

  // 0000000000000

  function next(num, length) {
    if (start + Math.abs(num) > length) return;
    setStart(start + num);
    setEnd(end + num);
  }

  function back(num) {
    if (start - Math.abs(num) < 0) return;
    setStart(start + num);
    setEnd(end + num);
  }

  function pagination(e) {
    setStart(Number(e.target.id) * number - number);
    setEnd(Number(e.target.id) * number);
  }

  useEffect(() => {
    setFilter(list);
  }, [list]);

  const pages = [];
  for (let i = 1; i <= Math.ceil(filter.length / number); i++) {
    pages[i] = i;
  }

  return (
    <div>
      <div className="list-container">
        <Switch checked={showIncomplete} onClick={handleIncomplete}>
          Only In-Complete
        </Switch>
        <div className="page-select">
          <label>Number of Item Displayed</label>
          <select onClick={handleNumber}>
            <option value="3">Select One</option>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
          </select>
        </div>

        <ul>
          {filter.slice(start, end).map((item) => {
            const deff = item.difficulty > 3 ? "hard" : "easy";
            return (
              <Card
                key={item.id}
                interactive={true}
                elevation={Elevation.ZERO}
                className="card"
              >
                <h5>
                  <span
                    className={
                      item.difficulty > 3
                        ? "bp3-tag bp3-round bp3-intent-danger"
                        : item.difficulty == 3
                        ? "bp3-tag bp3-round bp3-intent-warning"
                        : "bp3-tag bp3-round bp3-intent-success"
                    }
                  >
                    {deff}
                  </span>
                  <span> {item.assignee} </span>
                </h5>
                <p>{item.description}</p>
                <When condition={loggedIn && doHaveCapabilities}>
                  <Button
                    className="bp3-small bp3-intent-danger"
                    icon="trash"
                    onClick={() => deleteItem(item.id)}
                  />
                </When>
                <When condition={loggedIn && doHaveCapabilities}>
                  <Button
                    className={
                      item.completeStatus === "yes"
                        ? "bp3-small bp3-outlined bp3-intent-success"
                        : "bp3-small bp3-outlined bp3-intent-danger"
                    }
                    onClick={() => toggleComplete(item.id, item.completeStatus)}
                  >
                    {item.completeStatus === "yes" ? "Complete" : "Incomplete"}
                  </Button>
                </When>
              </Card>
            );
          })}
        </ul>
        <div className="navigation">
          <Button
            icon="arrow-left"
            intent="success"
            outlined
            onClick={() => back(number * -1)}
          />
          <div className="nav-page">
            {pages.map((page) => (
              <Button
                key={`page-${page}`}
                id={page}
                intent="Primary"
                outlined
                onClick={pagination}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            icon="arrow-right"
            intent="success"
            outlined
            onClick={() => next(number, filter.length)}
          />
        </div>
      </div>
    </div>
  );
}

export default List;
