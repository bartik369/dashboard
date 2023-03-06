export default class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    };

    static UnauthorizedError(message, errors = []) {
        return new ApiError(403, message, errors)
    };

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    };

    static EmailError(message, errors = []) {
        errors.push({ email: message })
        return new ApiError(400, message, errors);
    };

    static PasswordError(message, errors = []) {
        errors.push({ password: message })
        return new ApiError(400, message, errors);
    };

    static EmailExist(message, errors = []) {
        errors.push({ email: message })
        return new ApiError(400, message, errors);
    };

    static WrongLink(message, errors = []) {
        return new ApiError(403, message, errors)
    };
};