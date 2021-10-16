const { Schema, model } = require('mongoose');

const walletSchema = new Schema(
  {
    _userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      _id: true,
    },
    name: {
      type: String,
      min: 3,
      max: 32,
      required: true,
    },
    document: {
      type: String,
      required: true,
      unique: true,
    },
    cash: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = () => model('wallet', walletSchema);
