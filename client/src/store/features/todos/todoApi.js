import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../../env.config";

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({

        // get todos
        getTodos: builder.query({
            query: () => ({
                url: "/api/todos",
                method: "GET",
            }),
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'Todos', id })),
                    { type: 'Todos', id: 'LIST' },
                ] : [{ type: 'Todos', id: 'LIST' }],
        }),

        // get todo
        getTodo: builder.mutation({
            query: (body) => ({
                url: `/api/todo/`,
                method: "POST",
                body: {...body }
            }),
            providesTags: (result, error, id) => [{ type: 'Todos', id }],
        }),

        // add todo
        addTodo: builder.mutation({
            query: (todo) => ({
                url: "/api/newtodo",
                method: "POST",
                body: todo,
            }),
            invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
        }),

        //delete todo
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/api/todo/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
        }),

        //update todo
        updateTodo: builder.mutation({
            query: ({ _id, ...body }) => ({
                url: `/api/todo/${_id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
        }),
    }),
});

export const {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
    useGetTodoMutation,
    useGetTodosQuery,
} = todoApi;