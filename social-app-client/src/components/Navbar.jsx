import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../authContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }} >
          Social App
        </Typography>
        {!user ? (
          <Box>
            <Button href="/login" color="inherit">
              Login
            </Button>
            <Button href="/register" color="inherit">
              Register
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="subtitle1" component="div" sx={{ marginRight: 2 }}>
              Welcome, {user.username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
