import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TaskList from '../components/TaskList';
import TaskInput from '../components/TaskInput';

const Container = styled.div`
  background-color:rgba(255, 255, 255, 0.58);
  border-radius: 25px;
  margin: 2rem auto;
  min-height: 50%;
  font-family: sans-serif;
  text-align: center;
  min-width: 200px;
  padding: 20px;
  width: 70%;
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
      await delay();
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
      await delay();
      const res = await fetch(BASE_URL + `/task/${id}`, {
        method: 'DELETE'
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

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
