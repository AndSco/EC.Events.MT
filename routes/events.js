const express = require("express");
const router = express.Router();
const {
  createNewEvent,
  fetchAllEvents,
  getEvent,
  deleteEvent,
  editEvent,
  uploadEventProgramme,
  deleteProgrammeWhenEditing,
  getEventWithoutParticipants
} = require("../handlers/events");

const permissionsMiddleware = require("../middlewares/hasAdminPermission");

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const { cloudName, cloudinaryKey, cloudinarySecret } = require("../config");

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "eventManager",
  allowedFormats: ["png", "jpg", "JPG", "PNG", "jpeg"]
});

const upload = multer({ storage: storage });


// Prefixed with /api/events
router.get("/", permissionsMiddleware, fetchAllEvents);
router.get("/:eventId", permissionsMiddleware, getEvent);
router.get("/:eventId/publicDetails", getEventWithoutParticipants);
router.post("/programmeUpload", permissionsMiddleware, upload.single("file"), uploadEventProgramme);
router.post("/", permissionsMiddleware, createNewEvent);
router.delete("/:eventId", permissionsMiddleware, deleteEvent);
router.delete("/programmes/:public_id", permissionsMiddleware, deleteProgrammeWhenEditing); // To delete programme when editing
router.patch("/:eventId", permissionsMiddleware, editEvent);



module.exports = router;