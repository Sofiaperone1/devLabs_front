import React, { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks';
import { updateTask } from '../../redux/features/counterSlice';
import DateSelector from './DateSelector';
import { useUpdateTaskMutation } from '@/redux/api/tasksApi';
import Buttons from '@/utils/Buttons';
import styled from 'styled-components';

interface Task {
  description: string;
  date?: string;
}

interface EditTaskFormProps {
  originalDescription: string; // Cambiado de taskId a originalDescription
  handleClose: () => void;
  initialData: { description: string; date?: string };
}

const CustomForm = styled.form`
  width: 86vw;
  .form_cont {
    background-color: white;
    padding: 3% 3% 2% 3%;
  }
`;

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
    <CustomForm className="editTaskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form_cont">
        <TextField
          sx={{ width: '100%', marginBottom: '2%' }}
          id="outlined-basic"
          label="Description of the task"
          variant="outlined"
          error={!!errors.description}
          helperText={errors.description ? errors.description.message : ''}
          {...register('description', {
            required: 'Required',
            maxLength: {
              value: 90,
              message: 'Maximum 90 characters allowed', // Mensaje de error
            },
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
          <Buttons variant="cancel" type="button" onClick={handleClose}>
            Cancel
          </Buttons>
          <Buttons type="submit" disabled={!hasChanges || isLoading}>
            Save
          </Buttons>
        </div>
      </div>
    </CustomForm>
  );
};

export default EditTaskForm;
