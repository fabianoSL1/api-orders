import { Kafka } from "kafkajs";
import order from "../models/Order.js";

const kafka = new Kafka({
    clientId: 'orders',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'orders-group' });

export async function startConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'orders.updated', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            if (!message.value) {
                console.log(`empty message`);
                return;
            }

            const { orderId, status, date } = JSON.parse(message.value.toString());

            await order.findByIdAndUpdate(orderId, {
                $set: { status },
                $push: {
                    logs: { status, date: new Date(date) }
                }
            });
        }
    });
    
}