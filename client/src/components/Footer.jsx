import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsInstagram, BsTwitter, BsGithub, BsDribbble } from "react-icons/bs";


export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
              <span className="px-1.5 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Post
              </span>
              Hive
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link 
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'>
                    PostHive's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link 
                  href='https://github.com/Adbhut07'
                  target='_blank'
                  rel='noopener noreferrer'>
                    Github
                </Footer.Link>
                <Footer.Link 
                  href='https://discord.com/users/1046331730266701855'
                  target='_blank'
                  rel='noopener noreferrer'>
                    Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link 
                  href='#'
                  >
                    Privacy Policy
                </Footer.Link>
                <Footer.Link 
                  href='#'
                  >
                    Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright href='#' by="Adbhut Stasangi" year={new Date().getFullYear()}/>
          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='https://instagram.com/satsangi_adbhut?igshid=Mzc0YWU1OWY=' icon={BsInstagram}/>
            <Footer.Icon href='https://www.linkedin.com/in/adbhut-satsangi-a96808242' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/Adbhut07/BlogApp' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>
          </div>
        </div>
      </div>
    </Footer>
  );
}

