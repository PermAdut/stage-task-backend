import { User } from './user';
import { getUsers } from '../../utils/database';
import { AppError } from '../../middlewares/handleError';
import { UserResponseDto } from './dto/userResponse.dto';
export async function authUser(user: User): Promise<UserResponseDto> {
  try {
    const users = await getUsers();
    const findUser = users.find((el) => el.userName === user.userName);
    if (!findUser) throw new AppError(404, 'Invalid username');
    if (findUser.password != user.password)
      throw new AppError(400, 'Invalid password');
    return {
      userName: findUser.userName,
    };
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(
        err.status || 500,
        err.message || 'Internal Server Error',
      );
    } else throw new AppError(500, 'Internal Server Error');
  }
}
