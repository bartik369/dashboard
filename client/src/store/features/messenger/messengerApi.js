import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../../env.config";

export const messengerApi = createApi({
    reducerPath: "messengerApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
    tagTypes: ["Conversations", "Messages"],
    endpoints: (builder) => ({

        // get Conversations
        getParticipants: builder.query({
            query: (id) => ({
                url: `/api/participants/${id}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'Chats', id })),
                    { type: 'Chats', id: 'LIST' },
                ] : [{ type: 'Chats', id: 'LIST' }],

        }),
        // get Conversations
        getConversations: builder.query({
            query: (id) => ({
                url: `/api/conversations/${id}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'Chats', id })),
                    { type: 'Chats', id: 'LIST' },
                ] : [{ type: 'Chats', id: 'LIST' }],

        }),

        // get Conversation
        getConversation: builder.mutation({
            query: (body) => ({
                url: `/api/conversation/`,
                method: "POST",
                body: {...body }
            }),
            invalidatesTags: [{ type: 'Messages', id: 'LIST' }, { type: 'Chats', id: 'LIST' }],
        }),

        // get Active Conversation
        getActiveConversation: builder.query({
            query: (id) => ({
                url: `/api/active-conversation/${id}`,
                method: "GET",

            }),
            // invalidatesTags: [{ type: 'Messages', id: 'LIST' }, { type: 'Chats', id: 'LIST' }],
        }),

        // create Conversation
        createConversation: builder.mutation({
            query: (body) => ({
                url: "/api/new-conversation",
                method: "POST",
                body: {...body },
            }),
            invalidatesTags: [{ type: 'Conversations', id: 'LIST' }],
        }),

        // delete Conversation
        deleteConversation: builder.mutation({
            query: (body) => ({
                url: `/api/conversation`,
                method: "DELETE",
                body: {...body },
            }),
            invalidatesTags: [{ type: ['Conversations'], id: 'LIST' }],
        }),

        setActiveConversation: builder.mutation({
            query: (body) => ({
                url: "/api/set-active",
                method: "POST",
                body: body,
            }),
            invalidatesTags: [{ type: ['Conversations'], id: 'LIST' }],
        }),

        //get message
        getMessage: builder.mutation({
            query: () => ({
                url: "",
                method: "",
            }),
            invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
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
            invalidatesTags: [{ type: ['Messages'], id: 'LIST' }],
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
            invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
        }),

        // update message
        updateMessage: builder.mutation({
            query: () => ({
                url: "",
                method: "",
            }),
            invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
        }),

        markMessage: builder.mutation({
            query: (body) => ({
                url: "/api/mark-message/",
                method: "POST",
                body: body,
            }),
            invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
        }),
    }),
});

export const {
    useCreateConversationMutation,
    useGetParticipantsQuery,
    useGetConversationsQuery,
    useGetActiveConversationQuery,
    useGetConversationMutation,
    useSetActiveConversationMutation,
    useAddMessageMutation,
    useGetMessagesQuery,
    useDeleteConversationMutation,
    useMarkMessageMutation,
} = messengerApi;