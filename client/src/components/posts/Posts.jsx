import React from 'react';
import { Grid } from '@material-ui/core';
import SkeletonArticle from '../../skeletons/SkeletonArticle';
import { useSelector } from 'react-redux';
import Post from './post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return 'No posts';

  return (
    <>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} currentId={post._id} />
          </Grid>
        ))}
      </Grid>
      {!posts.length &&
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {[1,2,3,4,5,6,7,8].map((n) =>( <Grid key={n} item xs={12} sm={12} md={6} lg={3}>
          <SkeletonArticle key={n} theme="dark" />
          </Grid>
        ))}
      </Grid>
}
      </>
  );
};

export default Posts;