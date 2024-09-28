import React from "react";
import Login from "./Pages/Auth/Login.jsx";
import SignUp from "./Pages/Auth/SignUp.jsx";
import SignUpForm from "./Pages/Auth/SignUpForm.jsx";
import Verif from "./Pages/Auth/Verif.jsx";
import Presentation from "../src/Pages/Presentation.jsx";
import Home from "./Pages/Home.jsx"; 
import NotificationPage from  "./Pages/NotificationPage.jsx";
import Test from  "./Pages/Test.jsx";
import Services from "./Pages/Services.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import Profile from "./Pages/Profile.jsx";
import Rapport from "./Pages/Rapport.jsx"
import AuthContext from "./Pages/Auth/AuthContext.jsx"
import Protected from "./Pages/Auth/Protected.jsx";
import ChatBot from "./Components/ChatBot.jsx";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";




function App() {

  const router = createBrowserRouter([ 
    {
      path:'/', element: <Presentation />,
    },
    {
      path:'/Presentation', element: <Presentation />,
    },
    {
      path:'/SignUp', element: <SignUp />,
    },
    {
      path:'/SignUpForm', element:<Protected><SignUpForm /></Protected> ,
    },
    {
      path:'/Verification', element:<Protected><Verif /></Protected> ,
    },
    {
      path:'/LogIn', element: <Login />,
    },
    {
      path:'/Home', element: <Protected><Home /></Protected> ,
    },
    {
      path:'/Home', element: <Protected><ChatBot /></Protected> ,
    },
    {
      path:'/Services', element: <Protected><Services /></Protected> ,
    },
    {
      path:'/AboutUs', element: <Protected><AboutUs /></Protected> ,
    },
    {
      path:'/ContactUs', element: <Protected><ContactUs /></Protected> ,
    },
    {
      path:'/Profile', element: <Protected><Profile /></Protected> ,
    },
    {
      path:'/Rapport', element: <Protected><Rapport /></Protected> ,
    },
    {
      path:'/Notifications', element: <Protected><NotificationPage /></Protected> ,
    },
    {
      path:'/Test', element: <Protected><Test /></Protected> ,
    },
    //   {
  //     path:'/TestBrainTumor', element: <Protected><TestBrainTumor /></Protected> ,
  //   },
  ])


  return (
    <AuthContext>
    <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  )
}

export default App
