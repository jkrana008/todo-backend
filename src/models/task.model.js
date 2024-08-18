const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

taskSchema.pre('find', function () {
  this.where({ isDeleted: false });
});

taskSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

module.exports = mongoose.model('Task', taskSchema);
