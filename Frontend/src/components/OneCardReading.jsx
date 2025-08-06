import React, { useState, useEffect } from "react";
import tarotCards from "./tarotdata"; // 6 tarot cards with .img and .back


import { Link } from 'react-router-dom'
import rightastro from "../assets/rightastro.png";
import leftastro from "../assets/leftastro.png";
import lefty from "../assets/lefty.png";
import Footer from "./footer";
import backarrow from "../assets/backarrow.png";


export default function OneCardReading() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
const [loading, setLoading] = useState(false);
const [showResults, setShowResults] = useState(false);


  const totalCards = 6;

  useEffect(() => {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5).slice(0, totalCards);
    setCards(shuffled);
  }, []);

  if (cards.length < 6) return null; // Ensure cards are loaded

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
      setIsAnimating(false);
    }, 300);
  };


  const handleRestart = () => {
  const shuffled = [...tarotCards].sort(() => Math.random() - 0.5).slice(0, totalCards);
  setCards(shuffled);
  setCurrentIndex(0);
  setRevealed([]);
};



  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
      setIsAnimating(false);
    }, 300);
  };
const handleSelect = () => {
  if (revealed.includes(currentIndex) || revealed.length >= 3) return;
  const newRevealed = [...revealed, currentIndex];
  setRevealed(newRevealed);

  if (newRevealed.length === 1) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // after 3 seconds, stop loading to reveal results
    }, 3000);
  }
};



  const getCardImage = (index) => {
    const card = cards[index];
    if (!card) return "";
    return revealed.includes(index) ? card.img : card.back;
  };

  const getIndex = (offset) => {
    return (currentIndex + offset + totalCards) % totalCards;
  };

  return (
<>
      <div className='bg-[#150C2F] '>
       <div className="relative w-full h-screen overflow-x-hidden ">

    <div className="absolute inset-0 bg-[#2B0E67]/22 backdrop-blur-lg z-0"></div>

      <div className="relative z-10 flex flex-col p-6 text-2xl text-black text-white font-playwrite">
      <Link to="/">Fortuneteller</Link>
      <Link to="/tarot" className="mt-6">  <img src={backarrow} alt="" className="flex items-center px-6 ml-4 bg-white rounded-md"/> </Link>
    </div>
        <h2 className='relative z-10 flex justify-center text-2xl text-black text-white font-playwrite'>Choose 1 of ypur tarot Selections</h2>



    
    <div className="flex flex-col items-start text-white ">

      <img src={lefty} alt="" className="absolute z-10"/>
      <img src={leftastro} alt="" className="absolute z-10 left-2 w-[18%] top-[28%]"/>
      <img src={rightastro} alt="" className="absolute w-[22%] z-8 right-2"/>
               <h2 className="mb-6 text-2xl font-bold text-white"></h2>
   
   
   <div className="relative w-[450px] h-[300px] left-[24%] ">
  {[getIndex(-1), currentIndex, getIndex(1)].map((cardIndex, i) => (
    <div
      key={cardIndex}
      className={`absolute top-1/2 left-1/2 -translate-x-[1/2] -translate-y-1/2 transition-all duration-300 ${
        i === 0
          ? "translate-x-[-160px] scale-90 opacity-60 z-10"  // Left Card
          : i === 1
          ? "translate-x-0 scale-100 opacity-100 z-20 cursor-pointer" // Center Card
          : "translate-x-[160px] scale-90 opacity-60 z-10"  // Right Card
      }`}
      onClick={() => i === 1 && handleSelect()} // Only center card selectable
    >
      <img
        src={getCardImage(cardIndex)}
        alt={cards[cardIndex]?.name || ""}
        className="w-48 border-2 border-red-500 rounded-lg shadow-xl object-fit h-72"
      />
    </div>
  ))}
</div>



      <div className="absolute flex justify-between w-[880px] ml-[16%] space-x-6 top-[40%]">
        <button
          onClick={handlePrev}
          className="text-white bg-[#543FE2] py-2 px-12 rounded-md text-lg rounded-md "
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="text-white bg-[#543FE2] py-2 px-12 rounded-md text-lg rounded-md"
        >
          Next
        </button>
      </div>
{ !loading && (
  <div className="relative z-10 w-full mt-24 text-center text-white -ml-[2%]">
    <h2 className="flex justify-center text-lg font-semibold font-modern">
      Scroll to view your results 
    </h2>
  </div>
)}

{loading && (
  <div className="relative z-10 w-full mt-24 text-center text-white -ml-[2%]">
    <h2 className="flex justify-center text-lg font-semibold font-modern animate-pulse">
      Revealing your results...
    </h2>
  </div>
)}


{!loading && revealed.length === 1 && (
  <>
   <div className="flex ml-12 justify-center items-center mt-20 w-[90%]">
    <div className="flex flex-col items-center justify-start w-[480px] m-4 space-x-4">
      <div className="flex flex-col items-center justify-center mr-6">
        <h3 className="mb-2 text-xl font-semibold capitalize">ပစ္စုပ္ပန်</h3>
        {cards[revealed[0]] && (
          <img
            src={cards[revealed[0]].img}
            alt={cards[revealed[0]].name}
            className="object-cover w-32 h-48 mx-auto mb-2 rounded-md"
          />
        )}
      </div>
      <div>
        <p className="flex justify-center pb-8 -ml-2 text-2xl">{cards[revealed[0]]?.name}</p>
        <p className="text-lg">{cards[revealed[0]]?.role["ပစ္စုပ္ပန်"]}</p>
      </div>
    </div>
  </div>

<button
            onClick={handleRestart}
            className="w-full px-4 py-2 mt-6 font-bold tex-2xl font-modern hover:text-yellow-300"
          >
            Restart Tarot Reading
          </button>

  </>
)}
           

    </div>

</div>
  </div>
    </>
  );
}