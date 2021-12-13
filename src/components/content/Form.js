import React, { useContext } from "react";
import { ListContext } from "../../context/List";
import {
  FormGroup,
  InputGroup,
  Switch,
  Intent,
  H1,
  Slider,
} from "@blueprintjs/core";
import "./form.scss";

function Form() {
  const { handleSubmit, handleChange } = useContext(ListContext);

  return (
    <div className="form1">
      <H1>Add To Do Item</H1>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormGroup label="To-Do Details" labelInfo="(required)">
            <InputGroup
              onChange={handleChange}
              name="text"
              placeholder="what do you want to do ?"
              intent={Intent.PRIMARY}
              required
            />
          </FormGroup>
          <FormGroup
            label="Assigned to"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              onChange={handleChange}
              name="assignee"
              placeholder="Assignee Name"
              intent={Intent.PRIMARY}
              required
            />
          </FormGroup>
          <FormGroup label="Difficulty" labelFor="range">
            <input
              onChange={handleChange}
              defaultValue={3}
              type="range"
              min={1}
              max={5}
              name="difficulty"
            />
          </FormGroup>
          <FormGroup>
            <InputGroup type="submit" intent={Intent.DANGER} />
          </FormGroup>
        </FormGroup>
      </form>
    </div>
  );
}

export default Form;
