import { Container, Service } from 'typedi';
import { IAddProductEvent, IHandler } from '../models';
import { SocketService } from '../services';

@Service()
export class AddProductHandler implements IHandler<IAddProductEvent> {
  private readonly _socketService: SocketService;
  constructor() {
    this._socketService = Container.get(SocketService);
  }
  public processMessage(buffer: Buffer): IAddProductEvent | null {
    return JSON.parse(buffer.toString()) as IAddProductEvent;
  }

  public handleMessage(event: IAddProductEvent): void {
    this._socketService.sendMessage({ userId: event.userId, data: { productName: event.productName, success: true } });
  }
}
