import * as api from '../api/index.js';
//Action Creators
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

        dispatch({ type: 'FETCH_ALL', payload: { data, currentPage, numberOfPages } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error);
    }
};
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });

        const { data } = await api.fetchPost(id);

        dispatch({ type: 'FETCH_POST', payload: { post: data } });
    } catch (error) {
        console.log(error);
    }
};
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: 'FETCH_BY_SEARCH', payload: { data } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error);
    }
};
export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: 'START_POSTING' });
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data });
        dispatch({ type: 'END_POSTING' });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        dispatch({ type: 'START_UPDATING' });
        const { data } = await api.updatePost(id, post);
        dispatch({ type: 'UPDATE', payload: data });
        dispatch({ type: 'END_UPDATING' });
    } catch (error) {
        console.log(error.message);
    }
};
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error);
    }
};
export const likePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LIKING' });
        const { data } = await api.likePost(id);

        dispatch({ type: 'UPDATE', payload: data });
        dispatch({ type: 'END_LIKING' });
    } catch (error) {
        console.log(error.message);
    }
};


