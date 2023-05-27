import ConversationModel from "../models/messenger/conversation-model.js";

class MessengerService {
    async getChats() {
        try {

        } catch (error) {

        }
    }
    async getChat() {
        try {

        } catch (error) {

        }
    }
    async createChat(sender, recipient) {
        try {
            const chat = await ConversationModel.findOne({
                participants: { $all: [sender, recipient] }
            })

            if (chat) {
                return "uje est  chat"
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
    async addMessage() {
        try {

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