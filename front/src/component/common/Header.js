import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  noneStyle: {
    textDecoration: 'unset',
    color: 'white'
  }
});


function Header() {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={classes.noneStyle} to="/">Home</Link>
          </Typography>
          <Button variant="text">
            <Link to="signin" style={{ textDecoration: 'unset', color: 'white'}}>
              SignIn
            </Link>
          </Button>
          <Button variant="text">
            <Link to="signup" style={{ textDecoration: 'unset', color: 'white'}}>
              SignUp
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
