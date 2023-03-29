import mongoose from 'mongoose'
mongoose.connect(process.env.MONGO_URL as string)

const profile = mongoose.model(
  'profile',
  new mongoose.Schema({
    nickname: { type: String, required: true, unique: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'profile' }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chat' }],
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'profile' }]
  })
)
export default profile
