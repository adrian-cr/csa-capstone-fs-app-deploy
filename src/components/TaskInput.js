import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  height: 35px;
  margin-right: 0.5rem;
  padding: 0.5rem;
  width: 80%;
  &:focus {
    border: 2px solid #507feb;
    outline: none;
    transition: 50ms;
  }
`;

const Button = styled.button`
  background-color: #2c8def;
  border: none;
  border-radius: 5px;
  color: white;
  height: 35px;
  padding: 0.5rem 1rem;
  &:hover {
    cursor: pointer;
    background-color: #47a3ff;
    transition: 300ms;
  }
  &.creating {
    background-color:rgb(84, 166, 210);
    pointer-events: none;
    transition: 300ms;
  }
`;

function TaskInput({ onAdd }) {
  const [task, setTask] = useState("");
  const [creating, setCreating] = useState(false)
  const handleSubmit = async() => {
    if (task.trim()) {
      setCreating(true)
      await onAdd(task);
      setTask("");
    }
  };

  useEffect(() => setCreating(false), [task])

  return (
    <InputWrapper>
      <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder="New Task" />
      <Button className={creating? "creating" : ""} onClick={handleSubmit}>{creating? "Creating...": "Create"}</Button>
    </InputWrapper>
  );
}

export default TaskInput;
