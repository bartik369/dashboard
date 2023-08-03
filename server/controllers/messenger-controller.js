import messengerService from "../services/messenger-service.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import fs from "fs";

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
            const folderName = `../server/media/messenger/${newChatData}`;
            try {

                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName);
                }
            } catch (error) {

            }
            return res.json(newChatData);
        } catch (error) {}
    }

    async deleteConversation(req, res, next) {
        try {
            const { conversationId, initiatorEmail } = req.body;
            const participantsData = await messengerService.deleteConversation(conversationId, initiatorEmail);

            if (participantsData.deletedMediaFolder) {
                let folderName = `../server/media/messenger/${participantsData.deletedMediaFolder}`;
                fs.rmSync(folderName, { recursive: true, force: true }, (err) => {
                    if (err) {
                        return console.log("error occurred in deleting directory", err);
                    }
                });
            }
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

    async getMessagesMedia(req, res, next) {
        try {
            const accessToken = req.cookies.accessToken;
            const id = req.params.id;
            const mediaData = await messengerService.getMessagesMedia(id);
            return res.json(mediaData);
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
    async getUnredMessages(req, res, next) {
        try {
            const id = req.params.id
            console.log(id)
            const unreadMessagesData = await messengerService.getUnreadMessages(id)
            return res.json(unreadMessagesData)
        } catch (error) {

        }
    }


    async addMessage(req, res, next) {
        try {
            const { conversationId, senderId, recipientId, content, replyTo } = req.body;
            const media = req.file
            const messageData = await messengerService.addMessage(
                conversationId,
                senderId,
                recipientId,
                content,
                replyTo,
                media,
            )
            return res.json(messageData)
        } catch (error) {}
    }

    async updateMessage(req, res, next) {
        try {
            const { id, content } = req.body;
            const media = req.file
            console.log(media)
            console.log(content)
            const messageData = await messengerService.updateMessage(id, content, media)
            return res.json(messageData)
        } catch (error) {

        }
    }


    async deleteMessage(req, res, next) {
        try {
            const id = req.params.id
            const messageData = await messengerService.deleteMessage(id)
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




// let media = req.file.filename

// if (file) 
//     const uploadPath = '../client/public/media/' + file.name
//     let newName = uuidv4() + '.png'
//     media = newName
//     file.mv(uploadPath, function(err) {

//         if (err) {
//             console.log("something went wrong")
//             return res.status(500).send(err);
//         } else {
//             fs.rename(`../client/public/media/${file.name}`,
//                 `../client/public/media/${media}`, () => {
//                     console.log("File uploaded and renamed")
//                 });
//         }
//     })
// } else {

// }