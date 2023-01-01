export default class UserDto {
    displayname;
    email;
    id;
    roles;
    isActivated;

    constructor(model) {
        this.displayname = model.displayname;
        this.email = model.email;
        this.id = model._id;
        this.roles = model.roles;
        this.isActivated = model.isActivated;
    }
};

