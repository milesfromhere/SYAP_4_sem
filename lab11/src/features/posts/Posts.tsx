import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { fetchPosts, addPost, editPost, removePost } from './postsSlice';
import type { Post } from './postsAPI';
import PostItem from '../../components/PostItem';
import PostForm from '../../components/PostForm';

const Posts: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.posts.items);
    const status = useSelector((state: RootState) => state.posts.status);
    const error = useSelector((state: RootState) => state.posts.error);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const editedPostRef = useRef<HTMLDivElement>(null);
    const [lastEditedPostId, setLastEditedPostId] = useState<number | null>(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    useEffect(() => {
        // Scroll to form when editing
        if (editingPost && formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        // Scroll to edited post after update
        if (lastEditedPostId && !editingPost && editedPostRef.current) {
            editedPostRef.current.scrollIntoView({ behavior: 'smooth' });
            setLastEditedPostId(null);
        }
    }, [editingPost, lastEditedPostId]);

    const handleAddPost = async (title: string, body: string) => {
        try {
            await dispatch(addPost({ title, body, userId: 1 })).unwrap();
        } catch (error) {
            console.error('Failed to add post:', error);
            alert('Failed to add post. Please try again.');
        }
    };

    const handleEditPost = async (title: string, body: string) => {
        if (editingPost) {
            try {
                setLastEditedPostId(editingPost.id);
                await dispatch(editPost({ ...editingPost, title, body })).unwrap();
                setEditingPost(null);
            } catch (error) {
                console.error('Failed to edit post:', error);
                alert('Failed to edit post. Please try again.');
            }
        }
    };

    const handleDeletePost = async (id: number) => {
        try {
            await dispatch(removePost(id)).unwrap();
        } catch (error) {
            console.error('Failed to delete post:', error);
            alert('Failed to delete post. Please try again.');
        }
    };

    if (status === 'loading') {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
    }

    if (status === 'failed') {
        return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Post Manager</h1>
            
            <div ref={formRef}>
                {editingPost ? (
                    <>
                        <h2>Edit Post</h2>
                        <PostForm
                            post={editingPost}
                            onSubmit={handleEditPost}
                            onCancel={() => setEditingPost(null)}
                        />
                    </>
                ) : (
                    <>
                        <h2>Add New Post</h2>
                        <PostForm onSubmit={handleAddPost} />
                    </>
                )}
            </div>

            <h2 style={{ marginTop: '30px' }}>Posts</h2>
            <div>
                {posts.map((post: Post) => (
                    <div 
                        key={post.id} 
                        ref={post.id === lastEditedPostId ? editedPostRef : null}
                    >
                        <PostItem
                            post={post}
                            onEdit={setEditingPost}
                            onDelete={handleDeletePost}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts; 