import express from 'express';
import { queueService } from './queue/QueueServiceFactory';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(process.env.servidor);
});

app.listen(3000, async () => {
    // await queueService.connect('amqp://guest:guest@rabbitmq:5672').catch(e => console.log(e));
    // await queueService.createChannel();
    // await queueService.assertQueue('superFila');

    console.log('Servidor escutando na porta 3000a');
});
