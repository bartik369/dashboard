import messengerService from "../services/messenger-service.js"

class MessengerController {

    async getChats(req, res, next) {
        try {
            const email = req.params.email
            const chatsData = await messengerService.getChats(email);
            const recipients = []
            chatsData.map((item) => {
                item.participants.filter((recipient) => {

                    if (recipient !== email) {
                        recipients.push(recipient)
                    }
                });
            })
            return res.json(recipients)

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
            console.log(req.body)
            const { id, senderName, senderEmail, content } = req.body;
            const messageData = await messengerService.addMessage(id, senderName, senderEmail, content);

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