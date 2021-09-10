import React ,{useState,useEffect} from 'react'
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import EditModal from '../Modal/EditModal'
import { TextField, Button, Typography, Paper,CircularProgress, Grid } from '@material-ui/core';
import FileBase from 'react-file-base64';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { createPost,updatePost } from '../../actions/posts';
const Form = ({currentId,setCurrentId,props}) => {
  const {isPosting} = useSelector((state) => state.posts);
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const [showSnack, setShowSnack] = useState(false);
  const [snackType, setSnackType] = useState('');
  const user =JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const [postData, setPostData] = useState({
        title:'',
        message:'',
        tags:'',
        slectefFile:''
    });
    const dispatch =useDispatch();
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setShowSnack(false);
    };
    useEffect(() => {
      if (post)setPostData(post);
    }, [post]);
    const clear=()=>{
        setCurrentId(0);
        setPostData({  title: '', message: '', tags: '', selectedFile: '' });
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(currentId){
          dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
          clear();
          setSnackType('Update')
          setShowSnack(true);
        }else{
          dispatch(createPost({...postData,name:user?.result?.name}));
          if (!isPosting)
          { clear();}
          setSnackType('Post');
          setShowSnack(true);
        }
        
    };
    
if (!user?.result?.name) {
  return (
    <Paper className={classes.paper} elevation={6}>
      <Typography variant='h6' align='center'>
        Please sign in to create a memory.
      </Typography>
    </Paper>
  );
}

    return (
      <>
        <Paper className={classes.paper}  elevation={6}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
          <Typography variant="h6">{currentId ? 'Edit memory':'Create a memory'}</Typography>
          <TextField name="title" variant="outlined" label="Title" fullWidth  onChange={(e)=>setPostData({...postData,title:e.target.value})}/>
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4}  onChange={(e)=>setPostData({...postData,message:e.target.value})}  />
          <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth  onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, slectedFile: base64 })}/></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>{currentId ? 'Edit':'Post'}   
          {isPosting && <CircularProgress className={classes.loading}   color='secondary' />}
            </Button>
          <Button variant="contained" color="secondary" size="small"  fullWidth onClick={clear}>Clear</Button>
          {!isPosting &&
          <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={showSnack}
        autoHideDuration={7000}
        onClose={handleClose}
        message={snackType==='Post'?'Memory added': 'Memory updated'}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
}
        </form>
      </Paper>
      <div className={classes.center}/>
      <EditModal setCurrentId={setCurrentId} currentId={currentId} post={post}/>
      <div/>
      </>
    );
}


export default Form
