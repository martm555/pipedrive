import {Organization} from '../types';
import getOrganizationByName from './getOrganizationByName';
import insertOrganization from './insertOrganization';
import insertOrganizationRelation from './insertOrganizationRelation';

const insert = async (organization: Organization, parentId: number | null = null) => {
  try {
    const [org] = await getOrganizationByName(organization.org_name);

    let organizationId;
    if (!org) {
      [organizationId] = await insertOrganization(organization.org_name);
    } else {
      organizationId = org.id;
    }

    await insertOrganizationRelation(organizationId, parentId);

    if (!organization.daughters) {
      return;
    }

    for (const daughter of organization.daughters) {
      await insert(daughter, organizationId);
    }
  } catch (e) {
    // ignore errors
    console.log('error: ', e.message);
  }
};

export default async (data: [Organization]) => {
  for (const org of data) {
    await insert(org);
  }
};
