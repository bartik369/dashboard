import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../../env.config";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
  endpoints: (builder) => ({

    // get todos
    getTodos: builder.query({
      query: () => ({
        url: "api/todos",
        method: "GET",
      }),
    }),

    // get todo
    getTodo: builder.query({
      query: (id) => ({
        url: `/api/todo/${id}`,
        method: "GET",
      }),
    }),

    // add todo
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/api/todos",
        method: "POST",
        body: todo,
      }),
    }),

    //delete todo
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todo/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),

    //update todo
    updateTodo: builder.mutation({
      query: (id, todo) => ({
        url: `/todo/${id}`,
        method: "PUT",
        body: todo,
      }),
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
