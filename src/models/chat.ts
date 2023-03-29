import mongoose from 'mongoose'
mongoose.connect(process.env.MONGO_URL as string)

const chat = mongoose.model(
  'chat',
  new mongoose.Schema({
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
      }
    ],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
  })
)
export default chat
