import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Icon, Modal } from "semantic-ui-react";

import AddToDoForm from "../../components/ToDo/AddToDoForm";
import ToDoList from "../../components/ToDo/ToDoList";
import axios from "axios";
import classes from "./ItemsPage.module.css";



const ItemsPage = (props) => {


  const history = useHistory();

  const addToDoHandler = (TodoData) => {
    var todoDetails = {
      title: TodoData.title,
      description: TodoData.description,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    };

    var body = JSON.stringify(todoDetails);

    axios
      .post(`http://127.0.0.1:8000/api/item/store`, body, {
        headers: headers,
      })

      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        window.location.reload(true);
        history.replace("/");
      })
      .catch((err) => {
        let errorMessage = "An Error Ocurred";

        alert(errorMessage);
        console.log("AXIOS ERROR: ", err);
      });

    history.replace("/");
  };
  return (
    <React.Fragment>
      <div className={classes.card}>
        {" "}
        <AddToDoForm onAddToDo={addToDoHandler}></AddToDoForm>
        <ToDoList />
    
      </div>
    </React.Fragment>
  );
};

export default ItemsPage;
