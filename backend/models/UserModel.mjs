import mongoose, { Mongoose } from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { wallet } from '../server.mjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must be given'],
  },
  email: {
    type: String,
    required: [true, 'Email must be given'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'The email is wrong',
    ],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Password is missing'],
    minlength: 6,
    select: false,
  },
  
  publicKey: {
    type: String,
    required: [true, 'Public Key is required']
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.validatePassword = async function (passwordToCheck) {
  return await bcrypt.compare(passwordToCheck, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, address: this.publicKey }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TTL,
  });
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordTokenExpire = new Date(Date.now() + 10 * 60 * 1000);

  return this.resetPasswordToken;
};

export default mongoose.model('User', userSchema);
