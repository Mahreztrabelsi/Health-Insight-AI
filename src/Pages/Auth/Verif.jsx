import React, { useEffect, useState } from 'react'
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';





const Verif = () => {


    const auth = getAuth();
    const user = auth?.currentUser;
    const navigate = useNavigate();


    useEffect(() => {
        if(auth.currentUser.emailVerified)   
            navigate('/Home');
    })


    var [isverified,setIsverified] = useState(false);
    

    const sendEmailVerificationRequest = async (e) => {
        e.preventDefault();
        if (auth?.currentUser) {
            try {
                await sendEmailVerification(auth.currentUser); // Send email verification
                toast.success("Account Created Successfully! Email verification sent, you can Verif now!");
                setIsverified(true)

            } catch (error) {
                console.error("Error sending email verification:", error);
                toast.error("Failed to send email verification. Please try again later.");
            }
        } else {
            toast.error("No user is currently signed in.");
        }
    }

    const verif = (e) => {
        e.preventDefault();

        // try {
        //     if (isverified) {
        //         navigate('/Home');
        //     }
        //     else {
        //         toast.info("Please verify your email address to proceed.");
        //     }
        // }
        // catch (error) {
        //     toast.error(error.message);
        // }
        location.reload();
    }

    console.log(isverified)

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-8/12 max-md:w-full max-xm:p-2 grid grid-cols-1 h-64 text-center  p-8 bg-slate-200 rounded-lg shadow-lg'>
                <h1 className=' max-md:text-xl md:text-3xl lg:text-4xl  text-purple-600 font-semibold'> Verfication of Email Address !</h1>



                {
                    !isverified &&
                    <>
                        <p className='text-md'>Please Press the Send Verification button to send an  email verification.</p>
                        <div className=' m-auto max-md:w-full flex  gap-1 md:w-11/12 lg:w-6/12'>
                            <button className=' m-auto w-1/2 bg-purple-800 px-3 py-2.5 max-md:text-sm text-white font-semibold rounded-lg' type='button' onClick={(e) => sendEmailVerificationRequest(e)}> Send  Verification</button>
                        </div>
                    </>
                }

                {
                    isverified &&
                    <>
                        <p className='text-md'>Please check your email for the verification link.</p>
                        <div className=' m-auto max-md:w-full flex  gap-1 md:w-11/12 lg:w-6/12'>
                            <button className=' m-auto w-1/2 bg-purple-800 px-3 py-2.5 max-md:text-sm text-white font-semibold rounded-lg' type='button' onClick={(e) => verif(e)}>Verify</button>
                        </div>
                    </>
                }




            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce />
        </div>
    )
}

export default Verif
