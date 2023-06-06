export default class UserDto {
    profilePictureUrl
    displayname;
    email;
    id;
    isActivated;
    roles;

    constructor(model) {
        this.profilePictureUrl = model.profilePictureUrl,
            this.displayname = model.displayname;
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.roles = model.roles;
    }
};