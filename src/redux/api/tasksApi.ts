import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


type Task = {
    _id: number
    description:string
    date: string
}

export const taskApi = createApi({
    reducerPath:'createApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BACKEND
    }),
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], null>({
            query: () => 'tasks/getAllTasks'
        }),
        getTaskById: builder.query<Task, {id:string}>({
            query: ({id}) => `tasks/getTask/${id}`
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
        updateTask: builder.mutation<Task, Partial<Task> & { id: number }>({
            query: ({ id, ...updatedTask }) => ({
                url: `tasks/editTasks/${id}`,
                method: 'PUT',
                body: updatedTask,
            }),
        }),
        // DELETE a task
        deleteTask: builder.mutation<void, { id: number }>({
            query: ({ id }) => ({
                url: `tasks/deleteTask/${id}`,
                method: 'DELETE',
            }),
        }),
})
});

export const {useGetTaskByIdQuery, useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation, useCreateTaskMutation } = taskApi
