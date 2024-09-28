import React from 'react'
import Navbar from '../Components/Navbar'
import BtnScrol from '../Components/BtnScrol'
import Form from '../Components/Form'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'
import ChatBot from '../Components/ChatBot'

const Home = () => {
    
    
    return (
        <>
        <Navbar/>
        <BtnScrol/>
        <ChatBot />
        <Form/>
        <div className=' max-md:h-48 md:h-64'></div>
        <Newsletter/>
        <div className=' max-md:h-48 md:h-64'></div>
        <Footer/>
        </>
    )
}

export default Home
