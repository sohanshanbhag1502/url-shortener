import UrlShortener from "./components/UrlShortener.tsx";
import RedirectElement from "./components/RedirectElement.tsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/:id" element={<RedirectElement />} />
      </Routes>
    </Router>
  );
}

export default App
