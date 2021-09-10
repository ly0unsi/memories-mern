import React ,{useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, ButtonBase ,Typography } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost,likePost } from '../../../actions/posts';
const Post = ({post,setCurrentId,currentId}) => {
    const dispatch = useDispatch();
    const user =JSON.parse(localStorage.getItem('profile'));
    const history=useHistory()
    const num=post.likes.findIndex((id) => id === String(user?.result?.googleId || user?.result?._id));
    const like=()=>{
      dispatch(likePost(post._id));
    }
    const openPost = (e) => {
      // dispatch(getPost(post._id, history));
  
      history.push(`/posts/${post._id}`);
    };
  
    const classes = useStyles();
    return (
      <>
        <Card className={classes.card} raised elevation={6}>
          
        <CardMedia className={classes.media} image={post.slectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={()=>setCurrentId(post._id)} ><MoreHorizIcon fontSize="default" /></Button>
        </div>
        <ButtonBase
            component="span"
            name="test"
            className={classes.cardAction}
            onClick={openPost}
      >
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h3">{post.tags.map((tag) =><Chip  label={`#${tag}` }/>)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
        {user?<IconButton onClick={like} size="small" color="primary" >{num===-1?<FavoriteBorderOutlinedIcon fontSize="medium" />:<FavoriteIcon fontSize="medium" />} {post.likes.length}   </IconButton>:null}
          {user?post.name==user?.result?.name?<IconButton size="small" color="secondary" onClick={()=>dispatch(deletePost(post._id))} ><DeleteIcon fontSize="medium" /></IconButton>:null:null}
        </CardActions>
      </Card>
    
       
          
      
      </>
    )
}

export default Post
