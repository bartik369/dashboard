import userService from "../services/user-service.js";
import ApiError from "../exceptions/api-error.js";
import tokenService from "../services/token-service.js";



class UserController {
    async registration(req, res, next) {
        try {
            const { displayname, email, password, description, city, birthday, phone, work } = req.body;
            const userData = await userService.registration(displayname, email, password, description, city, birthday, phone, work);
            // res.cookie('refreshToken', userData.refreshToken, {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            //     httpsOnly: true,
            // });
            return res.json(userData);
        } catch (err) {
            next(err);
        }
    };

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            console.log(userData)
            res.cookie('accessToken', userData.accessToken, {
                maxAge: 15 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            console.log("userdata from back", userData)
            return res.json(userData)

        } catch (err) {
            next(err);
        }
    };

    async logout(req, res, next) {
        try {
            // const { refreshToken } = req.cookies;
            const { cookie } = req.headers;
            // const accessToken = cookie.split("accessToken=")[1];
            const refreshToken = cookie.split("refreshToken=")[1].split(";")[0];
            await userService.logout(refreshToken);
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.status(200).json({ message: "Logout success" })
        } catch (err) {
            next(err);
        }
    };

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (err) {
            next(err);
        }
    };

    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const userData = await userService.refresh(refreshToken);
            res.cookie('accessToken', userData.accessToken, {
                maxAge: 15 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            return res.json(userData);
        } catch (err) {
            // next(err);
        }
    };

    async resetPassword(req, res, next) {
        try {
            const { email } = req.body;
            console.log(email)
            const userData = await userService.resetPassword(email)
            return res.json(userData);
        } catch (error) {
            next(error)
        }
    }

    async checkResetLink(req, res, next) {
        try {
            const resetPasswordLink = req.params.link;
            console.log("link is ", resetPasswordLink)
            const userData = await userService.checkResetPasswordLink(resetPasswordLink);
            console.log(userData)
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async setNewPassword(req, res, next) {
        try {
            const { link, password } = req.body;
            console.log(link)
            console.log("password", password)
            const userData = await userService.setNewUserPassword(link, password)
            return userData
        } catch (error) {
            next(error)
        }
    }

    async assignNewPassword(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.assignUserPassword(email, password);
            return userData
        } catch (error) {
            next(error)
        }
    }

    async updateProfile(req, res, next) {
        try {
            const { id, email, description, city, birthday, phone, work } = req.body;
            const profileData = await userService.updateProfile(id, email, description, city, birthday, phone, work)
            return profileData
        } catch (error) {
            next()
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (err) {
            next(err);
        }
    };

    async getUser(req, res, next) {
        try {
            const user = await userService.getUser();
        } catch (error) {

        }
    }

    async getProfile(req, res, next) {
        try {
            const id = req.params.id;
            const profile = await userService.getProfile(id)
            return res.json(profile)
        } catch (error) {

        }
    }


    async checkCookie(req, res, next) {
        try {
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                return res.status(403).json({ message: "Пользователь не авторизован" })
            }
            const userData = await userService.checkValidAccess(accessToken);
            return res.json({ user: userData, accessToken: accessToken })
        } catch (error) {

        }
    }

    // requesting roles

    async rolesRequests(req, res, next) {
        try {
            console.log("get all request roles works")
            const rolesRequestsData = await userService.getRolesRequests()
            return res.json(rolesRequestsData);
        } catch (error) {

        }
    };

    async createRolesRequest(req, res, next) {
        try {
            const { id, displayname, email, role } = req.body;
            const roleData = await userService.createRoleRequest(id, displayname, email, role);
        } catch (error) {

        }
    };

    async rolesRespond(req, res, next) {
        try {
            const { id, role, approve } = req.body;
            const roleData = await userService.setRoleRespond(id, role, approve)
            console.log("answer after true role", roleData)
        } catch (error) {

        }
    };

};

export default new UserController();