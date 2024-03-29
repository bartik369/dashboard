import jwt from 'jsonwebtoken';
import tokenModel from '../models/users/token.js';


class TokenService {
    generateTokens(payload) {
        // const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30s' });
        // const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET);
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET);
        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(token) {
        try {
            // const userData = jwt.verify(JSON.parse(token), process.env.JWT_ACCESS_SECRET);
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            console.log(error)
        }
    };


    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    };

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        };
        const token = await tokenModel.create({ user: userId, refreshToken });
        return token;
    };

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({ refreshToken });
        return tokenData;
    };

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({ refreshToken });
        return tokenData;
    }
};

export default new TokenService();