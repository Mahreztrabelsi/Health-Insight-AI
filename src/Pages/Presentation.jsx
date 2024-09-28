import React from 'react'
import Header from '../Components/Header'
import BtnScrol from '../Components/BtnScrol'
import PreSection from '../Components/PreSection'
import Questions from '../Components/Questions'
import Testimonies from '../Components/Testimonies'
import PresentationNewsletter from '../Components/PresentationNewsletter'
import Footer from '../Components/Footer'


const Presentation = () => {


    return (
        <div>
            <Header />
            <BtnScrol />
            <PreSection />
            <div className=' max-md:h-48 md:h-64'></div>
            <Questions />
            <Testimonies />
            <div className=' max-md:h-48 md:h-64'></div>
            <PresentationNewsletter />
            <div className=' max-md:h-48 md:h-64'></div>
            <Footer />
        </div>
    )
}

export default Presentation
