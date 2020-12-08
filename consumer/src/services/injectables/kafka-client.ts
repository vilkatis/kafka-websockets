import { Service } from 'typedi';
import { Kafka, KafkaConfig } from 'kafkajs';
import { KafkaClientConfig } from './kafka-client-config';

export const KafkaClient = Service<Kafka, KafkaConfig>([KafkaClientConfig], (kafkaClientConfig) => {
  return kafkaClientFactory(kafkaClientConfig);
});

const kafkaClientFactory: (config: KafkaConfig) => Kafka = (config) => {
  return new Kafka(config);
};
