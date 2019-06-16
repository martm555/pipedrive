import db from './../utils/db';

interface Params {
  name: string;
  limit?: number;
  offset?: number;
}

const MAX_LIMIT = 100;

const getLimit = (limit?: number) => {
  limit = Number(limit);
  if (!limit) {
    return MAX_LIMIT;
  }
  if (Number(limit) < MAX_LIMIT) {
    return limit;
  }

  return MAX_LIMIT;
};

const getOffset = (offset?: number) => {
  offset = Number(offset);
  if (!offset) {
    return 1;
  }
  return offset;
};

export default (params: Params) => {
  const limit = getLimit(params.limit);
  const offset = (getOffset(params.offset) - 1) * limit;

  const parents = db.select('o2.name as orig_name', db.raw('? as relationship_type', ['parent']))
      .from('organization AS o1')
      .innerJoin('organization_relations AS or1', 'o1.id', 'or1.org_id')
      .innerJoin('organization_relations AS or2', 'or1.parent_id', 'or2.org_id')
      .innerJoin('organization as o2', 'o2.id', 'or2.org_id')
      .where('o1.name', params.name);

  const daughters = db.select('o2.name as orig_name', db.raw('? as relationship_type', ['daughter']))
    .from('organization AS o1')
    .innerJoin('organization_relations AS or1', 'o1.id', 'or1.org_id')
    .innerJoin('organization_relations AS or2', 'or1.id', 'or2.parent_id')
    .innerJoin('organization as o2', 'o2.id', 'or2.org_id')
    .where('o1.name', params.name);

  const sisters = db.select('o2.name as orig_name', db.raw('? as relationship_type', ['sister']))
    .from('organization AS o1')
    .innerJoin('organization_relations AS or1', 'o1.id', 'or1.org_id')
    .innerJoin('organization_relations AS or2', function() {
      this.on('or1.parent_id', '=', 'or2.parent_id').andOn('or1.org_id', '<>', 'or2.org_id');
    })
    .innerJoin('organization as o2', 'o2.id', 'or2.org_id')
    .where('o1.name', params.name);

  const result = db.select().from(
    db.raw('(? UNION ? UNION ?) q', [
      parents,
      daughters,
      sisters,
    ]),
  ).orderBy('orig_name', 'asc').limit(limit).offset(offset);
  return result;
};
