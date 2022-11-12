import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka, KafkaOptions, Transport } from '@nestjs/microservices';
import { EVENT__PRODUCT_CREATION } from '../../dto/constants/events';

export const kafkaListeners = async (eventClient: ClientKafka) => {
  [EVENT__PRODUCT_CREATION].forEach((topic) => {
    Logger.log(`Listening on ${topic}...`);
    eventClient.subscribeToResponseOf(topic);
  });
};

export const microserviceConfig = (config: ConfigService): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: getOptions(config),
});

export const eventBusClientProvider = [
  {
    provide: ClientKafka,
    useFactory: (config: ConfigService) => {
      return new ClientKafka(getOptions(config));
    },
    inject: [ConfigService],
  },
];

const getOptions = (config: ConfigService) => ({
  client: {
    clientId: config.get<string>('KAFKA__CLIENT_ID'),
    brokers: config.getOrThrow<string>('KAFKA__URL')?.split(','),
  },
  consumer: {
    groupId: config.getOrThrow<string>('KAFKA__CONSUMER_GROUP_ID'),
    allowAutoTopicCreation: true,
  },
});
