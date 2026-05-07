import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Note from "./Note";
import NotePage from "./NotePage"; 

function App() {
  return (
    //asdsadsad
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/note" element={<Note />} />
        <Route path="/note/:id" element={<NotePage />} />
      </Routes>
    </Router>
  );
}

export default App;
