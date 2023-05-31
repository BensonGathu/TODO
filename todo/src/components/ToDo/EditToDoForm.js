import React, { useEffect, useRef, useState } from "react";
import classes from "./AddToDoForm.module.css";
import { Button, Icon, Modal } from "semantic-ui-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";

const EditToDoForm = (props) => {
  const [showComponent, setShowComponent] = useState(false);
  const [input, setInput] = useState({ title: "", description: ""});

  useEffect(() => {
    if(props.todoDetails) {
      setInput({ title: props.todoDetails.title, description: props.todoDetails.description});
    }
  }, [props.todoDetails]);

  function submitFormHandler(event) {
    event.preventDefault();

    props.onAddToDo(input);

    // const enteredTitle = titleInputRef.current.value;
    // const enteredDescription = descriptionInputRef.current.value;

    // //  validate here
    // const enteredTitleIsValid = enteredTitle.trim() !== "";
    // const enteredDescriptionIsValid = enteredDescription.trim() !== "";
    // if (enteredTitleIsValid && enteredDescriptionIsValid) {
    //   props.onAddToDo({
    //     title: enteredTitle,
    //     description: enteredDescription,
    //   });
    // } else {
    //   return;
    // }
  }
  return (
    <React.Fragment>
      <div style={{ display: "block", width: 650, padding: 30, marginTop: 60 }}>
        <Form className={classes.form} onSubmit={submitFormHandler}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              required
              id="title"
              value={input.title}
              onChange={(e) => setInput((prevValue) => ({...prevValue, title: e.target.value}))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              id="description"
              placeholder="ToDo Description"
              required
              value={input.description}
              onChange={(e) => setInput((prevValue) => ({...prevValue, description: e.target.value}))}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default EditToDoForm;
