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
        getChat: builder.mutation({
            query: (body) => ({
                url: `/api/chat/`,
                method: "POST",
                body: {...body }
            }),
        }),

        // get chats
        getChats: builder.query({
            query: (email) => ({
                url: `/api/chats/${email}`,
                method: "GET",
            }),
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
        }),

        //add message
        addMessage: builder.mutation({
            query: (body) => ({
                url: "/api/add-message",
                method: "POST",
                body: {...body },
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

export const {
    useCreateChatMutation,
    useGetChatsQuery,
    useGetChatMutation,
    useAddMessageMutation,
    useGetMessagesQuery,
} = messengerApi;