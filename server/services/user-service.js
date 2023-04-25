import UserModel from "../models/user-model.js";
import TokenModel from "../models/todo-model.js"
import ProfilModel from "../models/profile-model.js"
import Roles from "../models/roles-model.js"
import ResetPasswordModel from "../models/reset-password-model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";

class UserService {
    async registration(displayname, email, password, description, city, birthday, phone, work) {
        const candidate = await UserModel.findOne({ email });

        if (candidate) {
            throw ApiError.EmailExist(`Пользователь ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 7);
        const activationLink = uuidv4();
        const userRoles = await Roles.findOne({ value: "User" })

        const user = await UserModel.create({
            displayname,
            email,
            password: hashPassword,
            activationLink,
            roles: [userRoles.value]
        });
        await ProfilModel.create({
            userId: user._id,
            description,
            city,
            birthday,
            phone,
            work,
        })

        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        );

    }


    async login(email, password) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw ApiError.EmailError("Пользователь с таким email не найден");
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);

        if (!isPasswordEquals) {
            throw ApiError.PasswordError("Неверный пароль");
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async checkValidAccess(accessToken) {
        try {
            const userData = tokenService.validateAccessToken(accessToken);

            if (!userData) {
                throw ApiError.UnauthorizedError("you dont have access")
            }

            return userData
        } catch (error) {
            return null
        }
    }

    async resetPassword(email) {
        const candidate = await UserModel.findOne({ email });

        if (!candidate) {
            throw ApiError.EmailError("Данный почтовый ящик недействителен");
        }
        const resetPasswordLink = uuidv4();
        await mailService.sendResetPasswordMail(
            email,
            `${process.env.CLIENT_URL}/setpassword/${resetPasswordLink}`,
        )
        await ResetPasswordModel.create({ userId: candidate._id, link: resetPasswordLink })

    }

    async checkResetPasswordLink(link) {
        try {
            const user = await ResetPasswordModel.findOne({ link })

            if (!user) {
                throw ApiError.BadRequest("Непредвиденная ошибка");
            }
            return user

        } catch (error) {

        }
    }

    async setNewUserPassword(link, password) {
        try {
            const user = await ResetPasswordModel.findOne({ link })

            if (!user) {
                throw ApiError.BadRequest("Непредвиденная ошибка");
            }
            const data = await UserModel.findById(user.userId);

            if (!data) {
                throw ApiError.BadRequest("Непредвиденная ошибка");
            }
            const hashPassword = await bcrypt.hash(password, 7);
            data.password = hashPassword
            await data.save()
            await ResetPasswordModel.deleteOne({ link })
        } catch (error) {

        }
    }

    async updateProfile(email, description, city, birthday, phone, work) {
        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw ApiError.UnauthorizedError();
            }

            const profileInfo = await ProfilModel.findOne(user._id);

            if (!profileInfo) {
                throw ApiError.UnauthorizedError();
            }

            const profileData = await ProfilModel.findOneAndUpdate(profileInfo.userId, {
                description: description,
                city: city,
                birthday: birthday,
                phone: phone,
                work: work,
            }, (err, docs) => err ? console.log("error", err) : console.log("docs", docs));

            await profileData.update()
            return profileData
        } catch (error) {

        }

    }

    async assignUserPassword(email, password) {
        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw ApiError.BadRequest("Непредвиденная ошибка")
            }
            const hashPassword = await bcrypt.hash(password, 7)
            user.password = hashPassword;
            await user.save()

        } catch (error) {

        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });

        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка активации");
        }

        user.isActivated = true;
        await user.save();
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {

        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDatabase = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDatabase) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async getProfile(id) {
        const user = await UserModel.findById(id);

        if (!user) {
            throw ApiError.BadRequest()
        }
        const profile = await ProfilModel.findOne({ userId: user._id })

        if (!profile) {
            throw ApiError.BadRequest()
        }
        return profile
    }

    async getUsers() {
        const users = await UserModel.find();
        return users;
    }
}


export default new UserService();