import User from '../models/user.model';               // מודל שמתחבר למסד
import { verifyPassword } from '../utils/hash';
import { signToken } from '../utils/jwt';

export class AuthService {
	async login(username: string, password: string) {
		// חיפוש המשתמש במסד בעזרת Mongoose
		const user = await User.findOne({ username });

		if (!user) throw new Error('User not found');

		const isValid = await verifyPassword(password, user.hashedPassword);
		if (!isValid) throw new Error('Invalid credentials');

		const token = signToken({ userId: user._id });
		return { token };
	}
}