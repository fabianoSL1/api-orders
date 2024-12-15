import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'orders',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

export async function sendMessage(topic: string, message: unknown) {
    const messages = [{ value: JSON.stringify(message) }];

    await producer.connect();
    await producer.send({ topic, messages });
}