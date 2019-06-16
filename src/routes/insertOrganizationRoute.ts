import insertOrganizations from '../commands/insertOrganizations';
import {RouteMethods} from '../types';
import asyncHandler from './asyncHandler';
import {ValidationError} from "../errors/ValidationError";

export default {
  method: RouteMethods.POST,
  middlewares: [
    asyncHandler(async (req, res, next) => {
      if (!Object.keys(req.body).length) {
        throw new ValidationError('No data is set');
      }
      await insertOrganizations(req.body);
      return res.status(200).json({
        message: 'success'
      });
    }),
  ],
  name: '/insertOrganization',
};
