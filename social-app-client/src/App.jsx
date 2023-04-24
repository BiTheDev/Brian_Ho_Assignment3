import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';

const App = () => {
  // Here you would set the state for isLoggedIn and username based on your authentication logic
  const isLoggedIn = false;
  const username = 'John Doe';

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} username={username} />
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users/:userId" element={<UserPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
