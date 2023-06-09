export default class ChatDto {
    profilePictureUrl
    displayname;
    email;
    id;
    chatInfo;


    constructor(model) {
        this.profilePictureUrl = model.profilePictureUrl,
            this.displayname = model.displayname;
        this.email = model.email;
        this.id = model._id;
        this.chatInfo = model.chatInfo;
    }
};