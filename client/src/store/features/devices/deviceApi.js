import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../../env.config";

export const deviceApi = createApi({
  reducerPath: "deviceApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${ENV.HOSTNAME}` }),
  tagTypes: ['Devices'],
  endpoints: (builder) => ({
    // get devices
    getDevices: builder.query({
      query: () => ({
        url: "/api/devices",
        method: "GET",
        providesTags: ['Devices'],
      }),
    }),

    // get device
    getDevice: builder.query({
      query: (id) => ({
        url: `/api/device/${id}`,
        method: "GET",
        providesTags: ['Devices'],
      }),
    }),

    // add device
    addDevice: builder.mutation({
      query: (device) => ({
        url: "/api/add",
        method: "POST",
        body: device,
        providesTags: ['Devices'],
      }),
    }),

    //delete device
    deleteDevice: builder.mutation({
      query: (id) => ({
        url: `/api/device/${id}`,
        method: "DELETE",
        providesTags: ['Devices'],
      }),
    }),

    // //update device
    updateDevice: builder.mutation({
      query: ({ id, todo }) => ({
        url: `/api/device/${id}`,
        method: "PUT",
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
