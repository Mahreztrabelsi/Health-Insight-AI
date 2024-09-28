import React, { useState } from 'react'
import { IoMail } from "react-icons/io5";
import Meteors from "@/Components/magicui/meteors";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Newsletter = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [subs, setSubs] = useState(false);


    const subscription = () => {
        // if(!email) {
        //     toast.error('Please enter your email address for subscription' );
        //     return
        // }
        // else {
        //     setSubs(true);
        //     console.log(email)
        // }
        // if(subs) {
        //     navigate("/home")
        //     setSubs(false);
        // }
    };
    return (
        <>

            <div className="relative max-xm:text-lg flex h-auto z-0 max-lg:w-full max-lg:px-5 max-lg:border-x-0 w-8/12 m-auto  flex-col items-center justify-center overflow-hidden rounded-lg border bg-transparent border-slate-400   md:shadow-xl">
                <Meteors number={30} />
                <h1 className='text-center max-xm:text-2xl  max-sm:text-2xl text-5xl my-8 dark:text-white font-semibold'>Join <span className=' font-bold text-purple-700'>HealthInsight AI</span> <p className='dark:text-white'>newsletter !</p></h1>
                <p className='text-center text-gray-500 mt-5 pb-6'>Be among the first ones to receive our latest news and offers.</p>
                <form  method='POST' className='flex flex-wrap justify-center items-center  gap-5'>
                    <div className='relative'>
                        <IoMail className='absolute text-2xl top-3 left-2  dark:text-white' />
                        <input type='email'  placeholder='Your email' required onChange={(e) => {setEmail(e.target.value)}} className=' w-full px-6 py-3 bg-transparent border border-slate-500 dark:border-white rounded-lg pl-12 text-gray-800 dark:text-white focus:outline-none focus:bg-transparent' />
                    </div>

                    <button type='button' className='bg-blue-500  hover:bg-blue-700 text-white py-3 px-6 rounded-lg' onClick={() => subscription()}>Subscribe</button>
                </form>

                <p className='text-center text-gray-500 mt-5'>We'll never share your email address.</p>

                <div className=' mt-5'>
                    <p className='text-gray-500 mb-8 text-center'>You will receive newsletters and updates from HealthInsightAI.</p>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
                transition:Bounce />
        </>

    )
}

export default Newsletter
