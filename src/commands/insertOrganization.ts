import db from '../utils/db';

export default (name: string) => {
  return db('organization').insert({
    name,
  });
};
