import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = ({ isLoggedIn, username }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Social App
        </Typography>
        {!isLoggedIn ? (
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
              Welcome, {username}
            </Typography>
            <Button href="/logout" color="inherit">
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
