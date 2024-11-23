import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/ApiError';
import { UserPayload } from '../types/types';
import config from '../../config/config';


const authenticateUser = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];  // Extract token from header

    if (!token) {
        return next(new ApiError(StatusCodes.FORBIDDEN, "Access denied"));
    }

    if (!config.secretKey) {
        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "JWT secret key is missing"));
    }

    jwt.verify(token, config.secretKey, (err: any,decode: any) => {
        console.log(token)
        if (err) {
            return next(new ApiError(StatusCodes.FORBIDDEN, "Invalid or expired token"));
        }

        // Attach user payload to request object
        req.user = decode as UserPayload;
        next();  // Proceed to the next middleware or route handler
    });
};

export default authenticateUser;
