import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../../env.config";

export const deviceApi = createApi({
    reducerPath: "deviceApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
    tagTypes: ['Devices'],
    endpoints: (builder) => ({

        // get devices
        getDevices: builder.query({
            query: (urlParams) => ({
                url: urlParams,
                method: "GET",
            }),
            providesTags: (result) =>
                // is result available?
                result ? // successful query
                [
                    ...result.map(({ id }) => ({ type: 'Devices', id })),
                    { type: 'Devices', id: 'LIST' },
                ] : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'Devices', id: 'LIST' }],
        }),

        getBasicDevices: builder.query({
            query: () => ({
                url: "/api/basic-devices",
                method: "GET",
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
            }),
            invalidatesTags: [{ type: 'Devices', id: 'LIST' }],
        }),

        //delete device
        deleteDevice: builder.mutation({
            query: (id) => ({
                url: `/api/device/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Devices', id: 'LIST' }],
        }),

        // //update device
        updateDevice: builder.mutation({
            query: ({ _id, ...body }) => ({
                url: `/api/device/${_id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: [{ type: 'Devices', id: 'LIST' }],
        }),
    }),
});

export const {
    useAddDeviceMutation,
    useDeleteDeviceMutation,
    useUpdateDeviceMutation,
    useGetDeviceQuery,
    useGetDevicesQuery,
    useGetBasicDevicesQuery,
} = deviceApi;