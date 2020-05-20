const express = require("express");
const router = express.Router();
const {
  createParticipant,
  updateParticipantRegistration,
  throwAwayParticipant,
  updateParticipantsInBulk
} = require("../handlers/participants");
const permissionsMiddleware = require("../middlewares/hasAdminPermission");


// prefixed with /api/participants
router.post("/:eventId", createParticipant);
router.patch("/:participantId", permissionsMiddleware, updateParticipantRegistration);
router.put("/bulkUpdate", permissionsMiddleware, updateParticipantsInBulk);
router.delete("/:participantId", permissionsMiddleware, throwAwayParticipant);

module.exports = router;