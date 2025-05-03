import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import MessageSection from "./components/MessageSection";

function App() {
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route path="/index.html" element={<MessageSection />} />
          <Route path="/chat" element={<MessageSection />} />
          <Route path="/ask" element={<div>Ask Component</div>} />
          <Route path="/search" element={<div>Search Component</div>} />
          <Route path="/write" element={<div>Write Component</div>} />
          <Route path="/image" element={<div>Image Component</div>} />
          <Route path="/chatfile" element={<div>ChatFile Component</div>} />
          <Route path="/vision" element={<div>Vision Component</div>} />
        </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
