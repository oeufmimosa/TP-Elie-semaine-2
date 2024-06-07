import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.methods.encryptPassword = function(password) {
    const secret = process.env.HMAC_SECRET;
    return crypto.createHmac('sha256', secret).update(password).digest('hex');
};

const User = mongoose.model('User', userSchema);
export default User;
