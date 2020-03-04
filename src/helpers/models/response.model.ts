export interface ResponseDataModel<D> {
    statusCode: number;
    data?: D;
}

export interface ResponseErrorModel<M> {
    statusCode: number;
    message?: M;
}