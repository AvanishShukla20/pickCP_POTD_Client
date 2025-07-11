import React from 'react'
import logo from "../assets/Hero.svg"
function Hero() {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center px-8 py-16 pb-36 bg-white">
      <div className="flex-1 lg:pr-12 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-800">PickCP</span> 
        </h1>
        <p className="text-gray-600 mb-6">
          This is a powerful and user-friendly platform designed to help you track your daily progress in competitive programming. Every day, you get a fresh Problem of the Day (POTD) sourced directly from the official Codeforces website.

          Simply enter your desired problem rating and tags to practice problems tailored to your preferences. If you prefer a surprise, just check the Random option — and the system will pick a problem for you automatically!
        </p>
        
      </div>
      <div className="flex-1 mb-8 lg:mb-0">
        <img
          src={logo}
          alt="Codeforces POTD Illustration"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </section>
  )
}

export default Hero
