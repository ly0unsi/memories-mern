import useStyles from './styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography, Paper, CircularProgress } from '@material-ui/core';
import FileBase from 'react-file-base64';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { updatePost } from '../../actions/posts';
export default function EditModal({ post, setCurrentId, currentId }) {
    const classes = useStyles();
    const { isUpdating } = useSelector((state) => state.posts);
    const [showSnack, setShowSnack] = useState(false);
    const [snackType, setSnackType] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const [open, setOpen] = useState(false);
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        slectedFile: ''
    });
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    };

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
            setSnackType('Update')
            setShowSnack(true)
        }

    };


    useEffect(() => {
        if (!post) {
            setOpen(false)

        } else {
            setPostData(post)
            setOpen(true)
        }
    }, [post]);

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleCloseModal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper className={classes.paper} elevation={6}>
                        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                            <Typography variant="h6">{currentId ? 'Edit memory' : 'Create a memory'}</Typography>
                            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                            <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                            <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, slectedFile: base64 })} /></div>
                            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>{currentId ? 'Edit' : 'Post'}

                            </Button>
                            <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
                            {!isUpdating &&
                                <Snackbar
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    open={showSnack}
                                    autoHideDuration={7000}
                                    onClose={handleClose}
                                    message={snackType === 'Post' ? 'Memory added' : 'Memory updated'}
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
                </Fade>
            </Modal>
        </>
    );
}
