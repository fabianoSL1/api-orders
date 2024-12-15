import { model, Schema, type Document } from "mongoose";

interface Order extends Document {
    customer: {
        name: string;
        email: string;
    };
    products: {
        name: string;
        amount: number;
    }[];
    status: string;
    address: string;
    logs: {
        status: string;
        date: Date;
    }[];
    createAt: Date;
}

const orderSchema = new Schema<Order>({
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true }
    },
    products: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true }
        }
    ],
    status: { type: String, required: true },
    logs: [
        {
            status: { type: String, required: true },
            date: { type: Date, required: true }
        }
    ],
    createAt: { type: Date, required: true, default: Date.now() }
})

export default model<Order>('Order', orderSchema);
