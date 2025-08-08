import { User } from './user';
import { pool } from '../../utils/database';
import { AppError } from '../../middlewares/handleError';
import {
  RefreshTokenResponseDto,
  RegisterResponseDto,
  UserResponseDto,
} from './dto/auth.response.dto';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../utils/jwt.util';
import { QueryResult } from 'pg';
import { RegisterRequestDto, UserRequestDto } from './dto/auth.request.dto';
import bcrypt from 'bcrypt';
import config from '../../configs/config';
import { HttpStatusCode } from '../../utils/statusCodes';
import { ErrorMessages } from '../../utils/errorMessages';

export async function authUser(user: UserRequestDto): Promise<UserResponseDto> {
  try {
    const userQuery: QueryResult<User> = await pool.query(
      `SELECT * FROM "Users" WHERE username = $1`,
      [user.username]
    );
    const findUser:User = userQuery.rows[0];
    if (!findUser) throw new AppError(HttpStatusCode.NOT_FOUND, ErrorMessages.INVALID_USERNAME);
    if (!(await bcrypt.compare(user.password, findUser.passwordHash)))
      throw new AppError(HttpStatusCode.BAD_REQUEST, ErrorMessages.INVALID_PASSWORD);
    const accessToken = await generateAccessToken(findUser.username);
    const refreshToken = await generateRefreshToken(findUser.username);
    return {
      username: findUser.username,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    console.error(err);
    if (err instanceof AppError) {
      throw new AppError(
        err.status || HttpStatusCode.INTERNAL_SERVER_ERROR,
        err.message || ErrorMessages.INTERNAL_SERVER_ERROR
      );
    } else throw new AppError(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorMessages.INTERNAL_SERVER_ERROR);
  }
}

export async function registerNewUser(
  credentials: RegisterRequestDto
): Promise<RegisterResponseDto> {
  try {
    if (credentials.password !== credentials.repeatPassword) {
      throw new AppError(
        HttpStatusCode.BAD_REQUEST,
        ErrorMessages.PASSWORDS_MUST_BE_THE_SAME
      );
    }
    const checkQuery: QueryResult<User> = await pool.query(
      `SELECT username, "firstName", "lastName", age FROM "Users" WHERE username = $1`,
      [credentials.username]
    ); 
    if(checkQuery.rows[0]){
      throw new AppError(
        HttpStatusCode.BAD_REQUEST,
        ErrorMessages.USER_WITH_THIS_USERNAME_ALREADY_EXIST
      );
    }
    const hash = await bcrypt.hash(credentials.password, config.salt);
    const insertQuery:QueryResult<User> = await pool.query(
      'INSERT INTO "Users" (username, "passwordHash", "firstName", "lastName", "age") VALUES ($1, $2, $3, $4, $5) RETURNING username, "firstName", "lastName", age',
      [
        credentials.username,
        hash,
        credentials.firstName,
        credentials.lastName,
        credentials.age,
      ]
    );
    return insertQuery.rows[0];
  } catch (err) {
    console.error(err);
    if (err instanceof AppError) {
      throw new AppError(
        err.status || HttpStatusCode.INTERNAL_SERVER_ERROR,
        err.message || ErrorMessages.INTERNAL_SERVER_ERROR
      );
    } else throw new AppError(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorMessages.INTERNAL_SERVER_ERROR);
  }
}

export async function generateNewAccessToken(
  token: string | undefined
): Promise<RefreshTokenResponseDto> {
  try {
    if (!token) {
      throw new AppError(HttpStatusCode.UNAUTHORIZED, ErrorMessages.TOKEN_NOT_PROVIDED);
    }
    const payload = await verifyRefreshToken(token);
    const userQuery: QueryResult<User> = await pool.query(
      `SELECT username FROM "Users" WHERE username = $1`,
      [payload.username]
    );
    if (!userQuery.rows[0]) {
      throw new AppError(HttpStatusCode.NOT_FOUND, ErrorMessages.USER_NOT_FOUND);
    }
    const accessToken = await generateAccessToken(payload.username);
    return {
      accessToken: accessToken,
    };
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(
        err.status || HttpStatusCode.INTERNAL_SERVER_ERROR,
        err.message || ErrorMessages.INTERNAL_SERVER_ERROR
      );
    } else throw new AppError(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorMessages.INTERNAL_SERVER_ERROR);
  }
}
