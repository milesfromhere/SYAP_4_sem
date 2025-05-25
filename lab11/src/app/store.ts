import { configureStore } from '@reduxjs/toolkit';
import type { Post } from '../features/posts/postsAPI';
import postsReducer from '../features/posts/postsSlice';

export interface PostsState {
    items: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface RootState {
    posts: PostsState;
}

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
});

export type AppDispatch = typeof store.dispatch; 