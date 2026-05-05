const express = require('express');
const router = express.Router();


const {
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  joinRoom   
} = require('../controllers/room-controller');

router.post("/", createRoom);

router.post("/:roomId/join", joinRoom);

router.get("/:roomId", getRoom);
router.put("/:roomId", updateRoom);
router.delete("/:roomId", deleteRoom);

module.exports = router;