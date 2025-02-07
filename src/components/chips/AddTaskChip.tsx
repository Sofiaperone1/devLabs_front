import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Backdrop from '@mui/material/Backdrop';
import TaskForm from '../forms/TaskForm';

export default function AddTaskChip() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Add new task"
        onDelete={handleOpen}
        deleteIcon={<AddCircleOutlineIcon />}
        variant="outlined"
        sx={{
          color: 'white',
          borderColor: 'primary.main',
          width: '40vw',
          '& .MuiChip-deleteIcon': {
            color: 'primary.main',
            '&:hover': {
              color: 'primary.main', // Evita que cambie de color al pasar el mouse
            },
          },
        }}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <TaskForm handleClose={handleClose} />
      </Backdrop>
    </Stack>
  );
}
