import { Schema, model, models } from 'mongoose'

const textSchema = new Schema({
  text: {
    type: String,
    default: ''
  },
  coords: {
    type: Array<number>,
    required: true
  },
  style: {
    color: {
      type: String,
      default: '#000'
    },
    fontSize: {
      type: String,
      default: '16px'
    },
  }
}, { timestamps: true })
const TextModel = models.text || model('text', textSchema)
export default TextModel;