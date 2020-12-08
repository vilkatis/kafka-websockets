import { Container, Service } from 'typedi';
import { KafkaService } from './kafka.service';

@Service()
export class UsersService {
  private readonly _kafkaService: KafkaService;
  constructor() {
    this._kafkaService = Container.get(KafkaService);
  }

  public addProduct(userId: string, productName: string): Promise<unknown> {
    return this._kafkaService.sendMessage({ userId, productName });
  }
}
