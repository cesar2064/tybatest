export abstract class ZomatoCityResponse {
    id: string;
    name: string;
    country_id: string;
    country_name: string;
    is_state: string;
    state_id: string;
    state_name: string;
    state_code: string;
}

export abstract class ZomatoCityQuery {
    name: string
}