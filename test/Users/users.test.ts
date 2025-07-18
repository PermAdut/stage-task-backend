import { User } from '../../src/modules/User/user';
import app from '../../src/app';
import request from 'supertest';
import * as UserService from '../../src/modules/User/user.service';
import { AppError } from '../../src/middlewares/handleError';

jest.mock('../../src/modules/User/user.service.ts');
describe('POST /api/v1.0/users/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return username', async () => {
    const authUser = jest.spyOn(UserService, 'authUser');
    authUser.mockResolvedValue({ userName: 'admin' });
    const body: User = { userName: 'admin', password: '1234' };
    const res = await request(app).post('/api/v1.0/user/login').send(body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({ userName: 'admin' });
    expect(UserService.authUser).toHaveBeenCalledWith({userName: 'admin', password: '1234'});
  });

  it('should return invalid request body error', async () => {
    const body: Pick<User, 'userName'> = { userName: 'admin' };
    const res = await request(app).post('/api/v1.0/user/login').send(body);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toStrictEqual({
      error: 'Invalid request body: userName and password must be strings',
    });
  });

  it('should return invalid username error', async () => {
    const authUser = jest.spyOn(UserService, 'authUser');
    authUser.mockRejectedValue(new AppError(404, 'Invalid username'));
    const body: User = { userName: 'admin1', password: '1234' };
    const res = await request(app).post('/api/v1.0/user/login').send(body);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toStrictEqual({ error: 'Invalid username' });
    expect(UserService.authUser).toHaveBeenCalledWith({userName: 'admin1', password: '1234'});
  });

  it('should return invalid password error', async () => {
    const authUser = jest.spyOn(UserService, 'authUser');
    authUser.mockRejectedValue(new AppError(400, 'Invalid password'));
    const body: User = { userName: 'admin', password: '12345' };
    const res = await request(app).post('/api/v1.0/user/login').send(body);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toStrictEqual({ error: 'Invalid password' });
    expect(UserService.authUser).toHaveBeenCalledWith({userName: 'admin', password: '12345'});
  });
});