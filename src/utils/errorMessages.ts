export enum ErrorMessages{
    INTERNAL_SERVER_ERROR = 'Iternal Server Error',
    INVALID_REQUEST_BODY_MUST_BE_AN_OBJECT = 'Invalid request body: body must be an object',
    INVALID_REQUEST_USERNAME_AND_PASSWORD_MUST_BE_STRINGS = 'Invalid request body: userName and password must be strings',
    INVALID_PASSWORD = 'Invalid password',
    INVALID_USERNAME = 'Invalid username',
    MISSING_OR_INVALID_AUTH_HEADER = 'Authorization header missing or invalid',
    USER_NOT_FOUND = 'User not found',
    NO_COOKIE = 'No cookie provided',
    PASSWORDS_MUST_BE_THE_SAME = 'Password and repeated password must be the same',
    USER_WITH_THIS_USERNAME_ALREADY_EXIST = 'User with this username is already exist',
    TOKEN_NOT_PROVIDED = 'No access token provided',
    INVALID_OR_EXPIRED_ACCESS_TOKEN = 'Invalid or expired access token',
    INVALID_OR_EXPIRED_REFRESH_TOKEN = 'Invalid or expired refresh token'
}