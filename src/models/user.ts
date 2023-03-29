import mongoose from 'mongoose'
mongoose.connect(process.env.MONGO_URL as string)

const user = mongoose.model(
  'user',
  new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'profile',
      required: true,
      unique: true
    }
  })
)
export default user
