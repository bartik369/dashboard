import messengerService from "../services/messenger-service.js";
import userService from "../services/user-service.js";

class MessengerController {
    async getParticipants(req, res, next) {
        try {
            const id = req.params.id;
            const conversationData = await messengerService.getParticipants(id);
            const recipients = [];
            conversationData.map((item) => {
                item.participants.filter((recipient) => {
                    if (recipient !== id) {
                        recipients.push(recipient);
                    }
                });
            });
            const participantsData = await messengerService.getRecipientsInfo(
                recipients
            );
            return res.json(participantsData);
        } catch (error) {}
    }

    async getActiveConversation(req, res, next) {
            try {
                const id = req.params.id;
                const conversationsData = await messengerService.getActiveConversation(
                    id
                );
                conversationsData.visible.filter((contact) => {
                    if (contact !== id) {
                        return res.json(contact);
                    }
                });
            } catch (error) {}
        }
        // async setActiveConversation(req, res, next) {
        //     try {
        //         const { creatorId, recipientId } = req.body
        //         const conversationData = await messengerService.setActiveConversation(creatorId, recipientId);
        //         console.log(conversationData)

    //     } catch (error) {}
    // }

    async getConversatios(req, res, next) {
        try {
            const id = req.params.id;
            const conversationsData = await messengerService.getConversations(id);
            return res.json(conversationsData);
        } catch (error) {}
    }

    // async getConversatios(req, res, next) {
    //     try {
    //         const id = req.params.id;
    //         const conversationsData = await messengerService.getConversations(id);
    //         return res.json(conversationsData);
    //     } catch (error) {}
    // }

    async getConversation(req, res, next) {
        try {
            const { creatorId, recipientId } = req.body
            const conversationData = await messengerService.getConversation(
                creatorId,
                recipientId,
            );

            if (!conversationData) {
                return null;
            }
            return res.json(conversationData.conversationId);
        } catch (error) {}
    }

    async createConversation(req, res, next) {
        try {
            const { creatorId, recipientId } = req.body;
            console.log(req.body)
            const newChatData = await messengerService.createConversation(
                creatorId,
                recipientId
            );
            return res.json(newChatData);
        } catch (error) {}
    }

    async deleteConversation(req, res, next) {
        try {
            const { id, email } = req.body;
            const chatData = await messengerService.deleteConversation(id, email);

            if (!chatData) {}
            return res.json(chatData);
        } catch (error) {}
    }
    async getMessages(req, res, next) {
        try {
            const id = req.params.id;
            console.log("id for message", id)
            const dataMessages = await messengerService.getMessages(id);
            console.log(dataMessages)
            return res.json(dataMessages);
        } catch (error) {}
    }

    async getMessage(req, res, next) {
        try {

        } catch (error) {

        }
    }

    async addMessage(req, res, next) {
        try {
            const { conversationId, senderId, recipientId, content } = req.body;
            console.log(req.body);
            const messageData = await messengerService.addMessage(
                conversationId,
                senderId,
                recipientId,
                content
            );
            return res.json(messageData);
        } catch (error) {}
    }

    async deleteMessage(req, res, next) {
        try {} catch (error) {}
    }

    async updateMessage(req, res, next) {
        try {} catch (error) {}
    }

    async markMessage(req, res, next) {
        try {
            const { conversationId, emailFrom } = req.body;
            const messageData = await messengerService.markMessage(
                conversationId,
                emailFrom
            );

            if (!messageData) {}
            return res.json(messageData);
        } catch (error) {}
    }
}

export default new MessengerController();