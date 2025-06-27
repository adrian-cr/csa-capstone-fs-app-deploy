import React, { useState } from 'react';
import styled from 'styled-components';

const List = styled.ul`
  font-size: 1.2em;
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
align-items: center;
  border: 3px solid #e3f0ff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  background:rgb(255, 255, 255);
  padding: 1rem;
  p {
    margin: 0;
  }
  &:hover {
    background-color: #e3f0ff;
    transition: 300ms;
  }
  &.deleting {
    background-color: #14cb7c;
    border: 3px solid #14cb7c;
    color: #ffffff;
    transition: 400ms;
    > p {
      text-decoration: line-through;
    }

  }
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: #14cb7c;
  color: white;
  border: none;
  min-height: 30px;
  min-width: 80px;
  cursor: pointer;
  &.deleting {
    font-size: 1.1em;
    pointer-events: none;
    transition: 500ms;
  }
`;
function TaskList({ tasks, onDelete }) {
  const [deleting, setDeleting] = useState(null);
  return (
    <List>
      { tasks &&
      tasks.map(task => (
        <ListItem className={deleting===task.TaskID? "deleting" : ""} key={task.TaskID}>
          <p>{task.name}</p>
          <Button
            className={deleting===task.TaskID? "deleting" : ""}
            onClick={async() => {
              if (deleting) return;
              setDeleting(task.TaskID);
              await onDelete(task.TaskID);
              setDeleting("");
            }}
          >
            {deleting===task.TaskID? "Completed!" : "Complete"}
          </Button>
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
