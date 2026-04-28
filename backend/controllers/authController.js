const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (name,email,phone,password) VALUES (?,?,?,?)",
    [name, email, phone, hash]
  );

  res.json({ msg: "Registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [user] = await db.query("SELECT * FROM users WHERE email=?", [email]);
  if (!user.length) return res.status(400).json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, user[0].password);
  if (!valid) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);

  res.json({
  token,
  name: user[0].name   // ✅ VERY IMPORTANT
});
};

const crypto = require("crypto");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const [user] = await db.query("SELECT * FROM users WHERE email=?", [email]);

  if (!user.length) {
    return res.status(404).json({ msg: "User not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  await db.query(
    "UPDATE users SET reset_token=?, reset_token_expiry=? WHERE email=?",
    [token, expiry, email]
  );

   res.json({
    msg: "Reset token generated",
    token
  });
};


exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const [user] = await db.query(
    "SELECT * FROM users WHERE reset_token=? AND reset_token_expiry > NOW()",
    [token]
  );

  if (!user.length) {
    return res.status(400).json({ msg: "Invalid or expired token" });
  }

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "UPDATE users SET password=?, reset_token=NULL, reset_token_expiry=NULL WHERE id=?",
    [hashed, user[0].id]
  );

  res.json({ msg: "Password updated successfully" });
};