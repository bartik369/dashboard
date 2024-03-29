import UserModel from "../models/users/user.js";
import PasswordModel from "../models/users/password.js"
import LinkModel from "../models/users/activation-link.js"
import ProfileModel from "../models/users/profile.js"
import RoleRequestModel from "../models/users/roles-request.js"
import Roles from "../models/users/roles.js"
import ResetPasswordModel from "../models/users/reset-password.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";
import dotenv from 'dotenv';
dotenv.config();

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
            email,
            roles: [userRoles.value]
        });
        await PasswordModel.create({
            userId: user._id,
            password: hashPassword,
        })
        await LinkModel.create({
            userId: user._id,
            activationLink: activationLink,
        })
        await ProfileModel.create({
            userId: user._id,
            displayname, 
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
        const checkUserPassword = await PasswordModel.findOne({ userId: user._id })

        const isPasswordEquals = await bcrypt.compare(password, checkUserPassword.password);

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
        await ResetPasswordModel.create({
            userId: candidate._id,
            link: resetPasswordLink,
        })

    }

    async checkResetPasswordLink(link) {
        try {
            const user = await ResetPasswordModel.findOne({ link })

            if (!user) {
                throw ApiError.BadRequest("Непредвиденная ошибка");
            }
            return user

        } catch (error) {
            return null
        }
    }

    async setNewUserPassword(link, password) {
        try {
            const dataLink = await ResetPasswordModel.findOne({ link: link })

            if (!dataLink) {
                return null
            }
            const hashPassword = await bcrypt.hash(password, 7);
            const passwordData = await PasswordModel.findOneAndUpdate({ userId: dataLink.userId }, {
                password: hashPassword
            });
            await passwordData.save();
            await ResetPasswordModel.deleteOne({ link })
            return passwordData
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
            const passwordData = await PasswordModel.findOneAndUpdate({ userId: user._id }, {
                password: hashPassword
            });
            await passwordData.save()
            return passwordData

        } catch (error) {

        }
    }

    async updateProfile(id, displayname, description, city, birthday, phone, departament, workPhone, vocation, file) {
        try {
            const profileInfo = await ProfileModel.findById(id);
            if (!profileInfo) {
                throw ApiError.UnauthorizedError();
            }

            const profileData = await ProfileModel.findByIdAndUpdate(profileInfo.id, {
                displayname: displayname,
                description: description,
                city: city,
                birthday: birthday,
                phone: phone,
                work: {
                    departament: departament,
                    workPhone: workPhone,
                    vocation: vocation,
                },
                avatar: file,
            }, (err, docs) => err ? console.log("error", err) : console.log("docs", docs));

            await profileData.update()
            return profileData
        } catch (error) {

        }
    }
    async updateProfilePhoto(id, filePath) {
        try {
            const profileData = await ProfileModel.findOneAndUpdate({ userId: id }, {
                avatar: filePath,
            });
            await profileData.save()
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
            const setPassword = await PasswordModel.findOneAndUpdate({ userId: user._id }, {
                password: hashPassword
            })
            await setPassword.save()
            return setPassword

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
        const profile = await ProfileModel.findOne({ userId: user._id })

        if (!profile) {
            throw ApiError.BadRequest()
        }
        return profile
    }

    async getUsers() {
        const users = await UserModel.find();
        return users;
    }
    async getProfiles() {
        const profiles = await ProfileModel.find();
        return profiles;
    }
    async getUser(email) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return null
        }
        return {
            id: user._id,
            email: user.email,
            roles: user.roles
        };
    }

    async getRolesRequests() {
        try {
            const rolesRequests = await RoleRequestModel.find()
            return rolesRequests
        } catch (error) {

        }
    }

    async createRoleRequest(id, displayname, email, role) {

        if (!id || !role || !displayname || !role) {
            return null
        }
        const existRoleRequest = await RoleRequestModel.findOne({ userId: id });

        if (existRoleRequest) {
            await RoleRequestModel.deleteOne({ userId: id })
        }
        const roleRequest = await RoleRequestModel.create({
            userId: id,
            displayname: displayname,
            email: email,
            role: role,
        });
        roleRequest.save();
        await mailService.sendRoleRequestingMail(email, role, displayname)

    }

    async setRoleRespond(id, email, displayname, role, approve) {

        if (!approve) {
            await RoleRequestModel.deleteOne({ userId: id });
            await mailService.sendRejectRoleMail(email, role, displayname)
            return null
        }
        const user = await UserModel.findOne({ _id: id });

        if (!user) {
            return null
        }
        const setRole = await UserModel.findByIdAndUpdate(user._id, {
            $push: { roles: role }
        })
        setRole.save();
        await RoleRequestModel.deleteOne({ userId: id });
        await mailService.sendApproveRoleMail(email, role, displayname)

    }
}


export default new UserService();