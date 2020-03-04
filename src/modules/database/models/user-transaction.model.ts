export enum UserTransactionName {
    Login = 'login',
    ZomatoRestaurantsByLocation = 'zomato_restaurants_by_location'
}

export abstract class UserTransactionCreate {
    name: UserTransactionName;
    userId: string;
}