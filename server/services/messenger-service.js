import ConversationModel from "../models/messenger/conversation.js";
import ParticipantsModel from "../models/messenger/participants.js";
import MessageModel from "../models/messenger/messages.js";
import SocketModel from "../models/messenger/call.js"
import ConversationMediaModel from "../models/messenger/conversation-media.js";
import UserModel from "../models/users/user.js";
import ProfileModel from "../models/users/profile.js"

class MessengerService {
    async getParticipants(id) {
        try {
            const conversation = await ConversationModel.find({ creatorId: id });

            if (!conversation) {
                return null;
            }
            const participants = await ParticipantsModel.find({
                visible: { $all: id },
            });

            if (!participants) {
                return null;
            }
            return participants;
        } catch (error) {}
    }
    async getConversations(id) {
        try {
            const participants = await ParticipantsModel.find({
                visible: { $all: id },
            });

            if (!participants) {
                return null;
            }
            const conversationArray = [];
            participants.map((item) => {
                conversationArray.push(item.conversationId);
            });
            const conversations = await ConversationModel.find({
                _id: { $in: conversationArray },
            });
            return conversations;
        } catch (error) {}
    }

    async getActiveConversation(id) {
        try {
            const participants = await ParticipantsModel.find({
                visible: { $all: id },
            });
            const conversationsArray = [];
            participants.map((item) => {
                conversationsArray.push(item.conversationId);
            });
            const activeConverstation = await ConversationModel.findOne({
                _id: { $in: conversationsArray },
            }).sort({ updatedAt: -1 });

            const contacts = await ParticipantsModel.findOne({
                conversationId: activeConverstation._id,
            });

            return contacts;
        } catch (error) {}
    }

    async getConversation(creatorId, recipientId) {
        try {
            const participantsData = await ParticipantsModel.findOne({
                participants: { $all: [creatorId, recipientId] },
            });
            const converstationData = await ConversationModel.findByIdAndUpdate({
                _id: participantsData.conversationId,
            }, { updatedAt: new Date() });
            await converstationData.save();

            return participantsData;
        } catch (error) {}
    }

    async createConversation(creatorId, recipientId) {
        try {
            const participants = await ParticipantsModel.findOne({
                participants: { $all: [creatorId, recipientId] },
            });

            if (participants && participants.visible.length > 1) {
                return null
            } else if (participants && participants.visible.length < 2) {
                const enableVisible = await ParticipantsModel.findByIdAndUpdate(
                    participants._id, {
                        $push: { visible: creatorId },
                    }
                );
                return enableVisible;
            } else {
                const newConversation = await new ConversationModel({
                    creatorId: creatorId,
                });
                await newConversation.save();
                const participants = await new ParticipantsModel({
                    participants: [creatorId, recipientId],
                    visible: [creatorId, recipientId],
                    conversationId: newConversation._id,
                });
                await participants.save();
                return participants.conversationId;
            }
        } catch (error) {}
    }

    async getRecipientsInfo(recipients) {
        try {
            const users = await ProfileModel.find({ userId: recipients });
            return users;
        } catch (error) {}
    }

    async deleteConversation(conversationId, initiatorEmail) {
        try {
            const conversation = await ConversationModel.findOne({ _id: conversationId });

            if (!conversation) {
                return null
            }
            const user = await UserModel.findOne({ email: initiatorEmail });

            if (!user) {
                return null;
            }
            const participants = await ParticipantsModel.findOne({
                conversationId: conversationId,
            });

            if (!participants) {
                return null;

            } else if (participants.visible.length > 1) {
                const disableVisible = await ParticipantsModel.findByIdAndUpdate(
                    participants._id, {
                        $pull: { visible: user.id },
                    }
                );
                await disableVisible.save();

            } else if (participants.visible.length === 1) {
                await MessageModel.deleteMany({ conversationId: conversation._id });
                await ParticipantsModel.deleteOne({ conversationId: conversation._id })
                await ConversationMediaModel.deleteMany({ conversationId: conversation._id })
                const conversationData = await ConversationModel.findByIdAndDelete(conversation._id)
                return { deletedMediaFolder: conversationData._id };
            }
        } catch (error) {}
    }
    async setSocket(userId, socket) {
        try {
            const existSocket = await SocketModel.findOne({ userId: userId })

            if (existSocket) {
                let socketData = await SocketModel.findOneAndUpdate({ userId: userId }, {
                    socket: socket
                })
                await socketData.save()
                return socketData
            } else {
                let newSocket = await new SocketModel({
                    userId: userId,
                    socket: socket,
                })
                await newSocket.save()
                return newSocket
            }
        } catch (error) {}
    }
    async getSocket() {
        try {

        } catch (error) {}
    }

    async getMessages(id) {
        try {
            const messages = await MessageModel.find({ conversationId: id });
            return messages;
        } catch (error) {}
    }
    async getMessagesMedia(id) {
        try {
            const mediaData = await ConversationMediaModel.find({ conversationId: id })
            return mediaData

        } catch (error) {}
    }
    async getUnreadMessages(id) {
        try {
            const messagesData = await MessageModel.find({ recipientId: id })
            const unreadArray = []
            messagesData.map((item) => {
                if (!item.read) {
                    unreadArray.push(item)
                }
            })
            return unreadArray
        } catch (error) {}
    }

    async getLastMessages(id) {
        try {
            const user = await UserModel.findById(id)

            if (!user) {
                return null
            }
            const conversationsData = await ParticipantsModel.find({
                visible: { $all: user.id },
            });
            const idInfo = []
            conversationsData.map((item) => {
                idInfo.push(item.conversationId)
            })
            const lastMessagesData = await MessageModel.aggregate([{
                    $match: { "conversationId": { $in: idInfo } }
                },
                {
                    "$project": {
                        conversationId: 1,
                        content: { $substr: ["$content", 0, 47] },
                        createdAt: 1,
                        updatedAt: 1,
                        senderId: 1,
                        recipientId: 1,
                        read: 1,
                    }
                },
                // intro: { $substr: [ "$fullText", 0, 100 ] },
                // {
                //     $unwind: "$conversationId"
                // },
                {
                    $sort: {
                        "conversationId": 1
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        "conversationId": { $push: "$conversationId" },
                        "content": {
                            "$first": "$content"
                        },
                        "createdAt": {
                            "$first": "$createdAt"
                        },
                        "updatedAt": {
                            "$first": "$createdAt"
                        },
                        "senderId": {
                            "$first": "$senderId"
                        },
                        "recipientId": {
                            "$first": "$recipientId"
                        },
                        "read": {
                            "$first": "$read"
                        },
                    }
                },
                {
                    "$sort": {
                        "updatedAt": -1
                    }
                },
                {
                    "$group": {
                        "_id": "$conversationId",
                        "content": {
                            "$first": "$content"
                        },
                        "createdAt": {
                            "$first": "$createdAt"
                        },
                        "updatedAt": {
                            "$first": "$createdAt"
                        },
                        "senderId": {
                            "$first": "$senderId"
                        },
                        "recipientId": {
                            "$first": "$recipientId"
                        },
                        "read": {
                            "$first": "$read"
                        },
                    }
                }
            ])
            return lastMessagesData
        } catch (error) {}
    }

    async getMessage(id) {
        try {
            const message = await MessageModel.findById(id);

            if (!message) {
                return null
            }
            return message
        } catch (error) {}
    }

    async addMessage(conversationId, senderId, recipientId, content, replyTo, media) {
        try {
            if (media) {
                const mediaInfo = await new ConversationMediaModel({
                    userId: senderId,
                    conversationId: conversationId,
                    file: media.filename
                });
                await mediaInfo.save()

                const participants = await ParticipantsModel.findOne({
                    visible: { $all: [recipientId, senderId] },
                })

                if (!participants) {
                    const makeVisible = await ParticipantsModel.findOneAndUpdate({
                        conversationId: conversationId
                    }, {
                        $push: { visible: recipientId },
                    });

                    if (makeVisible) {
                        const message = new MessageModel({
                            conversationId: conversationId,
                            senderId: senderId,
                            recipientId: recipientId,
                            content: content,
                            mediaId: mediaInfo._id,
                            replyTo: replyTo,

                        });
                        await message.save();
                        return message;
                    }
                } else {
                    const message = new MessageModel({
                        conversationId: participants.conversationId,
                        senderId: senderId,
                        recipientId: recipientId,
                        content: content,
                        mediaId: mediaInfo._id,
                        replyTo: replyTo,
                    });
                    await message.save()
                    return message
                }

            } else if (!media) {
                const participants = await ParticipantsModel.findOne({
                    visible: { $all: [recipientId, senderId] },
                })

                if (!participants) {
                    const makeVisible = await ParticipantsModel.findOneAndUpdate({
                        conversationId: conversationId
                    }, {
                        $push: { visible: recipientId },
                    });

                    if (makeVisible) {
                        const message = new MessageModel({
                            conversationId: conversationId,
                            senderId: senderId,
                            recipientId: recipientId,
                            content: content,
                            replyTo: replyTo,

                        });
                        await message.save();
                        return message;
                    }
                } else {
                    const message = new MessageModel({
                        conversationId: participants.conversationId,
                        senderId: senderId,
                        recipientId: recipientId,
                        content: content,
                        replyTo: replyTo,

                    });
                    await message.save();
                    return message;
                }
            }


        } catch (error) {}
    }
    async deleteMessage(id) {
        try {
            const message = await MessageModel.findByIdAndDelete(id)

            if (!message) {
                return null
            }
            return message
        } catch (error) {

        }
    }
    async updateMessage(id, content) {
        try {
            const message = await MessageModel.findByIdAndUpdate(id, {
                content: content,
                updatedAt: new Date(),
            });

            if (!message) { return null }
            await message.save()
            return message
        } catch (error) {

        }
    }
    async markMessage(creatorId, recipientId) {
        try {
            const participants = await ParticipantsModel.findOne({
                visible: { $all: [creatorId, recipientId] },
            });
            // const messages = await MessageModel.findOneAndUpdate({
            //     conversationId: participants.conversationId
            // }, { read: true });

            const messages = await MessageModel.updateMany({
                $and: [
                    { conversationId: participants.conversationId },
                    { senderId: recipientId },
                ],
            }, { read: true });
            await messages.save();

            // if (!messages) {
            //     return null
            // }
            return conversation;
        } catch (error) {}
    }
}

export default new MessengerService();