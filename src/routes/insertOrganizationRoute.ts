import insertOrganizations from '../commands/insertOrganizations';
import {ValidationError} from '../errors/ValidationError';
import {RouteMethods} from '../types';
import asyncHandler from './asyncHandler';

export default {
  method: RouteMethods.POST,
  middlewares: [
    asyncHandler(async (req, res, next) => {
      if (!Object.keys(req.body).length) {
        throw new ValidationError('No data is set');
      }
      await insertOrganizations(req.body);
      return res.status(200).json({
        message: 'success',
      });
    }),
  ],
  name: '/insertOrganization',
};
