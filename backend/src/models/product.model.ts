import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    cost: number;
    stock: number;
    createdAt: Date;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
