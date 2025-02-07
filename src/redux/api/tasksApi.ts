import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

type Task = {
  _id: number;
  description: string;
  date: string;
  username: string;
};

// Base query con lógica del token centralizada
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BACKEND,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.warn('⚠️ No hay token disponible');
    }

    return headers;
  },
});

export const taskApi = createApi({
  reducerPath: 'createApi',
  baseQuery,
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], string>({
      query: (username) => `tasks/getAllTasks?username=${username || ''}`,
    }),
    getTaskById: builder.query<Task, { id: string }>({
      query: ({ id }) => `tasks/getTask/${id}`,
    }),
    // POST new task
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: 'tasks/createTasks',
        method: 'POST',
        body: newTask,
      }),
    }),
    // PUT (update) a task
    updateTask: builder.mutation<
      Task,
      { description: string; updates: Partial<Task> }
    >({
      query: ({ description, updates }) => {
        // Encode la descripción para manejar espacios y caracteres especiales
        const encodedDescription = encodeURIComponent(description);

        console.log('URL construida:', `tasks/editTasks/${encodedDescription}`);
        console.log('Body enviado:', updates);

        return {
          url: `tasks/editTasks/${encodedDescription}`,
          method: 'PUT',
          body: updates,
        };
      },
    }),
    // DELETE a task
    deleteTask: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `tasks/deleteTask/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTaskByIdQuery,
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useCreateTaskMutation,
} = taskApi;

/* query: (userName) => {
        console.log('User enviado:', userName);
        return {
          url: `tasks/getAllTasks?userName=${userName || ''}`,
          method: 'GET',
        };
      }, */
