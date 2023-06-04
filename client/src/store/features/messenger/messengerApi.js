import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../../env.config";

export const messengerApi = createApi({
    reducerPath: "messengerApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
    tagTypes: ["Chats", "Messages"],
    endpoints: (builder) => ({

        // get chats
        getChats: builder.query({
            query: (email) => ({
                url: `/api/chats/${email}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'Chats', id })),
                    { type: 'Chats', id: 'LIST' },
                ] : [{ type: 'Chats', id: 'LIST' }],
        }),

        // get chat
        getChat: builder.mutation({
            query: (body) => ({
                url: `/api/chat/`,
                method: "POST",
                body: {...body }
            }),
        }),

        // create chat
        createChat: builder.mutation({
            query: (body) => ({
                url: "/api/create-chat",
                method: "POST",
                body: {...body },
            }),
            invalidatesTags: [{ type: 'Chats', id: 'LIST' }],
        }),

        // delete chat
        deleteChat: builder.query({
            query: () => ({
                url: "",
                method: "",
            }),
        }),

        //get message
        getMessage: builder.mutation({
            query: () => ({
                url: "",
                method: "",
            }),
        }),

        //get messages
        getMessages: builder.query({
            query: (id) => ({
                url: `/api/messages/${id}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'Messages', id })),
                    { type: 'Messages', id: 'LIST' },
                ] : [{ type: 'Messages', id: 'LIST' }],
        }),


        //add message
        addMessage: builder.mutation({
            query: (body) => ({
                url: "/api/add-message",
                method: "POST",
                body: body,
            }),
            invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
        }),

        // delete message
        deleteMessage: builder.mutation({
            query: () => ({
                url: "",
                method: "",
            }),
        }),

        // update message
        updateMessage: builder.mutation({
            query: () => ({
                url: "",
                method: "",
            }),
        }),
    }),
});

export const {
    useCreateChatMutation,
    useGetChatsQuery,
    useGetChatMutation,
    useAddMessageMutation,
    useGetMessagesQuery,
} = messengerApi;