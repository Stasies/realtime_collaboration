import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
  },
  roomId: { type: Schema.Types.ObjectId, ref: 'room' }
}, { timestamps: true })

const UserModel = models.note || model('user', userSchema)

export default UserModel;