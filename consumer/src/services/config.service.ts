import { Container, Service } from 'typedi';
import { ENV } from './injectables';
import { EnvVar } from '../models';
import { ErrorHandlerService } from './error-handler.service';

@Service()
export class ConfigService {
  constructor() {
    const errorHandlerService = Container.get(ErrorHandlerService);
    const env = Container.get(ENV);
    try {
      console.log('Initializing config');
      console.log('Initialized config');
    } catch (err) {
      console.log('Failed to initialize config');
      errorHandlerService.handleFatalError(err);
    }
  }
}
