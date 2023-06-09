import ConversationModel from "../models/messenger/conversation-model.js";
import MessageModel from "../models/messenger/messages-model.js"
import UserModel from "../models/users/user-model.js"

class MessengerService {
    async getChats(email) {
        try {
            const chats = await ConversationModel.find({
                // participants: { $all: email }
                visible: { $all: email }
            })

            if (!chats) {
                return null
            }
            return chats
        } catch (error) {

        }
    }
    async getChat(emailFrom, emailTo) {
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
    async createChat(sender, recipient) {
        try {
            const chat = await ConversationModel.findOne({
                participants: { $all: [sender, recipient] }
            })

            if (chat) {
                const disableVisible = await ConversationModel.findByIdAndUpdate(chat._id, {
                    $push: { visible: sender }
                })
                return disableVisible
            } else {
                const newChat = await new ConversationModel({
                    participants: [sender, recipient],
                    visible: [sender, recipient],
                });
                await newChat.save()
                return newChat
            }

        } catch (error) {

        }
    }

    async getRecipientsInfo(recipients) {
        try {
            const users = await UserModel.find({
                email: recipients
            })
            return users

        } catch (error) {

        }
    }
    async deleteChat(id, email) {
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
    async addMessage(id, to, senderName, senderEmail, content) {
        try {
            const chat = await ConversationModel.findOne({
                visible: { $all: [to, senderEmail] }
            })

            if (!chat) {
                const addVis = await ConversationModel.findByIdAndUpdate({ _id: id }, {
                    $push: { visible: to }
                })

                if (addVis) {
                    const message = new MessageModel({
                        senderName: senderName,
                        senderEmail: senderEmail,
                        content: content,
                        converstationId: id,
                    })
                    await message.save()
                    return message
                }
            } else {
                const message = new MessageModel({
                    senderName: senderName,
                    senderEmail: senderEmail,
                    content: content,
                    converstationId: id,
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