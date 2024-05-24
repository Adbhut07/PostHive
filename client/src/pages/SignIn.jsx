import { TextInput,Label,Button, Spinner } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import toast from "react-hot-toast"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth'

function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error:errorMessage, currentUser} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if(errorMessage) {
        toast.error(errorMessage);
    }
  }, [errorMessage]); // Trigger toast.error only when errorMessage changes

  const handleChange = (e)=>{
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const success = handleInputErrors(formData);
    if(!success)
      return;

    try {
      dispatch(signInStart());
      const res = await axios.post("/api/auth/signin", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        dispatch(signInSuccess(res.data)); // Dispatch signInSuccess with response data
        navigate("/");
      } else {
        dispatch(signInFailure(res.data.message)); // Dispatch signInFailure with error message
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data.error));
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
            This is a blog app. You can sign in with your username or with Google.
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
              <Label value='Your Password'/>
              <TextInput 
                type='password'
                placeholder='********'
                id='password'
                onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign In'
              }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/signup' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

function handleInputErrors({username, password}) {

	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}


