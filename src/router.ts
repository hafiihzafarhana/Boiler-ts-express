import { Application } from 'express';

const baseUrl = 'api/v1';
const BaseRouting = (app: Application): void => {
  app.use(baseUrl);
};

export default BaseRouting;
