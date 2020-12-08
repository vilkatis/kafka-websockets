import { createExpressServer } from 'routing-controllers';
import { Express } from 'express';
import { ConfigService } from './services';
import { Container } from 'typedi';
import { controllers } from './controllers';

export class Server {
  private _configService: ConfigService;
  private _app: Express;

  constructor() {
    this._configService = Container.get(ConfigService);
    this._app = createExpressServer({
      routePrefix: '/v1',
      validation: true,
      controllers
    });
  }

  async start(): Promise<void> {
    this._app.listen(this._configService.serverPort, () => {
      console.log('Express listening on port', this._configService.serverPort);
    });
  }
}
