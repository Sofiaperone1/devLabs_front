import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import EditIcon from "@mui/icons-material/Edit";
import EditTaskForm from "../forms/EditTaskForm";

interface EditTaskChipProps {
  taskId: number;
  taskData: { description: string; date?: string }; // Datos de la tarea
}

const EditTaskChip: React.FC<EditTaskChipProps> = ({ taskId, taskData }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    console.log(taskData.date); // Muestra la fecha de la tarea en la consola
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Chip
          onDelete={handleOpen}
          deleteIcon={<EditIcon />}
        />
      </Stack>
      <Backdrop
        open={open}
        style={{ zIndex: 1300, color: "#fff" }}
        onClick={handleClose}
      >
        <div
       /*   onClick={(e) => e.stopPropagation()} // Evita cerrar el Backdrop al hacer clic en el contenido
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "400px",
            width: "90%",
          }}*/
        >
          {/* Pasa los datos de la tarea al formulario */}
          <EditTaskForm
            handleClose={handleClose}
            taskId={taskId}
            initialData={taskData}
          />
        </div>
      </Backdrop>
    </>
  );
};

export default EditTaskChip;

