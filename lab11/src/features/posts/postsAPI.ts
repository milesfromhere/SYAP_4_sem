import axios from 'axios';

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export type NewPost = Omit<Post, 'id'>;

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(BASE_URL);
    return response.data;
};

export const createPost = async (newPost: NewPost): Promise<Post> => {
    const response = await axios.post<Post>(BASE_URL, newPost);
    return response.data;
};

export const updatePost = async (post: Post): Promise<Post> => {
    const response = await axios.put<Post>(`${BASE_URL}/${post.id}`, post);
    return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
}; 