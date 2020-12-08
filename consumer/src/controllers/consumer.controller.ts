import { Container, Service } from 'typedi';
import { Consumer, EachMessagePayload } from 'kafkajs';
import { AddProductHandler } from '../handlers';
import { IHandler } from '../models';
import { KafkaConsumer } from '../services/injectables/kafka-consumer';

const TOPIC_NAME = 'add-product';

@Service()
export class ConsumerController {
  private readonly _addProductHandler: AddProductHandler;
  private readonly _kafkaConsumer: Consumer;

  constructor() {
    this._addProductHandler = Container.get(AddProductHandler);
    this._kafkaConsumer = Container.get(KafkaConsumer);
  }

  public async run(): Promise<void> {
    await this.runConsumer(this._kafkaConsumer, TOPIC_NAME);
  }

  public async runConsumer(consumer: Consumer, topic: string): Promise<void> {
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({ eachMessage: this._handleEachMessage(consumer) });
  }

  private _handleEachMessage: (consumer: Consumer) => (payload: EachMessagePayload) => Promise<void> = consumer => async ({ topic, partition, message }) => {
    let handler: IHandler<unknown>;

    switch (topic) {
      case TOPIC_NAME:
        handler = this._addProductHandler;
        break;
      default:
        console.error('Unhandled topic');
        break;
    }

    if (handler) {
      const event = handler.processMessage(message.value);
      handler.handleMessage(event);
    }

    await this._commitOffset(consumer, topic, partition, message.offset);
  };

  private async _commitOffset(consumer: Consumer, topic: string, partition: number, currentOffset: string): Promise<void> {
    const offset = String(parseInt(currentOffset) + 1);
    await consumer.commitOffsets([{ topic, partition, offset }]);
  }
}
