import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../../env.config";

export const deviceApi = createApi({
    reducerPath: "deviceApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
    tagTypes: ['Devices'],
    endpoints: (builder) => ({

        // get devices
        getDevices: builder.query({
            query: () => ({
                url: "/api/devices",
                method: "GET",
                providesTags: (result) =>
                    result ? [...result.map(({ _id }) => ({ type: 'Devices', _id })), 'Devices'] : ['Devices'],
            }),
        }),

        // get device
        getDevice: builder.query({
            query: (id) => ({
                url: `/api/device/${id}`,
                method: "GET",
                // invalidatesTags: [{ type: 'Devices', id: 'LIST'}]
            }),
        }),

        // add device
        addDevice: builder.mutation({
            query: (device) => ({
                url: "/api/add",
                method: "POST",
                body: device,
                invalidatesTags: [{ type: 'Devices', _id: 'LIST' }]
            }),
        }),

        //delete device
        deleteDevice: builder.mutation({
            query: (id) => ({
                url: `/api/device/${id}`,
                method: "DELETE",
                invalidatesTags: [{ type: 'Devices', _id: 'LIST' }]
            }),
        }),

        // //update device
        updateDevice: builder.mutation({
            query: ({ id, todo }) => ({
                url: `/api/device/${id}`,
                method: "PUT",
                todo,
                invalidatesTags: [{ type: 'Devices', _id: 'LIST' }]
            }),
        }),
    }),
});

export const {
    useAddDeviceMutation,
    useDeleteDeviceMutation,
    useUpdateDeviceMutation,
    useGetDeviceQuery,
    useGetDevicesQuery,
} = deviceApi;