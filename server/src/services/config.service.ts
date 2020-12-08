import { Container, Service } from 'typedi';
import { ENV } from './injectables';
import { EnvVar } from '../models';
import { ErrorHandlerService } from './error-handler.service';

@Service()
export class ConfigService {
  public serverPort: number;

  constructor() {
    const errorHandlerService = Container.get(ErrorHandlerService);
    const env = Container.get(ENV);
    try {
      console.log('Initializing config');
      this.serverPort = env.get(EnvVar.SERVER_PORT).required().asPortNumber();
      console.log('Initialized config');
    } catch (err) {
      console.log('Failed to initialize config');
      errorHandlerService.handleFatalError(err);
    }
  }
}
