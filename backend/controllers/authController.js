const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// ---------------- REGISTER ----------------
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    // Check duplicate email
    const [existing] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name,email,phone,password,) VALUES (?,?,?,?)",
      [name, email, phone, hash]
    );

    res.json({ msg: "Registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (!rows.length) {
      return res.status(400).json({ msg: "User not found" });
    }

    const user = rows[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      name: user.name
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------- FORGOT PASSWORD ----------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (!rows.length) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = rows[0];

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");

    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // Save token in DB
    await db.query(
      "UPDATE users SET reset_token=?, reset_token_expiry=? WHERE email=?",
      [token, expiry, email]
    );

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h3>Password Reset</h3>
        <p>Hello ${user.name},</p>
        <p>Click below link to reset your password (valid for 10 minutes):</p>
        <a href="${resetLink}">${resetLink}</a>
      `
    });

    res.json({ msg: "Reset link sent to email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------- RESET PASSWORD ----------------
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ msg: "Password too short" });
    }

    const [rows] = await db.query(
      "SELECT * FROM users WHERE reset_token=? AND reset_token_expiry > NOW()",
      [token]
    );

    if (!rows.length) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const user = rows[0];

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET password=?, reset_token=NULL, reset_token_expiry=NULL WHERE id=?",
      [hashed, user.id]
    );

    res.json({ msg: "Password updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};