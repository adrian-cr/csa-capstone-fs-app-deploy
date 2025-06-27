import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TaskList from '../components/TaskList';
import TaskInput from '../components/TaskInput';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  font-family: sans-serif;
`;

const BASE_URL = 'https://oc7kab3v54.execute-api.us-east-2.amazonaws.com/dev';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setTasks(JSON.parse(data.body));
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const addTask = async (taskName) => {
    try {
      const res = await fetch(BASE_URL + '/add-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName })
      });
      if (res.ok) {
        fetchTasks();
      }
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(BASE_URL + `/task/${id}`, {
        method: 'DELETE'
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    tasks &&
    <Container>
      <h1>Task Tracker</h1>
      <TaskInput onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </Container>
  );
}
