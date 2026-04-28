function NoteList({ notes, onDelete }) {
  if (notes.length === 0) return <p>No notes yet. Add one above!</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {notes.map((note) => (
        <li
          key={note.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            marginBottom: "10px",
            background: "#f9f9f9",
            borderRadius: "8px",
            border: "1px solid #eee",
          }}
        >
          <span>{note.text}</span>
          <button
            onClick={() => onDelete(note.id)}
            style={{ background: "#ff4d4d", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", cursor: "pointer" }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;