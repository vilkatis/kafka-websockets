import { Service } from 'typedi';
import { Consumer, Kafka } from 'kafkajs';
import { KafkaClient } from './kafka-client';

const CONSUMER_GROUP_ID = 'consumer';

export const KafkaConsumer = Service<Consumer, Kafka>([KafkaClient], (kafkaClient) => {
  return kafkaConsumerFactory(kafkaClient, CONSUMER_GROUP_ID);
});

const kafkaConsumerFactory: (client: Kafka, consumerGroupId: string) => Consumer = (client, groupId) => {
  return client.consumer({ groupId });
};
