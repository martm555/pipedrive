export enum RouteMethods {
  GET = 'GET',
  POST = 'POST',
}

export interface Organization {
  org_name: string;
  daughters?: [Organization];
}
