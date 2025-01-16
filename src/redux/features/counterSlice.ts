import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Task {
  _id: number;
  description: string;
  date: string;
}

// Definir el tipo para el estado
interface DataState {
  data: Task[]; // Ahora es un array de objetos tipo `Task`
}

const initialState: DataState = {
  data: [],
};

const sortByDate = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    //aca van las funciones que actualizan

    addTasks: (state, action: PayloadAction<Task[]>) => {
      // Agrega la tarea recibida en el payload
      state.data = sortByDate(action.payload);
    },
    addOnlyTask: (state, action: PayloadAction<Task>) => {
      state.data = sortByDate([...state.data, action.payload]);
    },
    // Nueva acción para eliminar una tarea
    removeTask: (state, action: PayloadAction<Task[]>) => {
      state.data = action.payload; // Reemplaza el estado con las tareas actualizadas (sin la tarea eliminada)
    },
    updateTask: (
      state,
      action: PayloadAction<{ description: string; updates: Partial<Task> }>
    ) => {
      const { description, updates } = action.payload;
      const taskIndex = state.data.findIndex(
        (task) => task.description === description
      );
      if (taskIndex !== -1) {
        state.data[taskIndex] = { ...state.data[taskIndex], ...updates };
        // Ordenar el array después de actualizar la tarea
        state.data = sortByDate(state.data);
      }
    },
  },
});

export const { addTasks, addOnlyTask, removeTask, updateTask } =
  counterSlice.actions;

export default counterSlice.reducer;
