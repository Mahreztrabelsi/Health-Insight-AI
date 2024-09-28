import React from 'react'
import ScrollToTop from 'react-scroll-up'
import { IoIosRocket } from "react-icons/io";




const BtnScrol = () => {

    const scrolTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div>
                <ScrollToTop  showUnder={300}>
                    <button className='relative z-50 -right-2 flex w-14 h-14 shadow-xl max-sm:w-10 max-sm:h-10  bg-transparent justify-center items-center hover:border-2 p-4 hover: border-purple-500 rounded-full duration-300'>
                        <IoIosRocket  onClick={scrolTop} className=' z-50 w-10  h-10 p-1 max-sm:h-5 max-sm:w-5 max-sm:p-0  absolute  text-sm text-purple-600 hover:-rotate-45 duration-500' />
                    </button>
                </ScrollToTop>
            </div>
        </>
    )
}

export default BtnScrol
