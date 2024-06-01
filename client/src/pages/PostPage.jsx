import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (res.status !== 200) {
                    throw new Error('Failed to fetch post');
                }
                setPost(data.posts[0]);
                setError(false);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?limit=3`);
                const data = await res.json();
                if (res.status !== 200) {
                    throw new Error('Failed to fetch recent posts');
                }
                setRecentPosts(data.posts);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchRecentPosts();
    }, []);

    useEffect(() => {
        if (post && post.content) {
            hljs.highlightAll();
        }
    }, [post]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500">Failed to load the post. Please try again later.</p>
            </div>
        );
    }

    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            {post && (
                <>
                    <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                        {post.title}
                    </h1>
                    {post.author && (
                        <p className="text-center font-bold text-xl text-gray-500 mt-2">
                            <span>By </span><span className="underline text-blue-500">{post.author.username}</span>
                        </p>
                    )}
                    <Link to={`/search?category=${post.category}`} className="self-center mt-5">
                        <Button color="gray" pill size="xs">
                            {post.category}
                        </Button>
                    </Link>
                    <img
                        src={post.image}
                        alt={post.title}
                        className="mt-10 p-3 max-h-[600px] w-full object-cover"
                    />
                    <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className="italic">
                            {(post.content.length / 1000).toFixed(0)} mins read
                        </span>
                    </div>
                    <div
                        className="p-3 max-w-2xl mx-auto w-full post-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>
                    <CommentSection postId={post._id} />
                </>
            )}
            <div className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-xl mt-5">Recent Articles</h1>
                <div className="flex flex-wrap gap-5 mt-5 justify-center">
                    {recentPosts && recentPosts.map((recentPost) => (
                        <PostCard key={recentPost._id} post={recentPost} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default PostPage;
