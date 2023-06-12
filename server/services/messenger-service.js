import ConversationModel from "../models/messenger/conversation.js";
import ParticipantsModel from "../models/messenger/participants.js";
import MessageModel from "../models/messenger/messages.js"
import UserModel from "../models/users/user.js"

class MessengerService {
    async getParticipants(id) {
        try {
            const conversation = await ConversationModel.find({ creatorId: id });

            if (!conversation) {
                return null
            }
            const participants = await ParticipantsModel.find({
                visible: { $all: id }
            })

            if (!participants) {
                return null
            }
            return participants
        } catch (error) {

        }
    }
    async getConversations(id) {
        try {
            const participants = await ParticipantsModel.find({
                visible: { $all: id }
            })

            if (!participants) {
                return null
            }
            const conversationArray = []
            participants.map((item) => {
                conversationArray.push(item.conversationId)
            });
            const conversations = await ConversationModel.find({
                _id: { $in: conversationArray }
            });
            return conversations
        } catch (error) {

        }
    }
    async getConversation(emailFrom, emailTo) {
        try {
            const chatData = await ConversationModel.findOne({
                participants: { $all: [emailFrom, emailTo] }
            })

            if (!chatData) {
                return null
            }
            return chatData._id

        } catch (error) {

        }
    }
    async createConversation(creatorId, recipientId) {
        try {
            const participants = await ParticipantsModel.findOne({
                participants: { $all: [creatorId, recipientId] }
            })

            if (participants) {
                const disableVisible = await ParticipantsModel.findByIdAndUpdate(chat._id, {
                    $push: { visible: sender }
                })
                return disableVisible
            } else {
                const newConversation = await new ConversationModel({
                    creatorId: creatorId,
                })
                await newConversation.save()
                const participants = await ParticipantsModel({
                    participants: [creatorId, recipientId],
                    visible: [creatorId, recipientId],
                    conversationId: newConversation._id
                })
                await participants.save()
            }

        } catch (error) {

        }
    }

    async getRecipientsInfo(recipients) {
        try {
            const users = await UserModel.find({
                _id: recipients
            })
            return users

        } catch (error) {

        }
    }
    async getConversationStatus(email) {
        try {


        } catch (error) {

        }
    }

    async setActiveConversation(conversationId) {
        try {
            const chat = await ConversationModel.findOneAndUpdate({ conversationId }, {
                active: true,
            });

            await chat.save()
            return chat

        } catch (error) {

        }
    }

    async deleteConversation(id, email) {
        try {
            const existChat = await ConversationModel.findById(id)

            if (!existChat) {
                return null
            } else if (existChat.visible.length > 1) {
                const disableVisible = await ConversationModel.findByIdAndUpdate(id, {
                    $pull: { visible: email }
                })
                return disableVisible
            } else if (existChat.visible.length === 1) {
                const chat = await ConversationModel.findByIdAndDelete(id)
                const messages = await MessageModel.deleteMany({ converstationId: id })
                return (chat, messages)
            }


            // const chat = await ConversationModel.findByIdAndDelete(id)
            // const messages = await MessageModel.deleteMany({ converstationId: id })
            // return (chat, messages)
        } catch (error) {

        }
    }
    async getMessages(id) {
        try {
            const messages = await MessageModel.find({ converstationId: id })
            return messages

        } catch (error) {

        }
    }
    async getMessage() {
        try {

        } catch (error) {


        }
    }
    async addMessage(conversationId, senderId, recipientId, content) {
        try {
            const participants = await ParticipantsModel.findOne({
                visible: { $all: [recipientId, senderId] }
            })

            if (!participants) {
                const addVis = await ParticipantsModel.findByIdAndUpdate({ conversationId: conversationId }, {
                    $push: { visible: recipientId }
                })

                if (addVis) {
                    const message = new MessageModel({
                        conversationId: conversationId,
                        senderId: senderId,
                        content: content,
                    })
                    await message.save()
                    return message
                }
            } else {
                const message = new MessageModel({
                    conversationId: conversationId,
                    senderId: senderId,
                    content: content,
                })
                await message.save()
                return message
            }


        } catch (error) {

        }
    }
    async deleteMessage() {
        try {

        } catch (error) {

        }
    }
    async updateMessage() {
        try {

        } catch (error) {

        }
    }
    async markMessage(conversationId, emailFrom) {
        try {
            const messages = MessageModel.updateMany({
                $and: [
                    { conversationId: conversationId },
                    { senderEmail: emailFrom },
                ]
            }, { read: true })

            if (!messages) {
                return null
            }
        } catch (error) {

        }
    }
}

export default new MessengerService();