const router = require("express").Router();
const auth = require("../middleware/auth");

// ✅ IMPORT CONTROLLER
const {
  getItems,
  addItem,
  updateItem,
  deleteItem
} = require("../controllers/itemController");

// ✅ ROUTES
router.get("/", auth, getItems);
router.post("/", auth, addItem);
router.put("/:id", auth, updateItem);
router.delete("/:id", auth, deleteItem);

module.exports = router;