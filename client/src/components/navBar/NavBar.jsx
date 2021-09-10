import React ,{useState,useEffect} from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { useHistory,useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import memories from '../../images/memories.png';
import useStyles from './styles';
const NavBar = () => {
    const classes = useStyles();
    const location=useLocation();
    const history=useHistory();
    const dispatch=useDispatch();
   const [user, setUser] = useState();
   useEffect(() => {
     const token=user?.token;
     if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
     setUser(JSON.parse(localStorage.getItem('profile')));
     
   }, [location])
   const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setUser(null);
    history.push('/auth');
  };
    return (
      <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img className={classes.image} src={memories} alt="icon" height="50px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
    )
}

export default NavBar
