import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ZomatoService } from '../services/zomato.service';
import { ZomatoCityQuery, ZomatoCityResponse } from '../models/zomato-city.model';
import { Observable } from 'rxjs';
import { TokenHttpGuard } from 'src/modules/user';
import { TokenInfo } from '../../../helpers/decorators/token-info.decorator';
import { JwtPayloadModel } from '../../../modules/user/models/jwt.model';

@Controller('zomato')
export class ZomatoController {

    constructor(
        private readonly zomatoSrv: ZomatoService
    ) { }

    @UseGuards(TokenHttpGuard)
    @Get('cities')
    register(@Query() query: ZomatoCityQuery, @TokenInfo() tokenInfo: JwtPayloadModel): Observable<ZomatoCityResponse[]> {
        return this.zomatoSrv.searchCities(query.name, tokenInfo.userId);
    }

    @UseGuards(TokenHttpGuard)
    @Get('geocode')
    geocode(@Query() query, @TokenInfo() tokenInfo: JwtPayloadModel): Observable<ZomatoCityResponse[]> {
        return this.zomatoSrv.getByCoordinates(query.lat, query.long, tokenInfo.userId);
    }
}