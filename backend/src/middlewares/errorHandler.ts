import {
    Request,
    Response,
    NextFunction
} from "express";

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    const message =
        err instanceof Error ? err.message : "Internal server error";

    const status =
        message === "Product not found" ? 404 :
            message === "Invalid product ID" ? 400 :
                message === "Product name is required" ? 400 :
                    message === "Price must be greater than zero" ? 400 :
                        message === "Description must be a string" ? 400 :
                            message === "At least one field is required" ? 400 :
                                500;

    const response: IApiResponse<null> = {
        data: null,
        message: status === 500 ? "Internal server error" : message,
        isSuccess: false
    };

    res.status(status).json(response);
}