import ConversationModel from "../models/messenger/conversation.js";
import ParticipantsModel from "../models/messenger/participants.js";
import MessageModel from "../models/messenger/messages.js";
import UserModel from "../models/users/user.js";

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

            if (participants) {
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
            const users = await UserModel.find({
                _id: recipients,
            });
            return users;
        } catch (error) {}
    }

    async deleteConversation(conversationId, initiatorEmail) {
        try {
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

                const deleteConversation = await ConversationModel.deleteOne({
                    converstationId: participants.conversationId,
                });
                const deleteParticipants = await ParticipantsModel.deleteOne({
                    converstationId: participants.conversationId,
                });
                const deleteMessages = await MessageModel.deleteMany({
                    converstationId: conversationId,
                });
                // const conversation = await ConversationModel.findByIdAndDelete(id)
                // const messages = await MessageModel.deleteMany({ converstationId: id })
                return deleteParticipants, deleteConversation, deleteMessages;
            }

            // const chat = await ConversationModel.findByIdAndDelete(id)
            // const messages = await MessageModel.deleteMany({ converstationId: id })
            // return (chat, messages)
        } catch (error) {}
    }
    async getMessages(id) {
        try {
            const messages = await MessageModel.find({ conversationId: id });
            return messages;
        } catch (error) {}
    }
    async getMessage() {
        try {} catch (error) {}
    }
    async addMessage(conversationId, senderId, recipientId, content) {
        try {
            const participants = await ParticipantsModel.findOne({
                visible: { $all: [recipientId, senderId] },
            });

            if (!participants) {
                const addVis = await ParticipantsModel.findOneAndUpdate({
                    conversationId: conversationId
                }, {
                    $push: { visible: recipientId },
                });

                if (addVis) {
                    const message = new MessageModel({
                        conversationId: conversationId,
                        senderId: senderId,
                        content: content,
                    });
                    await message.save();
                    return message;
                }
            } else {
                const message = new MessageModel({
                    conversationId: participants.conversationId,
                    senderId: senderId,
                    content: content,
                });
                await message.save();
                return message;
            }
        } catch (error) {}
    }
    async deleteMessage() {
        try {} catch (error) {}
    }
    async updateMessage() {
        try {} catch (error) {}
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