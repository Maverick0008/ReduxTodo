import React, {useState} from 'react';
import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({onAddTask}) => {
  const [task, setTask] = useState('')
  const [checked, setChecked] = useState(false)
  const toggleAddTask =() => {
    if(checked === true) {
      setChecked(!checked)
    }
    onAddTask(task, checked)
    setTask("")
  }
  return (
    <div className="field">
      <Checkbox
        checked={checked}
        onClick={(event) => setChecked(event.target.checked)}
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField value={task} onChange={(event) => setTask(event.target.value)} placeholder="Введите текст задачи..." variant="standard" fullWidth />
      <Button onClick={toggleAddTask}>
        <AddIcon />
      </Button>
    </div>
  );
};
