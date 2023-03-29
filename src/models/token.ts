import mongoose from 'mongoose'
mongoose.connect(process.env.MONGO_URL as string)

const token = mongoose.model(
  'token',
  new mongoose.Schema({
    content: { type: String, required: true, unique: true }
  })
)

export default token
