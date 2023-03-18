import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../../env.config";

export const deviceApi = createApi({
    reducerPath: 'deviceApi',
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
    endpoints: (builder) => ({

        // add device
        addDevice: builder.mutation({
            query: (device) => ({
                url: '/devices',
                method: 'POST',
                body: device,
            })
        }),

        //delete device
        deleteDevice: builder.mutation({
            query: ({ id }) => ({
                url: `/device/${id}`,
                method: 'DELETE',
                body: id
            })
        }),

        // //update device
        // updateDevice: builder.mutation({
        //     query: (todo) => ({
        //         url: `/device/${id}`,
        //         method: "PUT",
        //         body: todo
        //     })
        // }),

        // // get device
        // getDevice: builder.query({
        //     query: (id) => ({
        //         url: `/device/${id}`,
        //         method: 'GET',
        //         body: id,
        //     })
        // }),

        // get devices
        getDevices: builder.query({
            query: () => ({
                url: '/devices',
                method: 'GET',
            })
        }),
    })
})

export const {
    useAddDeviceMutation,
    useDeleteDeviceMutation,
    useUpdateDeviceMutation,
    useGetDeviceQuery,
    useGetDevicesQuery,
} = deviceApi;