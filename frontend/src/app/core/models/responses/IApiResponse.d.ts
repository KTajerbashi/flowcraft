interface IApiResponse<T> {
    data: T;
    success: boolean;
    message: string;
}