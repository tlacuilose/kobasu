import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import React from 'react';
import { web3 } from './data/web3/web3'

function App() {

  console.log(web3)
  return (
    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
      <Button>Save</Button>
    </Box>
  );
}

export default App;
