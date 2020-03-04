export abstract class UserCreateModel {
    email: string;
    password: string;
}

export abstract class UserResponse {
    email: string;
    password: string;
    updatedAt: string;
    createdAt: string;
}

export abstract class UserLoginResponse {
    token: string;
}

export abstract class UserLoginBody {
    email: string;
    password: string;
}