const Room = require("../model/room");
const User = require("../model/user");

async function createRoom(req, res) {
  try {
    console.log(req.body);
    const { roomId, createdBy, participants, contents } = req.body;
    
    const user = await User.findOne({ username: createdBy.username });
    if (!user) {
      return res.status(400).json({ error: "Creator user does not exist" });
    }
  
    const newRoom = new Room({
      roomId,
      createdBy,
      participants: participants || [],
      messages: [],
      contents: "",
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getRoom(req, res) {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const username =
      req.user?.username || req.user?.newUser?.username;

    console.log("USERNAME:", username);

    const isParticipantOrCreator =
      room.createdBy.username === username ||
      room.participants.some(
        (p) => p.username === username
      );

    if (!isParticipantOrCreator) {
      return res.status(403).json({
        error: "Access denied. You're not a participant or the creator.",
      });
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function joinRoom(req, res) {
  try {
    const { roomId } = req.params;

    const username =
      req.user?.username || req.user?.newUser?.username;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // check already participant
    const alreadyJoined = room.participants.some(
      (p) => p.username === username
    );

    // if not joined → add user
    if (!alreadyJoined) {
      room.participants.push({ username });
      await room.save();
    }

    res.status(200).json({
      message: "Joined successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




async function updateRoom(req, res) {
  try {
    const { roomId } = req.params;
    const updates = req.body;

    // Find the room by roomId
    const room = await Room.findOne({ roomId : roomId });
    console.log(room);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

   
    let { username } = req.user;
      
       if(username===undefined && "newUser" in req.user)
        {
          console.log("User request from web socket server " + req.user)
           username = req.user.newUser.username
        }
    console.log("REQUEST SENT BY : ",username)
    const isParticipantOrCreator = room.createdBy.username === username || 
      room.participants.some(participant => participant.username === username);

    if (!isParticipantOrCreator) {
      return res.status(403).json({ error: "Permission denied. You are not a participant or the creator." });
    }

    // Perform the update
    const updatedRoom = await Room.findOneAndUpdate({ roomId }, updates, { new: true });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function deleteRoom(req, res) {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    
    const { username } = req.user.newUser; 
    console.log("DELETE",username)
    if (room.createdBy.username !== username) {
      return res.status(403).json({ error: "Permission denied. Only the creator can delete this room." });
    }

  
    await Room.findOneAndDelete({ roomId });
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  joinRoom,
};
