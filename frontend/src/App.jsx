import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Landing from "./pages/Landing";
import Browse from "./pages/Browse";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import About from "./pages/About";

function App() {
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing user={user} setUser={setUser} />} />
                <Route path="/browse" element={<Browse user={user} setUser={setUser} />} />
                <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
                <Route path="/create-post" element={<CreatePost user={user} setUser={setUser} />} />
                <Route path="/about" element={<About user={user} setUser={setUser} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;