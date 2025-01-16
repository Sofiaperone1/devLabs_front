import React, { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks';
import { updateTask } from '../../redux/features/counterSlice';
import DateSelector from './DateSelector';
import { useUpdateTaskMutation } from '@/redux/api/tasksApi';
import '../listComponent/ListComponent.css';
import { Button } from '@mui/material';
import './forms.css';
interface Task {
  description: string;
  date?: string;
}

interface EditTaskFormProps {
  originalDescription: string; // Cambiado de taskId a originalDescription
  handleClose: () => void;
  initialData: { description: string; date?: string };
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  originalDescription, // Actualizado el prop
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

  const currentDescription = watch('description');
  const currentDate = watch('date');

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
      console.log('primero rompe el front', originalDescription);
      // Actualizado para usar description en lugar de id
      await updateTaskBackend({
        description: originalDescription,
        updates: {
          description: data.description,
          date: updates.date,
        },
      }).unwrap();
      // Actualizado para usar description en el dispatch
      dispatch(
        updateTask({
          description: originalDescription,
          updates,
        })
      );
      handleClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <form className="editTaskForm" onSubmit={handleSubmit(onSubmit)}>
      <div id="form_cont">
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

        <div className="btns_cont">
          <Button id="btn_cancel" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            id="btn_save"
            disabled={!hasChanges || isLoading}
            style={{
              backgroundColor: hasChanges ? 'violet' : '#e0e0e0',
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
