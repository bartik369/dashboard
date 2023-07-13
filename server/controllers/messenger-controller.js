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

            const participantsData = await messengerService.getRecipientsInfo(recipients);
            const newData = []



            // var a1 = [6,3,5,1,2];
            // var a2 = [1,2,4];
            // var result = [];

            // a2.forEach(function(item) {
            //     var index = a1.indexOf(item);
            //     if (index !== -1) {
            //         result.push(index);
            //     }
            // });


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

    async getConversatios(req, res, next) {
        try {
            const id = req.params.id;
            const conversationsData = await messengerService.getConversations(id);
            return res.json(conversationsData);
        } catch (error) {}
    }

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
            const newChatData = await messengerService.createConversation(
                creatorId,
                recipientId
            );
            return res.json(newChatData);
        } catch (error) {}
    }

    async deleteConversation(req, res, next) {
        try {
            const { conversationId, initiatorEmail } = req.body;
            const participantsData = await messengerService.deleteConversation(conversationId, initiatorEmail);
            if (!participantsData) {}
            return res.json(participantsData);
        } catch (error) {}
    }
    async getMessages(req, res, next) {
        try {
            const id = req.params.id;
            const dataMessages = await messengerService.getMessages(id);
            return res.json(dataMessages);
        } catch (error) {}
    }

    async getMessage(req, res, next) {
        try {
            const { id } = req.body;
            const messageData = await messengerService.getMessage(id);
            return res.json(messageData)
        } catch (error) {

        }
    }

    async getLastMessages(req, res, next) {
        try {
            const { id } = req.body;
            const lastMessagesData = await messengerService.getLastMessages(id)
            return res.json(lastMessagesData)
        } catch (error) {

        }
    }

    async addMessage(req, res, next) {
        try {
            const { conversationId, senderId, recipientId, content } = req.body;
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
        try {
            const id = req.params.id
            const messageData = await messengerService.deleteMessage(id)
            return res.json(messageData)

        } catch (error) {

        }
    }

    async updateMessage(req, res, next) {
        try {
            const id = req.params.id;
            const { content } = req.body;
            const messageData = await messengerService.updateMessage(id, content)
            return res.json(messageData)
        } catch (error) {

        }
    }

    async markMessage(req, res, next) {
        try {
            const { creatorId, recipientId } = req.body;
            const messageData = await messengerService.markMessage(creatorId, recipientId);

            if (!messageData) {}
            return res.json(messageData);
        } catch (error) {}
    }
}

export default new MessengerController();