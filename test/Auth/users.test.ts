import app from '../../src/app';
import request from 'supertest';
import * as UserService from '../../src/modules/Auth/auth.service';
import { AppError } from '../../src/middlewares/handleError';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../src/utils/jwt.util';
import { UserRequestDto } from '../../src/modules/Auth/dto/auth.request.dto';

jest.mock('../../src/modules/Auth/auth.service.ts');
describe('POST /api/v1.0/users/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return username', async () => {
    const authUser = jest.spyOn(UserService, 'authUser');
    const accessToken = await generateAccessToken('admin');
    const refreshToken = await generateRefreshToken('admin');
    authUser.mockResolvedValue({
      username: 'admin',
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    const body: UserRequestDto = { username: 'admin', password: '1234' };
    const res = await request(app).post('/api/v1.0/user/login').send(body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({
      username: 'admin',
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  });

  it('should return invalid request body error', async () => {
    const body: Pick<UserRequestDto, 'username'> = { username: 'admin' };
    const res = await request(app).post('/api/v1.0/user/login').send(body);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toStrictEqual({
      error: 'Missing required field: password',
    });
  });

  it('should return invalid username error', async () => {
    const authUser = jest.spyOn(UserService, 'authUser');
    authUser.mockRejectedValue(new AppError(404, 'Invalid username'));
    const body: UserRequestDto = { username: 'admin1', password: '1234' };
    const res = await request(app).post('/api/v1.0/user/login').send(body);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toStrictEqual({ error: 'Invalid username' });
    expect(UserService.authUser).toHaveBeenCalledWith({
      username: 'admin1',
      password: '1234',
    });
  });

  it('should return invalid password error', async () => {
    const authUser = jest.spyOn(UserService, 'authUser');
    authUser.mockRejectedValue(new AppError(400, 'Invalid password'));
    const body: UserRequestDto = { username: 'admin', password: '12345' };
    const res = await request(app).post('/api/v1.0/user/login').send(body);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toStrictEqual({ error: 'Invalid password' });
    expect(UserService.authUser).toHaveBeenCalledWith({
      username: 'admin',
      password: '12345',
    });
  });
});
