import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ZomatoService } from '../services/zomato.service';
import { ZomatoCityQuery, ZomatoCityResponse } from '../models/zomato-city.model';
import { Observable } from 'rxjs';
import { TokenHttpGuard } from 'src/modules/user';

@Controller('zomato')
export class ZomatoController {

    constructor(
        private readonly zomatoSrv: ZomatoService
    ){}

    @UseGuards(TokenHttpGuard)
    @Get('cities')
    register(@Query() query: ZomatoCityQuery): Observable<ZomatoCityResponse[]> {
        return this.zomatoSrv.searchCities(query.name);
    }

    @UseGuards(TokenHttpGuard)
    @Get('geocode')
    geocode(@Query() query): Observable<ZomatoCityResponse[]> {
        return this.zomatoSrv.getByCoordinates(query.lat, query.long);
    }
}