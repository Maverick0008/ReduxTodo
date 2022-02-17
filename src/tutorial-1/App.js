import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";
import React, { useReducer } from "react";

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
        if (obj.id === action.id) {
          return {
            ...obj,
            completed: !obj.completed,
          };
        }
        return obj;
      });
      return newState;
    }
    case "REMOVE_TASK": {
      if (window.confirm("Вы действительнго хотите удалить задачу?")) {
        return state.filter((obj) => obj.id !== action.id);
      }
    }
    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, []);
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
      id,
    });
  };
  const removeTask = (id) => {
    dispatch({
      type: "REMOVE_TASK",
      id,
    });
  };

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
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
