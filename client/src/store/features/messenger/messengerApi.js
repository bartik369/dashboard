import { apiSlice } from "../../api/apiSlice";

export const messengerApi = apiSlice.injectEndpoints({
    tagTypes: ["Messages"],
    endpoints: (builder) => ({
        // create chat
        createChat: builder.mutation({
            query: (body) => ({
                url: "/api/create-chat",
                method: "POST",
                body: {...body },
            }),
        }),

        // get chat
        getChat: builder.query({
            query: () => ({
                url: "",
                method: "",
            }),
        }),

        // get chats
        getChats: builder.query({
            query: () => ({
                url: "",
                method: "",
            }),
        }),

        // delete chat
        getChat: builder.query({
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
        getMessages: builder.mutation({
            query: () => ({
                url: "",
                method: "",
            }),
        }),

        //add message
        addMessage: builder.mutation({
            query: () => ({
                url: "",
                method: "",
            }),
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

export const { useCreateChatMutation } = messengerApi;