import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectLog = new Schema({
  objectId: { type: Number, index: true },
  created: { type: Date, default: Date.now, unique: true },
});

module.exports = mongoose.model('ObjectLog', ObjectLog);
