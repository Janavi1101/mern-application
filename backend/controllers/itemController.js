const db = require("../config/db");

// GET
exports.getItems = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM items WHERE user_id=?",
    [req.user.id]
  );
  res.json(rows);
};

// ADD
exports.addItem = async (req, res) => {
  const { title, description, status } = req.body;

  await db.query(
    "INSERT INTO items (title, description, status, user_id) VALUES (?,?,?,?)",
    [title, description, status, req.user.id]
  );

  res.json({ msg: "Item added" });
};

// UPDATE
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  await db.query(
    "UPDATE items SET title=?, description=?, status=? WHERE id=? AND user_id=?",
    [title, description, status, id, req.user.id]
  );

  res.json({ msg: "Item updated" });
};

// DELETE
exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  await db.query(
    "DELETE FROM items WHERE id=? AND user_id=?",
    [id, req.user.id]
  );

  res.json({ msg: "Item deleted" });
};