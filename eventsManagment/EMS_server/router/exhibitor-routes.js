const express = require("express");
const router = express.Router();
const exhibitorController = require("../controllers/exhibitor-controller");
const authMiddleware =require("../middlewares/authMiddleware")
// Public routes
router.post("/register", exhibitorController.registerExhibitor);

// Admin-only routes
router.get("/", exhibitorController.getExhibitors);
router.put("/:id/status", exhibitorController.updateExhibitorStatus);
router.put("/:id/assign-booth", exhibitorController.assignBooth);

// Get available booths
router.get("/available-booths", exhibitorController.getAvailableBooths);
router.get("/me", authMiddleware, exhibitorController.getMyExhibitor);
router.post("/publish", authMiddleware,exhibitorController.publishEvent);

module.exports = router;
