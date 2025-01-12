import React, { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks';
import { updateTask } from '../../redux/features/counterSlice';
import DateSelector from './DateSelector';
import { useUpdateTaskMutation } from '@/redux/api/tasksApi';
import '../listComponent/ListComponent.css';
import { Button } from '@mui/material';

interface Task {
  description: string;
  date?: string;
}

interface EditTaskFormProps {
  taskId: number;
  handleClose: () => void;
  initialData: { description: string; date?: string };
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  taskId,
  handleClose,
  initialData,
}) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Task>({
    mode: 'onBlur',
    defaultValues: {
      description: initialData.description,
      date: initialData.date || undefined,
    },
  });

  const [updateTaskBackend, { isLoading }] = useUpdateTaskMutation();

  // Observar los valores del formulario
  const currentDescription = watch('description');
  const currentDate = watch('date');

  // Verificar si hay cambios en el formulario
  const hasChanges = useMemo(() => {
    const descriptionChanged = currentDescription !== initialData.description;
    const dateChanged = currentDate !== initialData.date;
    return descriptionChanged || dateChanged;
  }, [
    currentDescription,
    currentDate,
    initialData.description,
    initialData.date,
  ]);

  const onSubmit = async (data: Task) => {
    try {
      const updates = {
        description: data.description,
        date:
          data.date === initialData.date
            ? initialData.date
            : data.date
              ? new Date(data.date).toISOString()
              : undefined,
      };

      await updateTaskBackend({
        id: taskId,
        ...updates,
      }).unwrap();

      dispatch(updateTask({ id: taskId, updates }));
      handleClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
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
          helperText={errors.description ? errors.description.message : ''}
          {...register('description', {
            required: 'Required',
          })}
        />
        <DateSelector
          setValue={(name: 'description' | 'date', value: Date | null) =>
            setValue(name, value ? value.toISOString() : undefined)
          }
          resetDate={false}
          initialDate={initialData.date}
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
            disabled={!hasChanges || isLoading}
            style={{
              backgroundColor: hasChanges ? 'violet' : '#e0e0e0',
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

export default EditTaskForm;
