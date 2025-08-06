import { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import starone from './assets/star1.png'
import tarot from './assets/tarotcard.png'
import staricon from './assets/staricon.png'
import lefty from './assets/lefty.png'
import righty from './assets/righty.png'
import upthy from './assets/upthy.png'
import moon from './assets/moon.png'
import constella from './assets/constella.png'
import constella2 from './assets/constella2.png'
import Footer from './components/footer'


function App() {

  return (
    <>
    
<div className="bg-[#150C2F]"> 
  <div className="relative w-full h-screen overflow-x-hidden ">

    <div className="absolute inset-0 bg-[#2B0E67]/26 backdrop-blur-lg z-0"></div>

    <div className="relative z-10 m-6 text-2xl text-white font-playwrite">
      <h2>Fortuneteller</h2>
    </div>
     
    <img src={lefty} alt="" className="absolute z-0 top-[40%] left-6" />  
    <img src={righty} alt="" className="absolute z-0 top-[30%] right-6" />  
    <img src={upthy} alt="" className="absolute z-0 top-[-4%] right-6" />  
    
    <div className="relative z-10 flex flex-col items-center justify-center p-8 font-sans text-center text-white ">
      <p className="text-3xl font-bold font-modern">
        Unlock Ancient Wisdom Through Tarot Reading
      </p>
      <p className="max-w-xl mt-8 text-lg">
        Step into a space where sacred symbolism meets smart technology
      </p>
      <p className="max-w-xl text-md">       
        receive personalized tarot, zodiac, and palm insights
        to guide your life.
      </p>
    </div>

    <div className="flex items-center justify-center">
      <img src={starone} alt="Star" className="relative z-10" />
    </div>

    <div className="relative mx-auto h-[60vh]  border-2 border-transparent ">
          <img 
            src={tarot} 
            alt="Tarot Cards" 
            className="absolute w-[640px] transform -translate-x-[53%]  z-8 left-1/2 " 
          />
      
     <div className="mt-[270px] h-[286px] bg-gradient-to-b from-[#060318] via-[#150C2F]/100 to-[#07043A] blur-lg z-20">

      </div>
            <img src={staricon} alt=""  className="mt-36 absolute left-1/4 top-[62%] -translate-x-1/2 -translate-y-1/2 z-10"></img>
                <p className="mt-36 font-modern absolute text-2xl font-light text-white left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 z-10">
                  Take it to the next level
                </p>
                  <img src={staricon} alt=""  className="mt-36 absolute right-1/4 top-[62%] -translate-x-1/2 -translate-y-1/2 z-10"></img>
      

</div>
   
                <div className="relative z-10 flex flex-col items-center justify-center ">
            
 <div className="absolute z-10  p-0 w-full inset-0 bg-[#060318] blur-lg h-[120vh]"> 

     </div>

      
            {/* Sharp Content Above */}
            <img src={moon} alt="" className="relative z-10 mt-20" />
          <img src={constella} alt="" className="absolute left-0 z-10 " />
          <img src={constella2} alt="" className="absolute z-10 right-2 " />
            <p className="relative z-10 mt-12 text-2xl text-white font-playwrite">Chose your favourite methods</p>


            <div className="relative z-10 mt-24 space-x-12 font-modern">

              <Link to="/tarot" className='text-white bg-[#543FE2] py-2 px-12 rounded-md text-lg'>Tarot</Link>
              <Link to="/" className='text-white bg-[#543FE2] py-2 px-12 rounded-md text-lg'>Palm reading</Link>
              <Link to="/" className='text-white bg-[#543FE2] py-2 px-12 rounded-md text-lg'>Zodiac</Link>
            </div>
          </div>
    

       <Footer/>
  </div>

</div>


 </>
  )
}

export default App
