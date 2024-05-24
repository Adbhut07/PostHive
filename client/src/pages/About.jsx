import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About PostHive Blog
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6 mb-12">
            <h3>
              Created by{" "}
              <span className="font-bold hover:underline">
                <a href="https://github.com/Adbhut07" target="_blank">
                  Adbhut Satsangi
                </a>
              </span>{" "}
              as a personal project
            </h3>

            <p>
              Welcome to PostHive! a free vibrant blogging platform dedicated to
              the tech community. At PostHive, we empower tech enthusiasts,
              professionals, and hobbyists to share their thoughts, ideas, and
              experiences in the form of insightful and engaging blog posts.
              Whether you're an industry expert or just passionate about
              technology, PostHive provides the perfect space for you to express
              your knowledge and creativity.
            </p>

            <p>
              PostHive is more than just a blogging site; it’s a thriving
              community of tech-savvy individuals who love to explore and
              discuss the latest trends and advancements in technology. Our
              platform encourages interaction and engagement, fostering
              connections between like-minded individuals who share a passion
              for tech. By facilitating discussions through comments and
              feedback, we aim to create a dynamic ecosystem where innovative
              ideas and diverse perspectives can flourish.
            </p>

            <p>
              Our user-friendly interface makes it easy for anyone to start
              blogging. With customizable templates and intuitive design
              options, you can create visually appealing and professional posts
              that reflect your personal style. Whether you're writing about
              software development, AI, cybersecurity, or any other tech-related
              topic, PostHive gives you the flexibility to present your content
              in the best possible light. Additionally, our platform is
              optimized for mobile devices, ensuring that you can write and read
              tech blogs anytime, anywhere.
            </p>

            <p>
              Join PostHive today and become part of a community that celebrates
              the world of technology. Share your insights, connect with others,
              and discover new ideas in a supportive and engaging environment.
              At PostHive, your contributions help build a hive of knowledge and
              innovation, driving the tech community forward. Together, let's
              make the tech world more connected and informed, one blog post at
              a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About