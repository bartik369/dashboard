import messengerService from "../services/messenger-service.js"

class MessengerController {

    async getChats(req, res, next) {
        try {
            const email = req.params.email
            const chatsData = await messengerService.getChats(email);
            console.log(chatsData)
            return res.json(chatsData)

        } catch (error) {

        }
    }
    async getChat(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async createChat(req, res, next) {
        try {
            const { sender, recipient } = req.body;
            const newChatData = await messengerService.createChat(sender, recipient)
            return res.json(newChatData)
        } catch (error) {

        }
    }
    async deleteChat(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async getMessages(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async getMessage(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async addMessage(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async deleteMessage(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async updateMessage(req, res, next) {
        try {

        } catch (error) {

        }
    }
}


export default new MessengerController()