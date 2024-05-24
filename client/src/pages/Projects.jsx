import { Button } from 'flowbite-react';

export default function Projects() {
  return (
    <>
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-10 p-3'>
      <h1 className='text-3xl font-semibold'>Pojects</h1>
      <p className='text-md text-gray-500'>Built this project while learning the MERN stack</p>
      
      <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                ChatBuddy
            </h2>
            <p className='text-gray-500 my-2'>
            ChatBuddy: A seamless one-to-one chatting application for instant and personal communication.
            </p>
            <Button gradientDuoTone='purpleToPink' as='a' href="https://chatbuddy-xrxj.onrender.com" target='_blank' rel='noopener noreferrer' className='rounded-tl-xl rounded-bl-none'>
              ChatBuddy
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://firebasestorage.googleapis.com/v0/b/blog-app-56a2f.appspot.com/o/Designer.png?alt=media&token=c8968b5d-71d0-4d09-9c67-1502562ed5f1" />
        </div>
      </div>
    </div>
    </>  
  )
}