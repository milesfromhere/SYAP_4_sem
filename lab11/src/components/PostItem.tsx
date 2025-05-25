import React from 'react';
import type { Post } from '../features/posts/postsAPI';

interface PostItemProps {
    post: Post;
    onEdit: (post: Post) => void;
    onDelete: (id: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit(post);
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="post-item" style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            margin: '10px 0', 
            borderRadius: '5px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
        }}>
            <h3 style={{ 
                margin: '0 0 10px 0',
                color: '#2c3e50'
            }}>{post.title}</h3>
            <p style={{ 
                margin: '0 0 15px 0',
                color: '#34495e',
                lineHeight: '1.6'
            }}>{post.body}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    onClick={handleEdit}
                    style={{
                        padding: '8px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(post.id)}
                    style={{
                        padding: '8px 20px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PostItem; 