import "./App.css";
import Main from "./components/Main";
import Redirect from "./components/Redirect";
import NoPage404 from "./components/NoPage404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/404" element={<NoPage404 />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </Router>
    </>
  );
}
