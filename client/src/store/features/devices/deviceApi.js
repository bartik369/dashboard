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
        url: "/devices",
        method: "GET",
        providesTags: ['Devices'],
      }),
    }),

    // get device
    getDevice: builder.query({
      query: (id) => ({
        url: `/device/${id}`,
        method: "GET",
        body: id,
        providesTags: ['Devices'],
      }),
    }),

    // add device
    addDevice: builder.mutation({
      query: (device) => ({
        url: "/devices",
        method: "POST",
        body: device,
        providesTags: ['Devices'],
      }),
    }),

    //delete device
    deleteDevice: builder.mutation({
      query: ({ id }) => ({
        url: `/device/${id}`,
        method: "DELETE",
        body: id,
        providesTags: ['Devices'],
      }),
    }),

    // //update device
    updateDevice: builder.mutation({
      query: ({ id, todo }) => ({
        url: `/device/${id}`,
        method: "PUT",
        body: todo,
        providesTags: ['Devices'],
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
