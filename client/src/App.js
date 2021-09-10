import './App.css';
import { Container } from '@material-ui/core';
import React from 'react';
import { Paper, Typography } from '@material-ui/core/';
import NavBar from './components/navBar/NavBar';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import useStyles from './styles';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const classes = useStyles();
  return (
    <BrowserRouter >
      <Container maxWidth="xl">
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to='/posts' />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Home />)} />
          <Route path="/posts/:id" exact component={PostDetails} />
        </Switch>
        <Paper elevation={6} className={classes.footer}>
          <Typography variant="h6" color='primary' component="h6">
            Developed By Abdllah Lyounsi</Typography>
          <Typography variant="h6" component="h6">Copyright 2021 ©</Typography>
        </Paper >
      </Container>
    </BrowserRouter>

  );
}

export default App;
