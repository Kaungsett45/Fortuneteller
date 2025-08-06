import {
    createBrowserRouter,
  
  } from "react-router-dom";

  import OneCardReading from "../components/OneCardReading";
import App from '../App';
import ThreeTarot from "../components/TarotCarousel";
import ChooseTarot from "../tarot";
const router = createBrowserRouter(
  [
      // {
      //   path:"/",
      //   element: <PalmReadingApp/>,
      // },
   
    {
      path: "/",
      element: <App/>,
    },
    {
          path: "/threetarot",
          element: <ThreeTarot/>,
    },
    {
          path: "/tarot",
          element: <ChooseTarot/>,
    },
      
    {
          path: "/onetarot",
          element: <OneCardReading/>,
    },
      
     
    
  ],
 
);

  export default router;