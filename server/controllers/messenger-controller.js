import messengerService from "../services/messenger-service.js";
import userService from "../services/user-service.js"

class MessengerController {

    async getChats(req, res, next) {
        try {
            const email = req.params.email
            console.log(email)
            const chatsData = await messengerService.getChats(email);
            const recipients = []
            chatsData.map((item) => {
                item.participants.filter((recipient) => {

                    if (recipient !== email) {
                        recipients.push(recipient)
                    }
                });
            })
            const usersData = await messengerService.getRecipientsInfo(recipients)
            return res.json(usersData)

        } catch (error) {

        }
    }
    async getChat(req, res, next) {
        try {
            const { emailFrom, emailTo } = req.body;
            const chatData = await messengerService.getChat(emailFrom, emailTo);

            if (!chatData) {
                return null
            }
            return res.json(chatData);
        } catch (error) {

        }
    }
    async createChat(req, res, next) {
        try {
            const { sender, recipient } = req.body;
            const newChatData = await messengerService.createChat(sender, recipient)
            return res.json(newChatData)
        } catch (error) {}
    }
    async deleteChat(req, res, next) {
        try {
            const { id, email } = req.body
            const chatData = await messengerService.deleteChat(id, email);
            console.log(chatData)

            if (!chatData) {

            }
            return res.json(chatData)
        } catch (error) {

        }
    }
    async getMessages(req, res, next) {
        try {
            const id = req.params.id
            const dataMessages = await messengerService.getMessages(id);
            return res.json(dataMessages)

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
            const { id, to, senderName, senderEmail, content } = req.body;
            console.log("message to:", to)
            const messageData = await messengerService.addMessage(id, to, senderName, senderEmail, content);
            console.log("messageData", messageData)
            return res.json(messageData)

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