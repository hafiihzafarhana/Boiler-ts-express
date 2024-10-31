import express, { Express } from 'express';
import Server from '@root/server';

const app: Express = express();
const server: Server = new Server(app);

server.starting();

export default app;
