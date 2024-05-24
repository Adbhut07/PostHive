import React, {useState, useEffect} from 'react';
import PostCard from '../components/PostCard';
import {Link} from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className="bg-gray-100 py-20 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl lg:text-6xl font-bold text-center mb-8">
          Welcome to PostHive
        </h1>
        <p className="text-lg text-center mb-8">
          Publish your passions, your way
        </p>
        <div className="flex justify-center">
          <button className="btn btn-primary mr-4">
            <Link
              to="/search"
            >
              View all posts
            </Link>
          </button>
          <button className="btn btn-secondary">
          <a href="https://github.com/Adbhut07" target="_blank" rel="noopener noreferrer">
            Subscribe Now
          </a>
          </button>
        </div>
      </div>
    </div>
  );
};

// const Categories = () => {
//   return (
//     <div className="bg-gray-100 py-20 dark:bg-slate-800">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-8">Categories</h2>
//         <div className="flex text-black justify-center">
//           <div className="bg-white rounded-lg shadow-md p-6 mr-4">
//             <h3 className="text-xl font-semibold mb-4">Technology</h3>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6 mr-4">
//             <h3 className="text-xl font-semibold mb-4">Lifestyle</h3>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-xl font-semibold mb-4">Travel</h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


function Home(){
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <>
    <HeroSection />
    
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>

      </div>
    </div>
    

    {/* <Categories /> */}
    </>

  )
}

export default Home;