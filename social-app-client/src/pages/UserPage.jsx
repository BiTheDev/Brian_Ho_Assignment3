import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Replace this URL with the actual API endpoint for fetching the user data.
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {user.username}
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Joined: {new Date(user.joined).toLocaleDateString()}
      </Typography>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Button variant="outlined" color="primary">
          Edit Description
        </Button>
      </Box> */}
      <Typography variant="body1" paragraph>
        {user.description}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Status Feeds
      </Typography>
      {user.statusUpdates.map((update) => (
        <Box key={update.id} sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1">
            {new Date(update.timestamp).toLocaleString()}
          </Typography>
          <Typography variant="body1" paragraph>
            {update.content}
          </Typography>
        </Box>
      ))}
    </Container>
  );
};

export default UserPage;
