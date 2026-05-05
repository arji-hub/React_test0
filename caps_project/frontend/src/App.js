import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Note from "./Note";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/note" element={<Note />} />
      </Routes>
    </Router>
  );
}

export default App;
