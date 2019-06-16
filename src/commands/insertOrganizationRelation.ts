import db from '../utils/db';

export default async (organizationId: number, parentId: number) => {
  return db('organization_relations').insert({
    org_id: organizationId,
    parent_id: parentId,
  });
};
