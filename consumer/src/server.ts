import { ConfigService } from './services';
import { Container } from 'typedi';
import { ConsumerController } from './controllers';


export class Server {
  private _configService: ConfigService;
  private readonly _consumerController: ConsumerController;

  constructor() {
    this._configService = Container.get(ConfigService);
    this._consumerController = Container.get(ConsumerController);
  }

  async start(): Promise<void> {
    await this._runControllers();
  }

  async _runControllers() {
    await this._consumerController.run();
  }
}
