import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import QRCode from "qrcode";

function App() {
  const [notes, setNotes] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("number"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(data);

      if (data.length > 0) {
        const maxNumber = Math.max(...data.map((n) => n.number));
        setNextNumber(maxNumber + 1);
      }
    });

    return () => unsubscribe();
  }, []);

  const generateQRWithLogo = (url, logoSrc) => {
    return new Promise((resolve) => {
      QRCode.toDataURL(url, { 
          width: 300, 
          margin: 2,
          errorCorrectionLevel: 'H', // Ensures high scannability with custom cutout shapes
          color: {
            dark: "#B84E1A", 
            light: "#FFFFFF", 
          }
        }, (err, qrDataUrl) => {
        const canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext("2d");

        const qrImg = new Image();
        qrImg.src = qrDataUrl;
        qrImg.onload = () => {
          ctx.drawImage(qrImg, 0, 0, 300, 300);

          const logo = new Image();
          logo.src = logoSrc;
          logo.onload = () => {
            const logoSize = 75; 
            const center = (300 - logoSize) / 2;

            const maskCanvas = document.createElement("canvas");
            maskCanvas.width = 300;
            maskCanvas.height = 300;
            const maskCtx = maskCanvas.getContext("2d");

            maskCtx.drawImage(logo, center, center, logoSize, logoSize);

            ctx.save();
            ctx.globalCompositeOperation = "destination-out";
            ctx.drawImage(maskCanvas, 0, 0);
            ctx.restore();

            ctx.drawImage(logo, center, center, logoSize, logoSize);

            resolve(canvas.toDataURL("image/png"));
          };

          logo.onerror = () => {
            resolve(canvas.toDataURL("image/png"));
          };
        };
      });
    });
  };

  const addNote = async (text) => {
    const noteId = `note${String(nextNumber).padStart(3, "0")}`;
    const noteURL = `https://notes-528dc.web.app/note/${noteId}`;
    const convertURL = await generateQRWithLogo(noteURL, "/cict-logo.png");

    await setDoc(doc(db, "notes", noteId), {
      text,
      number: nextNumber,
      createdAt: new Date(),
      qr: convertURL,
    });
  };

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