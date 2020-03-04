import { createParamDecorator } from '@nestjs/common';
import { APP_CONSTANST } from 'src/app.constants';
import { JwtPayloadModel } from 'src/modules/user/models/jwt.model';

export const TokenInfo = createParamDecorator<void, void, JwtPayloadModel>((data, req) => {
	return req[APP_CONSTANST.REQUEST_SESSION_INFO] as JwtPayloadModel; // In case we forgot to include requestIp.mw() in main.ts
});