import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import EditIcon from '@mui/icons-material/Edit';
import EditTaskForm from '../forms/EditTaskForm';

interface EditTaskChipProps {
  taskId: number;
  taskData: { description: string; date?: string };
}

const EditTaskChip: React.FC<EditTaskChipProps> = ({ taskData }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    console.log('Opening edit form with data:', taskData);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Chip
          className="edit_chip"
          onDelete={handleOpen}
          deleteIcon={<EditIcon />}
        />
      </Stack>
      <Backdrop open={open} sx={{ zIndex: 1300 }} onClick={handleClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <EditTaskForm
            originalDescription={taskData.description} // Cambiado de taskId a originalDescription
            handleClose={handleClose}
            initialData={taskData}
          />
        </div>
      </Backdrop>
    </>
  );
};

export default EditTaskChip;
