import mongoose from 'mongoose'
mongoose.connect(process.env.MONGO_URL as string)

const message = mongoose.model(
  'message',
  new mongoose.Schema({
    content: { type: String },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'profile',
      required: true
    }
  })
)
export default message
