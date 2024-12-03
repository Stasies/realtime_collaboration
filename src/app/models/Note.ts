import { Schema, model, models } from 'mongoose'

const noteSchema = new Schema({
  text: {
    type: String,
    default: ''
  },
  coords: {
    type: Array<number>,
    required: true
  },
  style: {
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    backgroundColor: {
      type: String,
      default: 'lightyellow'
    }
  }
}, { timestamps: true })
const NoteModel = models.note || model('note', noteSchema)
export default NoteModel;