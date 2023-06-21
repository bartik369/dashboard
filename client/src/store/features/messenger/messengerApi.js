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
                    result.map(({ id }) => ({ type: 'Conversations', id })),
                    { type: 'Conversations', id: 'LIST' },
                ] : [{ type: 'Conversations', id: 'LIST' }],

        }),
        // get Conversations
        getConversations: builder.query({
            query: (id) => ({
                url: `/api/conversations/${id}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ? [
                    result.map(({ id }) => ({ type: 'Conversations', id })),
                    { type: 'Conversations', id: 'LIST' },
                ] : [{ type: 'Conversations', id: 'LIST' }],

        }),

        // get Conversation
        getConversation: builder.mutation({
            query: (body) => ({
                url: `/api/conversation/`,
                method: "POST",
                body: {...body }
            }),
            invalidatesTags: [{ type: 'Conversations', id: 'LIST' }],
        }),

        // get Active Conversation
        getActiveConversationUser: builder.query({
            query: (id) => ({
                url: `/api/active-conversation/${id}`,
                method: "GET",

            }),
            invalidatesTags: [{ type: 'Conversations', id: 'LIST' }],
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

        //get message
        getMessage: builder.query({
            query: (id) => ({
                url: `/api/message/${id}`,
                method: "GET",
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
                    result.map(({ id }) => ({ type: 'Messages', id })),
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
            query: (id) => ({
                url: `/api/message/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
        }),

        // update message
        updateMessage: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/api/message/${id}`,
                method: "PUT",
                body: body,
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
    useGetActiveConversationUserQuery,
    useGetConversationMutation,
    useAddMessageMutation,
    useGetMessagesQuery,
    useUpdateMessageMutation,
    useDeleteConversationMutation,
    useMarkMessageMutation,
    useDeleteMessageMutation,
    useGetMessageQuery,
} = messengerApi;