import React, { useContext } from "react";
import { ListContext } from "../../context/List";
import { H2 } from "@blueprintjs/core";
import "./setting.scss";

function Setting() {
  const { save } = useContext(ListContext);
  return (
    <form className="setting" onSubmit={save}>
      <H2>Settings</H2>
      <label>Show only incomplete to-do's on start up</label> <br />
      <div className="boolean">
        <input type="radio" name="incomplete" value={false} /> No
        <input type="radio" name="incomplete" value={true} /> Yes
      </div>
      <br />
      <label>Select number of to-do's to display</label> <br />
      <select name="pageNumber" id="">
        <option disabled>Select One</option>
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="9">9</option>
      </select>{" "}
      <br />
      <input type="submit" value="save" />
    </form>
  );
}

export default Setting;
