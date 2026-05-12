function NoteList({ notes, onDelete }) {
  if (notes.length === 0) return <p>No notes yet. Add one above!</p>;

  return (
    <ul
      style={{
        flex: 1,
        listStyle: "none",
        padding: 0,
      }}
    >
      {notes.map((note) => (
        <li
          key={note.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "30px",
            padding: "12px 16px",
            marginBottom: "10px",
            background: "#f9f9f9",
            borderRadius: "8px",
            border: "1px solid #eee",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {note.qr && (
              <img
                src={note.qr}
                alt={`QR for ${note.id}`}
                style={{ width: "60px", height: "60px" }}
              />
            )}
            <span>{note.text}</span>
          </div>

          <button
            onClick={() => onDelete(note.id)}
            onMouseEnter={(e) => (e.target.style.background = "#cc0000")}
            onMouseLeave={(e) => (e.target.style.background = "#ff4d4d")}
            style={{
              width: "80px",
              marginLeft: "0px",
              background: "#ff4d4d",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
