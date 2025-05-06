const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event-controller");
const { getPublishedEvents } = require("../controllers/event-controller");
router.get("/published", getPublishedEvents);
router.route("/events").get(eventController.getEvents);
module.exports = router;
