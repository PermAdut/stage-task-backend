import { User } from './user';
import { getUsers } from '../../utils/database';
import { AppError } from '../../middlewares/handleError';
import { RefreshTokenResponseDto, UserResponseDto } from './dto/auth.response.dto';
import { generateAccessToken, verifyRefreshToken } from '../../utils/jwt.util';

export async function authUser(user: User): Promise<UserResponseDto> {
  try {
    const users = await getUsers();
    const findUser = users.find((el) => el.userName === user.userName);
    if (!findUser) throw new AppError(404, 'Invalid username');
    if (findUser.password != user.password)
      throw new AppError(400, 'Invalid password');
    const accessToken = await generateAccessToken(findUser.userName);
    const refreshToken = await generateAccessToken(findUser.userName);
    return {
      userName: findUser.userName,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(
        err.status || 500,
        err.message || 'Internal Server Error'
      );
    } else throw new AppError(500, 'Internal Server Error');
  }
}

export async function generateNewAccessToken(token: string):Promise<RefreshTokenResponseDto> {
  try {
    const payload = await verifyRefreshToken(token);
    const accessToken = await generateAccessToken(payload.username);
    return {
      accessToken: accessToken
    };
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(
        err.status || 500,
        err.message || 'Internal Server Error'
      );
    } else throw new AppError(500, 'Internal Server Error');
  }
}
