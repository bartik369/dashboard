import ConversationModel from "../models/messenger/conversation-model.js";
import MessageModel from "../models/messenger/messages-model.js"

class MessengerService {
    async getChats(email) {
        try {
            const chats = await ConversationModel.find({
                participants: { $all: email }
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
                return null
            }
            const newChat = await new ConversationModel({
                participants: [sender, recipient]
            })
            await newChat.save()
            return newChat

        } catch (error) {

        }
    }
    async deleteChat() {
        try {

        } catch (error) {

        }
    }
    async getMessages() {
        try {

        } catch (error) {

        }
    }
    async getMessage() {
        try {

        } catch (error) {


        }
    }
    async addMessage(id, senderName, senderEmail, content) {
        try {
            const message = new MessageModel({
                senderName: senderName,
                senderEmail: senderEmail,
                content: content,
                converstationId: id,
            })
            await message.save()

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
}

export default new MessengerService();