import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import WriteBlog from "./pages/WriteBlog";
import "./styles/ios.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/edit/:id" element={<WriteBlog />} />   {/* IMPORTANT */}
      </Routes>
    </Router>
  );
}

export default App;