const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctOption: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(value) {
        return value < this.options.length;
      },
      message: props => `correctOption must be less than the length of options array (${props.value})`
    }
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
