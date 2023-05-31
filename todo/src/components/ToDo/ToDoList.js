import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ToDoItem from "./ToDoItem";
import { Header, Image, Table, Button, Icon, Form } from "semantic-ui-react";
import classes from "./ToDoList.module.css";
import { useHistory } from "react-router-dom";
import Modal from "../Modal/Modal";
import EditToDoForm from "../ToDo/EditToDoForm";

const ToDoList = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const [todoItems, setTodoItems] = useState([]);
  const [todoDetails, setTodoDetails] = useState({ id: "", title: "", description: ""});


  const closeModal = () => {
    setIsOpen(false);
  };
  const handleDone = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/item/${id}`)
      .then((response) => {
        window.location.reload(true);
        console.log("Task Done!");
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  };

  const handleEdit = (id) => {

    let details = todoItems.filter((v) => v.id == id);
    console.log(details);
     setTodoDetails({ id: id, title: details[0].title, description: details[0].description});
   
    setIsOpen(true);
  };

  const addToDoHandler = (TodoData) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    };

    var body = JSON.stringify(TodoData);

    axios
      .put(`http://127.0.0.1:8000/api/item/update/${todoDetails.id}`, body, {
        headers: headers,
      })

      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        window.location.reload(true);
        setIsOpen(false);

        
      })
      .catch((err) => {
        let errorMessage = "An Error Ocurred";

        alert(errorMessage);
        console.log("AXIOS ERROR: ", err);
      });

   
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/item/${id}`)
      .then((response) => {
        console.log("Delete successful!");

        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  };

  const FetchItemsHandler = useCallback(async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    };

    axios
      .get(`http://127.0.0.1:8000/api/items`, { headers: headers })
      .then(async (response) => {
        const data = await response.data;

        const tranformedData = data.map((todoData) => {
          return {
            id: todoData.id,
            title: todoData.title,
            description: todoData.description,
            completed: todoData.completed,
          };
        });

        setTodoItems(tranformedData);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, []);
  useEffect(() => {
    FetchItemsHandler();
  }, [FetchItemsHandler]);

  return (
    <React.Fragment>
      
       <Modal isOpen={isOpen} onClose={closeModal} >
        <EditToDoForm onAddToDo={addToDoHandler} todoDetails={todoDetails}></EditToDoForm>{props.children}
      </Modal>

      <div
        style={{
          display: "block",
          width: 700,
          padding: 40,
          marginTop: 0,
          paddingTop: 0,
        }}
      >
        <Table celled>
          <Table.Body>
            {todoItems?.map((todo) => (
              <ToDoItem
                key={todo.id}
                title={
                  todo.completed ? <s>{todo.title}</s> : <p>{todo.title}</p>
                }
                description={
                  todo.completed ? (
                    <s> {todo.description}</s>
                  ) : (
                    <p>{todo.description}</p>
                  ) 
                }
                handleEdit={() => handleEdit(todo.id)}
                handleDone={() => handleDone(todo.id)}
                handleDelete={() => {
                  handleDelete(todo.id);
                }}
              >
                {props.children}
              </ToDoItem>
            ))}
          </Table.Body>
        </Table>
      </div>
     
    </React.Fragment>
  );
};

export default ToDoList;
