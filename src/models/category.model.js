const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

categorySchema.pre('find', function () {
  this.where({ isDeleted: false });
});

categorySchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

module.exports = mongoose.model('Category', categorySchema);
