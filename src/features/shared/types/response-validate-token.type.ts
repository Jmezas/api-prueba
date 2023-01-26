import { IPayload } from 'src/features/users/domain/models/payload.interface';
import { ErrorResponse } from '../interfaces/error-response.interface';

export type ResponseValidateToken = IPayload | ErrorResponse;
