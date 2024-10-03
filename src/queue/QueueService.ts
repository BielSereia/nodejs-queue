export abstract class QueueService {
    public abstract connect(url: string): Promise<void>;
    public abstract createChannel(): Promise<void>;
    public abstract assertQueue(queue: string): Promise<void>;
    public abstract listener(queue: string, callback?: any): Promise<void>;
    public abstract sendToQueue(queue: string, content: any): Promise<void>;
}

export enum QueueServiceType {
    RabbitQueueService = 'RabbitQueueService'
}
