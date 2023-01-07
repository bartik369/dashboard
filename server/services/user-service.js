import UserModel from "../models/user-model.js";
import ResetPasswordModel from "../models/reset-password-model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";

class UserService {
    async registration(displayname, email, password) {
        const candidate = await UserModel.findOne({ email });

        if (candidate) {
            throw ApiError.EmailExist(`Пользователь ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 7);
        const activationLink = uuidv4();
        const user = await UserModel.create({
            displayname,
            email,
            password: hashPassword,
            activationLink,
        });

        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        );

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
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

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });

        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка активации");
        }

        user.isActivated = true;
        await user.save();
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
        c

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async getUsers() {
        const users = await UserModel.find();
        return users;
    }

    async getUser() {

    }
}

export default new UserService();