import http from 'http';

import { Application, json, urlencoded, Response, NextFunction, Request } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import compression from 'compression';
// import BaseRouting from './router';
import { winstonLogger } from '@util/logger_util';
import { Logger } from 'winston';
import { CustomError } from '@util/error_util';

const logger: Logger = winstonLogger('server.ts_SERVER', 'debug');
const PORT_OF_SERVER = 4000;
class Server {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  public starting = (): void => {
    this.setupSecurity(this.app);
    this.setupRegular(this.app);
    // this.setupRoutes(this.app);
    this.setupErrorHandling(this.app);
    this.start(this.app);
  };

  private setupSecurity = (app: Application): void => {
    app.set('trust proxy', 1);
    /**
     * HPP mencegah penyalahgunaan API dengan cara pengiriman parameter yang sama berkali-kali
     */
    app.use(hpp());
    /**
     * Helmet membantu mengatasi serangan XSS dan injeksi
     * Membantu mencegah SSL palsu
     * Membantu mengatasi clickjacking
     */
    app.use(helmet());

    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true, // handling cookie di local atau production
        methods: ['POST', 'GET', 'PUT', 'DELETE']
      })
    );
  };

  private setupRegular = (app: Application): void => {
    /**
     * Melakukan proses compress data agar ukuran data bisa lebih kecil
     */
    app.use(compression());

    /**
     * Handling agar data JSON yang terkirim dibatasi 10mb
     */
    app.use(
      json({
        limit: '10mb'
      })
    );

    /**
     * Mengatasi data bertipe form
     * dan
     * mengatasi data rumit yang bertipe seperti array apabila `extended : true`
     */
    app.use(
      urlencoded({
        limit: '10mb',
        extended: true
      })
    );
  };

  // private setupRoutes = (app: Application): void => {
  //   BaseRouting(app);
  // };

  private setupErrorHandling(app: Application): void {
    app.use((error: CustomError, _req: Request, res: Response, next: NextFunction) => {
      logger.log('error', `AuthService ${error.comingFrom}:`, error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeErrors());
      }
      next(error);
    });
  }

  private async start(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttp(httpServer);
      /**
       * Models Database
       */
    } catch (error) {
      logger.log('error', 'auth_index start() error', error);
    }
  }

  private async startHttp(httpServer: http.Server): Promise<void> {
    try {
      logger.info(`Worker with process id of ${process.pid} has started in auth Service`);
      httpServer.listen(PORT_OF_SERVER, () => {
        logger.info(`Auth was started on port ${PORT_OF_SERVER}`);
      });
    } catch (error) {
      logger.log('error', 'auth_index startHttp() error', error);
    }
  }
}

export default Server;
