const express = require("express");
const cors = require("cors");
const { connectDB } = require("../lib/db");
const Message = require("../models/Message");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", async (req, res) => {
    await connectDB();
    res.json({ message: "Backend running on Vercel 🚀" });
});

// SAVE API
app.post("/save", async (req, res) => {
    try {
        await connectDB();

        const msg = new Message({
            original_message: req.body.original,
            encrypted_message: req.body.encrypted,
            decrypted_message: req.body.decrypted,
            cipher_used: req.body.cipher
        });

        await msg.save();
        res.send("Message saved successfully!");
    } catch (err) {
        console.error("Save Error:", err);
        res.status(500).send("Failed to save message.");
    }
});

module.exports = app;
