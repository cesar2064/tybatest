import { Controller, Post, Body } from '@nestjs/common';
import { UserCreateModel, UserResponse, UserLoginResponse, UserLoginBody } from '../../../modules/database/models/user.model';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {

    constructor(
        private readonly userSrv: UserService
    ){}

    @Post('register')
    async register(@Body() body: UserCreateModel): Promise<UserResponse> {
        const userRow = await this.userSrv.create(body);
        const userJson = userRow.toJSON() as UserResponse;
        delete userJson.password;
        return userJson;
    }

    @Post('login')
    async login(@Body() body: UserLoginBody): Promise<UserLoginResponse> {
        return this.userSrv.login(body.email, body.password);
    }
}