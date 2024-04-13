import { TextInput,Label,Button, Spinner } from 'flowbite-react';
import React, { useState } from 'react'
import toast from "react-hot-toast"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import OAuth from '../components/OAuth';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const success = handleInputErrors(formData);
    if(!success)
      return;

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        navigate("/signin");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error); // Display specific error message from server
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-1.5 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Post
            </span>
            Hive
          </Link>
          <p className='text-sm mt-5'>
            This is a blog app. You can sign up with your email or with Google.
          </p>
        </div>


        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}> 
            <div>
              <Label value='Your Username'/>
              <TextInput 
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your Email'/>
              <TextInput 
                type='text'
                placeholder='name@gmail.com'
                id='email'
                onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your Password'/>
              <TextInput 
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}/>
            </div>
            <div>
              <Label value='Confirm Password'/>
              <TextInput 
                type='password'
                placeholder='Confirm Password'
                id='confirmPassword'
                onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

function handleInputErrors({ username, email, password, confirmPassword }) {

	if (!username || !password || !confirmPassword || !email) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}


