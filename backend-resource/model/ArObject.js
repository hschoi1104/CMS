import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
const Schema = mongoose.Schema;
const ArObject = new Schema({
  objectId: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  s3Info: {
    type: JSON,
  },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  modifiedManager: {
    type: String,
    required: true,
    trim: true,
  },
  averageScore: {
    type: Number,
    default: 0,
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
});

autoIncrement.initialize(mongoose.connection);
ArObject.plugin(autoIncrement.plugin, {
  model: 'ArObject',
  field: 'objectId',
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model('ArObject', ArObject);
