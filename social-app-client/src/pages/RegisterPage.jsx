import { Container, Typography, TextField, Button } from '@mui/material';

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form>
        <TextField fullWidth label="Username" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <Button fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
