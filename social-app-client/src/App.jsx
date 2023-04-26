import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import { AuthProvider } from "./authContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/users/:userId" element={<UserPage />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
