import * as React from 'react'; // En lugar de import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useGetTasksQuery } from '@/redux/api/tasksApi';
import { useCreateTaskMutation } from '../../redux/api/tasksApi';
import DateSelector from './DateSelector';
import { addOnlyTask } from '../../redux/features/counterSlice';
import { useAppDispatch } from '../../redux/hooks';
import Buttons from '@/utils/Buttons';
import styled from 'styled-components';
import { useAuth } from '@/redux/features/authSlice';

interface Task {
  _id: number;
  description: string;
  date: string;
  username: string;
}

interface TaskFormProps {
  handleClose: () => void;
}

const CustomForm = styled.form`
  width: 86vw;
  .form_cont {
    background-color: white;
    padding: 3% 3% 2% 3%;
  }
`;

const TaskForm: React.FC<TaskFormProps> = ({
  handleClose,
}): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Task>({ mode: 'onBlur' });

  const dispatch = useAppDispatch();
  const { refetch } = useGetTasksQuery(null);
  const [createTask] = useCreateTaskMutation();
  const [resetDate, setResetDate] = useState(false);
  const { user } = useAuth();

  const onSubmit = async (data: Omit<Task, '_id' | 'username'>) => {
    if (!user?.name) {
      Swal.fire({
        icon: 'error',
        title: 'User information not available',
        showConfirmButton: true,
      });
      return;
    }

    const taskDate = data.date
      ? new Date(data.date).toISOString()
      : new Date().toISOString();

    const newTask = {
      _id: Date.now(),
      description: data.description,
      username: user.name,
      date: taskDate, // Ahora taskDate es siempre un string
    } satisfies Task;

    try {
      const response = await createTask(newTask).unwrap();
      if (response) {
        await refetch();
        dispatch(addOnlyTask(newTask));
        Swal.fire({
          icon: 'success',
          title: 'Your task was added successfully',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log('Error adding task:', error);
      Swal.fire({
        icon: 'error',
        title: 'There was an error while adding the task',
        showConfirmButton: true,
      });
    }
    setResetDate(true);
    setValue('description', '');
    setValue('date', '');
    handleClose();
  };

  return (
    <CustomForm className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form_cont">
        <TextField
          sx={{ width: '100%', marginBottom: '2%' }}
          id="outlined-basic"
          label="Description of the task"
          variant="outlined"
          error={!!errors.description}
          helperText={errors.description ? errors.description.message : ''}
          {...register('description', {
            required: 'Description is required',
            maxLength: {
              value: 90,
              message: 'Maximum 90 characters allowed',
            },
          })}
        />

        <DateSelector
          setValue={(name, value) => {
            setValue('date', value?.toISOString() ?? new Date().toISOString());
          }}
          resetDate={resetDate}
        />

        <div className="btns_cont">
          <Buttons variant="cancel" type="button" onClick={handleClose}>
            Cancel
          </Buttons>
          <Buttons type="submit">Save</Buttons>
        </div>
      </div>
    </CustomForm>
  );
};

export default TaskForm;
