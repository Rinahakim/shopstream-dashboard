import { Schema, model, Document, Types } from 'mongoose';

export type OrderStatus = 'Processed' | 'In Delivery' | 'Delivered';

export interface IOrder extends Document { 
    customerName: string;
    productId: Types.ObjectId;
    quantity: number;
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
}

const orderSchema = new Schema<IOrder>({  // schema is a function that creates a new schema from a model
    customerName: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Processed', 'In Delivery', 'Delivered'], 
        required: true,
        default: 'Processed'
    },
    createdAt: { type: Date, default: Date.now },
});

const Order = model<IOrder>('Order', orderSchema); // model is a function that creates a new model from a schema
// Order.Create -> mongoose create a new document in the order collection 
export default Order;
