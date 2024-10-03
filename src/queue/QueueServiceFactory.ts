import { QueueService, QueueServiceType } from "./QueueService";
import { RabbitQueueService } from "./rabbit/RabbitQueueService";

class QueueServiceFactory {
    public factory(queueServiceType: QueueServiceType | string): QueueService {
        switch (queueServiceType) {
            case 'RabbitQueueService':
                return new RabbitQueueService();
            default:
                throw new Error('Não existe esse tipo.');
        }
    }
}


export const queueService = new QueueServiceFactory().factory('RabbitQueueService');
