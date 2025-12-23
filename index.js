const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// ===============================================
// 1) CONNECT TO MONGODB ATLAS
// ===============================================

mongoose.connect(
    "mongodb+srv://admin:saimzaidi@cluster0.tdskrt4.mongodb.net/cryptodb?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));


// ===============================================
// 2) MONGODB SCHEMA
// ===============================================

const messageSchema = new mongoose.Schema({
    original_message: String,
    encrypted_message: String,
    decrypted_message: String,
    cipher_used: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);


// ===============================================
// 3) SAVE API ROUTE
// ===============================================

app.post("/save", async (req, res) => {
    try {
        const msg = new Message({
            original_message: req.body.original,
            encrypted_message: req.body.encrypted,
            decrypted_message: req.body.decrypted,
            cipher_used: req.body.cipher
        });

        await msg.save();
        res.send("Message saved successfully!");
    }
    catch (err) {
        console.error("Save Error:", err);
        res.status(500).send("Failed to save message.");
    }
});


// ===============================================
// 4) START SERVER
// ===============================================

app.listen(3000, () => console.log("Server running on port 3000 (MongoDB Atlas)"));
