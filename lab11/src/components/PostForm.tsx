import React, { useState, useEffect } from 'react';
import type { Post } from '../features/posts/postsAPI';

interface PostFormProps {
    post?: Post;
    onSubmit: (title: string, body: string) => void;
    onCancel?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(post?.title || '');
    const [body, setBody] = useState(post?.body || '');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
        } else {
            setTitle('');
            setBody('');
        }
    }, [post]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(title, body);
        if (!post) {
            setTitle('');
            setBody('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '3px',
                        border: '1px solid #ddd'
                    }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="body" style={{ display: 'block', marginBottom: '5px' }}>Content:</label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '3px',
                        border: '1px solid #ddd',
                        minHeight: '100px'
                    }}
                />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    type="submit"
                    style={{
                        padding: '8px 20px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}
                >
                    {post ? 'Update' : 'Add'} Post
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={() => {
                            onCancel();
                            setTitle('');
                            setBody('');
                        }}
                        style={{
                            padding: '8px 20px',
                            backgroundColor: '#9e9e9e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default PostForm; 