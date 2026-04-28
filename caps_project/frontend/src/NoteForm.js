import { useState } from "react";

function NoteForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        style={{ flex: 1, padding: "8px 12px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <button type="submit" style={{ padding: "8px 16px", fontSize: "16px", borderRadius: "6px", cursor: "pointer" }}>
        Add
      </button>
    </form>
  );
}

export default NoteForm;