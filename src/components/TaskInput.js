import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  width: 80%;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
`;

function TaskInput({ onAdd }) {
  const [task, setTask] = useState("");

  const handleSubmit = () => {
    if (task.trim()) {
      onAdd(task);
      setTask("");
    }
  };

  return (
    <InputWrapper>
      <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder="New Task" />
      <Button onClick={handleSubmit}>Add</Button>
    </InputWrapper>
  );
}

export default TaskInput;
