import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZOMATO_ENV_CONSTANTS, ZOMATO_CONSTANTS } from '../zomato.constants';
import { ZomatoCityResponse } from '../models/zomato-city.model';
import { Observable } from 'rxjs';
import { map, last, tap } from 'rxjs/operators';
import { UserTransactionService } from 'src/modules/user';
import { UserTransactionName } from 'src/modules/database/models/user-transaction.model';

@Injectable()
export class ZomatoService {

    private readonly zomatoApiKey = this.config.get(ZOMATO_ENV_CONSTANTS.API_KEY);
    private readonly zomatoUrl = ZOMATO_CONSTANTS.API_URL;
    private readonly zomatoCitiesPath = `${this.zomatoUrl}/${ZOMATO_CONSTANTS.API_CITIES_PATH}`;
    private readonly zomatoGeocodePath = `${this.zomatoUrl}/${ZOMATO_CONSTANTS.API_GEOCODE_PATH}`;

    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService,
        private readonly userTransactionSrv: UserTransactionService
    ) { }

    searchCities(name: string, userId: string): Observable<ZomatoCityResponse[]> {
        return this.httpService.get<ZomatoCityResponse[]>(this.zomatoCitiesPath, {
            params: {
                q: name
            },
            headers: {
                [ZOMATO_CONSTANTS.API_USER_KEY_HEADER]: this.zomatoApiKey
            }
        }).pipe(
            tap(() => this.userTransactionSrv.create({
                userId,
                name: UserTransactionName.ZomatoRestaurantsByLocation
            })),
            map((response) => response.data)
        )
    }

    getByCoordinates(lat: string, long: string, userId: string) {
        return this.httpService.get<any[]>(this.zomatoGeocodePath, {
            params: {
                lat,
                long
            },
            headers: {
                [ZOMATO_CONSTANTS.API_USER_KEY_HEADER]: this.zomatoApiKey
            }
        }).pipe(
            tap(() => this.userTransactionSrv.create({
                userId,
                name: UserTransactionName.ZomatoRestaurantsByLocation
            })),
            map((response) => response.data)
        )
    }
}