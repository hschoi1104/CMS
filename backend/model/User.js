import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const User = new Schema({
  id: {
    type: String,
    trin: true,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    tring: true,
    required: true,
  },
  name: {
    type: String,
  },
  isManager: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', User);
