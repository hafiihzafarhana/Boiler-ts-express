import { Application } from 'express';

export const BaseRoutingV1 = (app: Application): void => {
  const baseUrl = 'api/v1';
  app.use(baseUrl);
};

export const BaseRoutingV2 = (app: Application): void => {
  const baseUrl = 'api/v2';
  app.use(baseUrl);
};
