import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useCreateTaskMutation } from '../../redux/api/tasksApi';
import DateSelector from './DateSelector';
import { addOnlyTask } from '../../redux/features/counterSlice'; // Importa la nueva acción
import { useAppDispatch } from '../../redux/hooks';
import { Button } from '@mui/material';
import '../listComponent/ListComponent.css';

interface Task {
  description: string;
  date?: string; // Ahora es 'Date | undefined'
}

interface TaskFormProps {
  handleClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Task>({ mode: 'onBlur' });

  const dispatch = useAppDispatch();

  const [createTask] = useCreateTaskMutation();
  const [resetDate, setResetDate] = useState(false); // Estado para restablecer la fecha

  // Llamada al backend y actualización del estado global
  const onSubmit = async (data: Task) => {
    console.log(data.date);

    const newTask = {
      _id: Date.now(),
      description: data.description,
      date: data.date
        ? new Date(data.date).toISOString()
        : new Date().toISOString(),
    };

    try {
      const response = await createTask(newTask).unwrap();
      if (response) {
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
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div style={{ backgroundColor: 'white', padding: '3% 3% 2% 3%' }}>
        <TextField
          style={{ width: '100%', marginBottom: '2%' }}
          id="outlined-basic"
          label="Description of the task"
          variant="outlined"
          error={!!errors.description}
          helperText={errors.description ? errors.description.message : ''} // Usa el mensaje definido en la validación
          {...register('description', {
            required: 'Description is required', // Define el mensaje aquí
          })}
        />

        {/* Pasamos 'setValue' para el campo 'date' */}
        <DateSelector
          setValue={(name, value) => {
            // Verificar si el valor es una fecha válida y convertirlo a un string (ISO)
            setValue('date', value ? new Date(value).toISOString() : undefined);
          }}
          resetDate={resetDate}
        />

        <div className="buttons_cont" style={{ marginTop: '3%' }}>
          <Button
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '1% 4% 1% 4%',
              marginRight: '2%',
            }}
            type="button"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            style={{
              backgroundColor: 'violet',
              color: 'white',
              marginRight: '0',
              padding: '1% 4% 1% 4%',
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
