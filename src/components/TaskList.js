import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  background: #f0f0f0;
  padding: 0.5rem;
`;

const Button = styled.button`
  background: red;
  color: white;
  border: none;
  cursor: pointer;
`;
function TaskList({ tasks, onDelete }) {
  return (
    <List>
      { tasks &&
      tasks.map(task => (
        <ListItem key={task.TaskID}>
          {task.name}
          <Button onClick={() => onDelete(task.TaskID)}>Delete</Button>
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
