import { Injectable, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayloadModel } from '../models/jwt.model';
import { ConfigService } from '@nestjs/config';
import { APP_ENV_CONSTANTS } from 'src/app.constants';


@Injectable()
export class TokenService {

    private readonly algorithm: jwt.Algorithm = 'HS512';
    private readonly jwtSecret: string = this.configService.get(APP_ENV_CONSTANTS.JWT_SECRET);

    constructor(
        private readonly configService: ConfigService,
    ) { }

    create(payload: JwtPayloadModel): string {
        const token = jwt.sign(payload, this.jwtSecret, { algorithm: this.algorithm });
        return token;
    }

    decode(token: string): JwtPayloadModel {
        return jwt.verify(token, this.jwtSecret, { algorithms: [this.algorithm] }) as JwtPayloadModel;
    }

}