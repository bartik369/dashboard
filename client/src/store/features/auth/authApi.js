import { apiSlice } from "../../api/apiSlice";


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/singup",
                method: "POST",
                body: {...credentials },
            })
        }),
    })
});