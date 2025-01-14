import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { addTasks, removeTask } from '../../redux/features/counterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetTasksQuery, useDeleteTaskMutation } from '@/redux/api/tasksApi';
import EditTaskChip from '../chips/EditTaskChip';
import './ListComponent.css';

export default function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetTasksQuery(null);
  const datas = useAppSelector((state) => state.counterReducer.data);
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    if (data) {
      dispatch(addTasks(data));
    }
  }, [data, dispatch]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleDelete = async (taskId: number) => {
    await deleteTask({ id: taskId });

    const updatedTasks = datas.filter((task) => task._id !== taskId);

    dispatch(removeTask(updatedTasks));
  };

  if (isLoading) {
    return <p style={{ marginTop: '2%' }}>Loading tasks...</p>;
  }

  if (error) {
    return (
      <p style={{ marginTop: '2%' }}>Error loading tasks. Please try again.</p>
    );
  }

  return (
    <List
      className="listcomponent"
      sx={{
        width: '100%',
        maxWidth: 900,
        bgcolor: 'background.paper',
        marginTop: '1%',
        maxHeight: 300,
        overflowY: 'auto',
        padding: 0,
      }}
    >
      {datas.map((value) => {
        const labelId = `checkbox-list-label-${value._id}`;

        return (
          <ListItem
            key={value._id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(value._id)}
                style={{ marginRight: '1%' }}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <EditTaskChip taskId={value._id} taskData={value} />

            <ListItemButton
              role={undefined}
              onClick={handleToggle(value._id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.includes(value._id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>

              <ListItemText
                style={{ color: 'black' }}
                id={labelId}
                primary={value.description}
              />
              <ListItemText
                style={{ color: 'black' }}
                id={labelId}
                primary={value.date}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
