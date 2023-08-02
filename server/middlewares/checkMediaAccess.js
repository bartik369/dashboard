import TokenModel from "../models/users/token.js"
import ParticipantsModel from "../models/messenger/participants.js";

export default async function(req, res, next) {

    const conversationId = req.url.split('/')[1];
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        const userData = await TokenModel.findOne({ refreshToken: refreshToken });
        const conversationsList = await ParticipantsModel.find({
            visible: userData.user.toString()
        });
        const conversationsArray = []
        conversationsList.map((item) => {
            conversationsArray.push(item.conversationId)
        });

        if (conversationsArray.includes(conversationId)) {
            next()
        } else {
            res.redirect(`${process.env.CLIENT_URL}`);
        }
    } else {
        res.redirect(`${process.env.CLIENT_URL}`);
    }
};