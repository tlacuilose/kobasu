import { AppBar, Toolbar, Typography } from '@mui/material';

interface TopBarProps {
  text?: string;
  children?: JSX.Element;
}

const TopBar = (props: TopBarProps) => (
  <AppBar position='static'>
    <Toolbar>
      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
        Kobasu {props.text}
      </Typography>
      {props.children}
    </Toolbar>
  </AppBar>
);

export default TopBar;
