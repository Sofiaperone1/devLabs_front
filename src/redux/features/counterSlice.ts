import {createSlice, PayloadAction} from "@reduxjs/toolkit" 
import { AppDispatch } from "../store";

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

export const counterSlice = createSlice({
    name:"counter",
    initialState, 
    reducers: { //aca van las funciones que actualizan
      
      addTasks: (state, action: PayloadAction<Task[]>) => {
        state.data = [...state.data, ...action.payload];
        // Agrega la tarea recibida en el payload
      },
      addOnlyTask: (state, action: PayloadAction<Task>) => {
        state.data.push(action.payload);  // Agrega un solo objeto al array
      },
       // Nueva acción para eliminar una tarea
    removeTask: (state, action: PayloadAction<Task[]>) => {
      state.data = action.payload;  // Reemplaza el estado con las tareas actualizadas (sin la tarea eliminada)
    },
    updateTask: (state, action: PayloadAction<{ id: number; updates: Partial<Task> }>) => {
      const { id, updates } = action.payload;
      const taskIndex = state.data.findIndex((task) => task._id === id);
      if (taskIndex !== -1) {
        state.data[taskIndex] = { ...state.data[taskIndex], ...updates };
      }
    },
    }
})

export const {addTasks, addOnlyTask, removeTask, updateTask} = counterSlice.actions

export default counterSlice.reducer 