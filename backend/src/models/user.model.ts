import { Schema, model, Document } from 'mongoose';

// טיפוס עבור TypeScript (לא חובה אבל מומלץ)
export interface IUser extends Document {
	username: string;
	hashedPassword: string;
	createdAt: Date;
}

// סכימה למסד
const userSchema = new Schema<IUser>({
	username: { type: String, required: true, unique: true },
	hashedPassword: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

// מודל Mongoose
const User = model<IUser>('User', userSchema);

// ייצוא של המודל
export default User;