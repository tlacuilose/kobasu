import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import React from 'react';

function App() {
  return (
    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
      <Button>Save</Button>
    </Box>
  );
}

export default App;
