import React, { useRef, useState } from "react";
import classes from "./AddToDoForm.module.css";
import { Button, Icon, Modal } from "semantic-ui-react";

import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";

const AddToDoForm = (props) => {
  const [showComponent, setShowComponent] = useState(false);
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    //  validate here
    const enteredTitleIsValid = enteredTitle.trim() !== "";
    const enteredDescriptionIsValid = enteredDescription.trim() !== "";
    if (enteredTitleIsValid && enteredDescriptionIsValid) {
      props.onAddToDo({
        title: enteredTitle,
        description: enteredDescription,
      });
    } else {
      return;
    }
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
              ref={titleInputRef}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              id="description"
              placeholder="ToDo Description"
              required
              ref={descriptionInputRef}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default AddToDoForm;
