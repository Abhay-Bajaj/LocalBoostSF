import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Landing from "./pages/Landing";
import Browse from "./pages/Browse";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import About from "./pages/About";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;