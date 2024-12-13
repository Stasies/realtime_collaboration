import { Schema, model, models } from 'mongoose'

const roomSchema = new Schema({
  _id: Schema.Types.ObjectId,
  text: {
    type: String,
    default: '',
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  notes: [{ type: Schema.Types.ObjectId, ref: 'note' }]
}, { timestamps: true })

const RoomModel = models.room || model('room', roomSchema)

export default RoomModel;