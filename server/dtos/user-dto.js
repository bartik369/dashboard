export default class UserDto {
    profilePictureUrl
    displayname;
    email;
    id;
    roles;

    constructor(model) {
        this.profilePictureUrl = model.profilePictureUrl,
            this.displayname = model.displayname;
        this.email = model.email;
        this.id = model._id;
        this.roles = model.roles;
    }
};