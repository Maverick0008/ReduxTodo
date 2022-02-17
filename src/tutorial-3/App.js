import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";
import React, { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const objNewTask = {
        id: state.length + 1,
        text: action.payload.text,
        completed: action.payload.completed,
      };
      return [...state, objNewTask];
    }
    case "TOGGLE_CHECKED": {
      const newState = state.map((obj) => {
        if (obj.id === action.payload) {
          return {
            ...obj,
            completed: !obj.completed,
          };
        }
        return obj;
      });
      return newState;
    }
    case "ALL_CHECKED": {
      return state.map(obj => ({
        ...obj, completed: action.payload
      }))
    }
    case "REMOVE_TASK": {
      return state.filter((obj) => obj.id !== action.payload);
    }
    case "CLEAR_ALL_TASKS": {
      return state.filter(item => item.completed === false)
    }
    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [checkedAll, setCheckedAll] = useState(true)
  const addTask = (text, completed) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        text,
        completed,
      },
    });
  };
  const toggleChecked = (id) => {
    dispatch({
      type: "TOGGLE_CHECKED",
      payload: id,
    });
  };
  const removeTask = (id) => {
    if (window.confirm("Вы действительно ходите удалить задачу?")) {
      dispatch({
        type: "REMOVE_TASK",
        payload: id,
      });
    }
  };
  const toggleCheckAll = () => {
    if(state.length) {
      setCheckedAll(!checkedAll)
      dispatch({
      type: "ALL_CHECKED",
      payload:checkedAll
    })
    }
  }
  const clearAllTasks = () => {
    if(window.confirm('Данное действие приведет к удалению выбранных задач. Вы уверены?')) {
      dispatch({
        type: 'CLEAR_ALL_TASKS'
      })
    }
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAddTask={addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => (
            <Item
              removeTask={removeTask}
              id={obj.id}
              completed={obj.completed}
              key={obj.id}
              text={obj.text}
              toggleChecked={toggleChecked}
            />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={toggleCheckAll}>{checkedAll ? 'Отметить все' : "Снять все отметки"}</Button>
          <Button onClick={clearAllTasks}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
