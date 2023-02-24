import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../env.config"

export const devicesApi = createApi({
    reducerPath: "devicesApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
    endpoints: (builder) => ({
        getDevices: builder.query({
            query: () => `devices`,

        })
    })
})

export const { useGetDevicesQuery } = devicesApi;