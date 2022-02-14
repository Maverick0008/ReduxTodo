import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import React,{useReducer} from 'react'

function reducer (state, action) {
  if(action.type === 'ADD_TASK') {
    const objNewTask = {
      id: state.length + 1,
      text: action.text,
      completed: action.completed

    }
    return [...state, objNewTask]
  }
  if (action.type === 'TOGGLE_CHECKED') {
    state.map(obj=> {
      if(obj.id === action.id) {
       obj.completed = !obj.completed
      }
    })
    return [...state]
  }
 
}
function App() {
 const [state, dispatch] = useReducer(reducer,[])
  const addTask = (text, completed) => {
    dispatch({
      type: 'ADD_TASK',
      text,
      completed,
    })
  }
  const toggleChecked = (id) => {
    dispatch({
      type:'TOGGLE_CHECKED',
      id
    })
  }
  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAddTask  = {addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map(obj => <Item id={obj.id} completed={obj.completed} key={obj.id} text={obj.text} toggleChecked={toggleChecked} />)}
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
