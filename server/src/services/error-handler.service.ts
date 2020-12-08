import { Service } from 'typedi';

@Service()
export class ErrorHandlerService {
  public handleFatalError(err: Error): void {
    console.log('Fatal error encountered - exiting with code 1', err.message);
    process.exit(1);
  }
}
