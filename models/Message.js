const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    original_message: String,
    encrypted_message: String,
    decrypted_message: String,
    cipher_used: String,
    timestamp: { type: Date, default: Date.now }
});

// IMPORTANT FIX 👇
module.exports =
    mongoose.models.Message ||
    mongoose.model("Message", messageSchema);
