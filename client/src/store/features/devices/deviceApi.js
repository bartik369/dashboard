import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../../env.config";

export const deviceApi = createApi({
    reducerPath: 'deviceApi',
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME}),
    endpoints: (builder) => ({
        
        // add device
        addDevice: builder.mutation({
            query: (device) => ({
                url: '',
                method: 'POST',
                body: device,
            })
        }),

        //delete device
        deleteDevice: builder.mutation({
            query: ({ id }) => ({
                url: '',
                method: 'DELETE',
                body: id
            })
        }),

        //update device
        updateDevice: builder.mutation({
            query: (todo) => ({
                url: '',
                method: "PUT",
                body: todo
            })
        }),

        // get todo
        getTodo: builder.query({
            query: (id) => ({
                utl: '',
                method: 'GET',
                body: id,
            })
        }),

        // get todos
        getTodos: builder.query({
            query: () => ({
                url: '',
                method: 'GET',
            })
        }),
    })
})

export const {
    useAddDeviceMutation,
    useDeleteDeviceMutation,
    useUpdateDeviceMutation,
    useGetTodoQuery,
    useGetTodosQuery,
} = deviceApi;