import React from "react";
// import Table from "react-bootstrap/Table";
import { Table, Icon, Button } from "semantic-ui-react";
import classes from "./ToDoItem.module.css";
const ToDoItem = (props) => {
  
  return (
    <React.Fragment>
      <Table.Row>
        <Table.Cell>
          <b>{props.title}</b>
        </Table.Cell>
        
        <Table.Cell>{props.description}</Table.Cell>

        <Table.Cell>
          <Icon
            classname={classes.icon}
            name="edit"
            color="grey"
            onClick={props.handleEdit}
          />{" "}
          <Icon name="check" color="green" onClick={props.handleDone} />{" "}
          <Icon name="delete" color="red" onClick={props.handleDelete} />{" "}
        </Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
};

export default ToDoItem;
