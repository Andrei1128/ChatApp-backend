import express from 'express'

import {
  findChat,
  createChat,
  addFriend,
  acceptFriend,
  declineFriend,
  removeFriend,
  getMyProfile,
  getFriendProfile,
  getAllFriendProfiles,
  getPeople
} from '../controllers/profile'
const router = express.Router()

router.get('/findChat/:id', findChat)
router.post('/createChat', createChat)
router.patch('/add', addFriend)
router.patch('/accept', acceptFriend)
router.patch('/decline', declineFriend)
router.patch('/remove', removeFriend)
router.get('/myProfile', getMyProfile)
router.get('/friends/:id', getFriendProfile)
router.get('/friends', getAllFriendProfiles)
router.get('/peoples/:nickname', getPeople)

export default router
