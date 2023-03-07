import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../env.config";


export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME}),
    endpoints: (builder) => ({
        
        // add todo
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: device,
            })
        }),

        //delete todo
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todo/${id}`,
                method: 'DELETE',
                body: id
            })
        }),

        //update todo
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todo/${id}`,
                method: "PUT",
                body: todo
            })
        }),

        // get todo
        getTodo: builder.query({
            query: (id) => ({
                url: `/todo/${id}`,
                method: 'GET',
                body: id,
            })
        }),

        // get todos
        getTodos: builder.query({
            query: () => ({
                url: '/todos',
                method: 'GET',
            })
        }),
    })
})

export const {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
    useGetTodoQuery,
    useGetTodosQuery,
} = todoApi;