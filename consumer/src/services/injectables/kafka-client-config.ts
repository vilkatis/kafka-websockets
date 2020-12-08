import { Service } from 'typedi';
import { KafkaConfig, logLevel } from 'kafkajs';

const BROKER_CONNECTION_STRING = 'broker:29092';

export const KafkaClientConfig = Service<KafkaConfig>(() => {
  return kafkaClientConfigFactory({
    clientId: 'consumer',
    brokers: [BROKER_CONNECTION_STRING]
  });
});

interface ISettings {
  clientId: string;
  brokers: string[];
}

const kafkaClientConfigFactory: (settings: ISettings) => KafkaConfig = (settings) => {
  const { clientId, brokers } = settings;
  return {
    clientId,
    brokers,
    logLevel: logLevel.ERROR
  };
};
