import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/dashboard";
import CV from "@/pages/CV";
import Pee from "@/pages/Pee";
import { ThemeProvider } from "@/components/theme/themeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/pee" element={<Pee />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
