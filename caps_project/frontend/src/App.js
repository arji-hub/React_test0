import { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

const API = "http://localhost:5000";

function App() {
  const [notes, setNotes] = useState([]);

  //add comment to test commit 1
  //switch branch to test branch sampleone test

  // Add a new note
  const addNote = (text) => {
    fetch(`${API}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((newNote) => setNotes([...notes, newNote]));
  };

  // Delete a note
  const deleteNote = (id) => {
    fetch(`${API}/notes/${id}`, { method: "DELETE" }).then(() =>
      setNotes(notes.filter((n) => n.id !== id)),
    );
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
      <h1>📝 My Notes</h1>
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
}

export default App;
