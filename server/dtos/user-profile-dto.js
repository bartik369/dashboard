export default class ProfileInfoDto {
    description;
    city;
    birthday;
    phone;
    work;

    constructor(model) {
        this.description = model.description;
        this.city = model.city;
        this.birthday = model.birthday;
        this.phone = model.phone;
        this.work = model.work;
    }
}