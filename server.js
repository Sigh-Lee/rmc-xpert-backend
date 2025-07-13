// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Simple route
app.get('/', (req, res) => {
  res.send('RMC X-PERT Backend is running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Add to server.js or routes/mentor.js
app.post("/api/mentor/set-mt5", async (req, res) => {
  const { mentorId, mt5Login, mt5Password, mt5Server } = req.body;
  await db.collection("mentors").updateOne(
    { mentorId },
    { $set: { mt5Login, mt5Password, mt5Server } },
    { upsert: true }
  );
  res.json({ message: "Mentor MT5 credentials saved ✅" });
});

// Add to server.js or routes/client.js
app.post("/api/client/set-mt5", async (req, res) => {
  const { licenseKey, mt5Login, mt5Password, mt5Server } = req.body;
  const client = await db.collection("licenses").findOne({ licenseKey });
  if (!client) return res.status(400).json({ error: "Invalid license" });

  await db.collection("clients").updateOne(
    { licenseKey },
    {
      $set: {
        mt5Login,
        mt5Password,
        mt5Server,
        mentorId: client.mentorId
      }
    },
    { upsert: true }
  );
  res.json({ message: "Client MT5 credentials saved ✅" });
});
