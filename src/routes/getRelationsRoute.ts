import getRelations from '../commands/getRelations';
import {RouteMethods} from '../types';
import asyncHandler from './asyncHandler';
import {ValidationError} from "../errors/ValidationError";

export default {
  method: RouteMethods.GET,
  middlewares: [
    asyncHandler(async (req, res, next) => {
      if (!req.query.name) {
        throw new ValidationError(`Field 'name' is empty`);
      }
      const result = await getRelations(req.query);
      return res.status(200).json(result);
    }),
  ],
  name: '/getRelations',
};
