import { Hono } from "hono";
import Order from "../models/Order.js";
import { sendMessage } from "../kafka/producer.js";

export const ordersRoute = new Hono();

ordersRoute.post('/', async ctx => {
    const body = await ctx.req.json();
    const order = await Order.create({
        ...body,
        status: 'Pedido criado',
        logs: [{ status: 'Pedido criado', date: new Date() }]
    });

    return ctx.json(order);
});

ordersRoute.get('/', async ctx => {
    const orders = await Order.find();
    return ctx.json(orders);
});

ordersRoute.put('/:id/status', async ctx => {
    const { id } = ctx.req.param();
    const { status } = await ctx.req.json();

    const order = await Order.findById(id);

    if (!order) {
        return ctx.json({ message: 'Order not found' }, 404);
    }

    order.status = status;

    await order.save();

    await sendMessage('orders.updated', { orderId: id, status, date: Date.now() });
    return ctx.json(order);
})
