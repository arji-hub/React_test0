// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory storage (no database needed for now)
let notes = [
  { id: 1, text: "Welcome to your Notes App!" },
  { id: 2, text: "Click delete to remove a note." },
];
let nextId = 3;

// GET all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// POST a new note
app.post("/notes", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const newNote = { id: nextId++, text };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// DELETE a note by ID
app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) return res.status(404).json({ error: "Note not found" });

  notes.splice(index, 1);
  res.json({ message: "Note deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
