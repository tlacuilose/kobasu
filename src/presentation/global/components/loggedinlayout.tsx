import React from "react";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, Outlet } from "react-router-dom";

const LoggedInLayout = (props: { user: string }) => {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
              Kobasu | { props.user }
            </Typography>
            <Link to="/">
              <Button color="inherit">Logout</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="md" sx={{ marginTop: "16px"}}>
        <Outlet />
      </Container>
    </React.Fragment>
  );
}

export default LoggedInLayout;
