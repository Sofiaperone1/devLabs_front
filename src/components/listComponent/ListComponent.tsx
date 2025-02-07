/* import React, { useEffect, useState } from 'react';
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
import Swal from 'sweetalert2';

interface CheckboxListProps {
  userName?: string;
}

export default function CheckboxList({ userName }: CheckboxListProps) {
  // Initialize checked state as null and set it after mounting
  const [checked, setChecked] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useAppDispatch();
  const { data, error } = useGetTasksQuery(null);

  const datas = useAppSelector((state) =>
    username
      ? selectTasksByUsername(state, username)
      : state.counterReducer.data
  );
  console.log('soy datas', datas);
  const [deleteTask] = useDeleteTaskMutation();

  // Set isClient to true after mounting
  useEffect(() => {
    setIsClient(true);
  }, []);

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
    Swal.fire({
      title: 'Are you sure you want to delete this task?',
      showCancelButton: true,
      confirmButtonText: 'delete',
      denyButtonText: 'cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTask({ id: taskId });
        const updatedTasks = datas.filter((task) => task._id !== taskId);
        dispatch(removeTask(updatedTasks));
      }
    });
  };

  if (error) {
    console.log(error);
  }

  const formatDate = (isoDate: string): string => {
    if (!isClient) return ''; // Return empty string during server-side rendering

    const date = new Date(isoDate);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Don't render anything until client-side
  if (!isClient) {
    return (
      <List
        id="listComponent"
        sx={{
          width: '100%',
          maxWidth: 1000,
          bgcolor: 'background.paper',
          marginTop: '1%',
          maxHeight: 600,
          overflowY: 'auto',
          padding: 0,
        }}
      />
    );
  }

  return (
    <List
      id="listComponent"
      sx={{
        width: '100%',
        maxWidth: 1000,
        bgcolor: 'background.paper',
        marginTop: '1%',
        maxHeight: 600,
        overflowY: 'auto',
        padding: 0,
      }}
    >
      {datas.map((value) => {
        const labelId = `checkbox-list-label-${value._id}`;

        return (
          <ListItem
            sx={{ color: 'black' }}
            className="listItem"
            key={value._id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(value._id)}
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
                sx={{
                  width: '75%',
                  marginRight: '2%',
                }}
                id={labelId}
                primary={value.description}
              />
              <ListItemText id={labelId} primary={formatDate(value.date)} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
} */

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
import Swal from 'sweetalert2';
import { useAuth } from '@/redux/features/authSlice';

export default function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);
  const dispatch = useAppDispatch();
  const datas = useAppSelector((state) => state.counterReducer.data);
  const [deleteTask] = useDeleteTaskMutation();
  const { user } = useAuth();
  const { data, error } = useGetTasksQuery(user?.name || ''); // Usando sub como ID único de Auth0

  useEffect(() => {
    if (data && user?.name) {
      dispatch(
        addTasks({
          tasks: data,
          user: user.name, // Passing the string directly
        })
      );
      console.log('Usuario en comp list:', user.name);
    }
  }, [data, dispatch, user]);

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
    Swal.fire({
      title: 'Are you sure you want to delete this task?',
      showCancelButton: true,
      confirmButtonText: 'delete',
      denyButtonText: 'cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTask({ id: taskId });
        const updatedTasks = datas.filter((task) => task._id !== taskId);
        dispatch(removeTask(updatedTasks));
      }
    });
  };

  if (error) {
    console.log(error);
  }
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  return (
    <List
      id="listComponent"
      sx={{
        width: '100%',
        maxWidth: 1000,
        bgcolor: 'background.paper',
        marginTop: '1%',
        maxHeight: 600,
        overflowY: 'auto',
        padding: 0,
      }}
    >
      {datas.map((value) => {
        const labelId = `checkbox-list-label-${value._id}`;

        return (
          <ListItem
            className="listItem"
            sx={{ color: 'black' }}
            key={value._id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(value._id)}
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
                className="desc_item"
                id={labelId}
                sx={{
                  width: '75%',
                  marginRight: '2%',
                }}
                primary={value.description}
              />

              <ListItemText id={labelId} primary={formatDate(value.date)} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
