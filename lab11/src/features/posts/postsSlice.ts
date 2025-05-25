import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchPosts as fetchPostsAPI, createPost as createPostAPI, updatePost as updatePostAPI, deletePost as deletePostAPI } from './postsAPI';
import type { Post, NewPost } from './postsAPI';

interface PostsState {
    items: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    nextId: number;
}

const initialState: PostsState = {
    items: [],
    status: 'idle',
    error: null,
    nextId: 1000 
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        return await fetchPostsAPI();
    }
);

export const addPost = createAsyncThunk(
    'posts/addPost',
    async (newPost: NewPost, { getState }) => {
        try {
            await createPostAPI(newPost);

            const state = getState() as { posts: PostsState };
            return {
                ...newPost,
                id: state.posts.nextId
            };
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }
);

export const editPost = createAsyncThunk(
    'posts/editPost',
    async (post: Post) => {
        try {

            if (post.id >= 1000) {

                return post;
            } else {

                const response = await updatePostAPI(post);
                return response;
            }
        } catch (error) {
            console.error('Error updating post:', error);

            if (post.id >= 1000) {
                return post;
            }
            throw error;
        }
    }
);

export const removePost = createAsyncThunk(
    'posts/removePost',
    async (id: number) => {
        try {

            if (id < 1000) {
                await deletePostAPI(id);
            }
            return id;
        } catch (error) {
            console.error('Error deleting post:', error);

            if (id >= 1000) {
                return id;
            }
            throw error;
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch posts';
            })
            .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.items.unshift(action.payload);
                state.nextId += 1;
            })
            .addCase(editPost.fulfilled, (state, action: PayloadAction<Post>) => {
                const index = state.items.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(removePost.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter(post => post.id !== action.payload);
            });
    },
});

export default postsSlice.reducer; 