import React from "react";
import List from "./context/List";
import ToDo from "./components/todo/Todo";

export default function App() {
  return (
    <List>
      <ToDo />
    </List>
  );
}
