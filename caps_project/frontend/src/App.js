import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function App() {
  const [notes, setNotes] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);

  //testing comment merge conflict

  // Fetch notes in real time from Firebase
  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("number"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(data);

      // Find the highest note number and set next number
      if (data.length > 0) {
        const maxNumber = Math.max(...data.map((n) => n.number));
        setNextNumber(maxNumber + 1);
      }
    });

    return () => unsubscribe();
  }, []);

  // Add a new note with custom incremental ID
  const addNote = async (text) => {
    const noteId = `note${String(nextNumber).padStart(3, "0")}`;
    await setDoc(doc(db, "notes", noteId), {
      text,
      number: nextNumber,
      createdAt: new Date(),
    });
  };

  // Delete a note from Firebase
  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
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
