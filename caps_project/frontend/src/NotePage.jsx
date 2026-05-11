import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function NotePage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      const docRef = doc(db, "notes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNote(docSnap.data());
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    fetchNote();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (notFound) return <p>Note not found.</p>;

  return (
    <div>
      <p>ID: {id}</p>
      <p>Text: {note.text}</p>
    </div>
  );
}

export default NotePage;