import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  _id: number;
  description: string;
  date: string;
  username?: string;
}

export interface AddTasksPayload {
  tasks: Task[];
  user: string; // Changed to string since we're passing user.name directly
}

interface DataState {
  data: Task[];
  currentUser: string | null;
}

const initialState: DataState = {
  data: [],
  currentUser: null,
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
    addTasks: (state, action: PayloadAction<AddTasksPayload>) => {
      state.data = action.payload.tasks;
      state.currentUser = action.payload.user;
      console.log('User en counterslice:', action.payload.user);
    },
    addOnlyTask: (state, action: PayloadAction<Task>) => {
      if (!action.payload.username) {
        console.error('Task must include userId and username');
        return;
      }
      state.data = sortByDate([...state.data, action.payload]);
    },
    removeTask: (state, action: PayloadAction<Task[]>) => {
      state.data = action.payload;
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
        state.data = sortByDate(state.data);
      }
    },
  },
});

export const { addTasks, addOnlyTask, removeTask, updateTask } =
  counterSlice.actions;
export default counterSlice.reducer;
