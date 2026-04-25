import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar          from "./components/Navbar";
import Footer          from "./components/Footer";
import ScrollToTop     from "./components/ScrollToTop";
import ProtectedRoute  from "./components/ProtectedRoute";

import Home        from "./pages/Home";
import Search      from "./pages/Search";
import Favorites   from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";
import Login       from "./pages/Login";
import Register    from "./pages/Register";
import NotFound    from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/search"     element={<Search />} />
            <Route path="/movie/:id"  element={<MovieDetail />} />
            <Route path="/login"      element={<Login />} />
            <Route path="/register"   element={<Register />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;