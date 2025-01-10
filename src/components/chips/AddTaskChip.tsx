import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Backdrop from '@mui/material/Backdrop';
import TaskForm from "../forms/TaskForm";


export default function AddTaskChip() {
  
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <Stack direction="row" spacing={1} style={{width:"45%"}}>
   
      <Chip
        label="Agregar prod"
        onDelete={handleOpen}
        deleteIcon={<AddCircleOutlineIcon style={{color:"violet"}}/>}
        variant="outlined"
        style={{color:"white", borderColor:"violet" , width:"100%"}}
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