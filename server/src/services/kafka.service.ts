import { Service } from 'typedi';
import { Admin, Kafka, Producer } from 'kafkajs';

const TOPIC_NAME = 'add-product';
const BROKER_CONNECTION_STRING = 'broker:29092';
const CLIENT_ID = 'my-producer';

@Service()
export class KafkaService {
  private _admin: Admin;
  private _producer: Producer;

  constructor() {
    const kafka = new Kafka({ clientId: CLIENT_ID, brokers: [BROKER_CONNECTION_STRING] });
    this._admin = kafka.admin();
    this._producer = kafka.producer();
    this._createTopic().catch(err => console.log(err));
  }

  private async _createTopic() {
    await this._admin.connect();
    await this._admin.createTopics({
      topics: [
        {
          topic: TOPIC_NAME,
          numPartitions: 3,
          configEntries: [{ name: 'cleanup.policy', value: 'delete' }]
        }
      ]
    });
    await this._admin.disconnect();
  }

  public async sendMessage<T>(message: T): Promise<void> {
    console.log('connecting producer');
    await this._producer.connect();
    console.log('producer connected');
    const encodedMessage = Buffer.from(JSON.stringify(message));
    console.log('encoded message');
    await this._producer.send({
      topic: TOPIC_NAME,
      messages: [{ value: encodedMessage }]
    });
    console.log('encoded message');
  }
}
