import React from 'react'

import { Link } from 'react-router-dom'
import TarotCarousel from './components/TarotCarousel'
import Footer from './components/footer'

export default function tarot() {
  return (

    <>
    <div className='bg-[#150C2F] '>
       <div className="relative w-full h-screen overflow-x-hidden ">

    <div className="absolute inset-0 bg-[#2B0E67]/22 backdrop-blur-lg z-0"></div>

      <div className="relative z-10 p-6 text-2xl text-black text-white font-playwrite">
      <Link to="/">Fortuneteller</Link>
    </div>
        <h2 className='relative z-10 flex justify-center text-2xl text-black text-white font-playwrite'>Choose One of your choices</h2>





              <div className='relative z-10 flex flex-col items-center justify-center mt-20 h-[36vh] space-y-8 text-2xl font-modern'>
                <Link
                  to="/onetarot"
                  className="text-white font-semibold transition duration-300 hover:text-yellow-400 hover:drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]"
                >
                  One Card Reading
                </Link>



        <Link
                  to="/threetarot"
                  className="text-white font-semibold transition duration-300 hover:text-yellow-400 hover:drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]"
                >
                  Three Cards Reading
                </Link>
        </div>


   <Footer/> 
    </div>
       </div>
   
    </>
  )
}
