import amqplib, { Connection, Channel } from 'amqplib';

import { QueueService } from "../QueueService";

export class RabbitQueueService extends QueueService {
    private connection: Connection | undefined;
    private channel: Channel | undefined;

    public async connect(url: string): Promise<void> {
        this.connection = await amqplib.connect(url);
    }

    public async createChannel(): Promise<void> {
        if (!this.connection) throw new Error('Não existe uma conexão.');

        try {
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.log(error)
        }
    }

    public async assertQueue(queue: string): Promise<void> {
        if (!this.channel) throw new Error('Não existe um canal.');

        await this.channel.assertQueue(queue);
    }
    
    public async listener(queue: string, callback?: any): Promise<void> {
        if (!this.channel) throw new Error('Não existe um canal.');

        await this.channel.consume(queue, (message) => {
            if (!message) throw new Error('Cade a porra da mensagem ?');

            callback(JSON.parse(message.content.toString()));
            this.channel?.ack(message);
        })
    }

    public async sendToQueue(queue: string, content: any): Promise<void> {
        if (!this.channel) throw new Error('Não existe um canal.');

        const buffer = Buffer.from(JSON.stringify(content));
        this.channel.sendToQueue(queue, buffer);
    }
}
