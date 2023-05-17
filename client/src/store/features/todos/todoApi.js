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
                url: "api/todos",
                method: "GET",
            }),
            providesTags: (result) =>
                // is result available?
                result ? // successful query
                [
                    ...result.map(({ id }) => ({ type: 'Todos', id })),
                    { type: 'Todos', id: 'LIST' },
                ] : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'Todos', id: 'LIST' }],
        }),

        // get todo
        getTodo: builder.query({
            query: (id) => ({
                url: `/api/todo/${id}`,
                method: "GET",
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
                url: `/todo/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
        }),

        //update todo
        updateTodo: builder.mutation({
            query: ({ _id, ...body }) => ({
                url: `/todo/${_id}`,
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
    useGetTodoQuery,
    useGetTodosQuery,
} = todoApi;