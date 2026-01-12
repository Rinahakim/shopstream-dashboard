import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    cost: number;
    stock: number;
    createdAt: Date;
}

const productSchema = new Schema<IProduct>({ // schema is a function that creates a new schema from a model
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Product = model<IProduct>('Product', productSchema); // model is a function that creates a new model from a schema

export default Product;
