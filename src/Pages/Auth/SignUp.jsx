import React from 'react'
import { IoMail } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { googleProvider } from '../../Config/firebase';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Logo from "../../assets/healthinsightai.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios';
import { db } from '../../Config/firebase'
import { collection, addDoc, } from 'firebase/firestore'



const SignUp = () => {

    const auth = getAuth();
    const navigate = useNavigate();

    // Set The Patient Collection
    const [patient, setPatient] = useState([]);
    const patientCollectionRef = collection(db, "patient");

    // Submited fields of the  New Patient
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function alpha1(ch) {//vérifie que la chaine est alphabétique 
        var t = true;
        let i = 0;
        ch = ch.toUpperCase();
        while (i < ch.length && t)
            if (ch.charAt(i) < "A" || ch.charAt(i) > "Z")
                t = false;
            else
                i++;
        return t;
    }

    function alphanum(ch) { //vérifie que la chaine est alphanumérique
        var cha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var t = true;
        let i = 0;
        while ((i < ch.length) && t)
            if (cha.indexOf(ch.charAt(i)) == -1)
                t = false;
            else
                i++;

        return t;
    }

    const test = () => {

        if (!alpha1(firstName) || firstName === "") {
            if (!firstName)
                toast.error("Please enter your FirstName.\n");
            else
                toast.error("FirstName should only contain alphabetic characters!");
            return false;
        }

        else if (!alpha1(lastName) || lastName === "") {
            if (!lastName)
                toast.error("Please enter your LastName.\n");
            else
                toast.error("LastName should only contain alphabetic characters!");
            return false;
        }

        else if (email.length <= 3 || email.includes("@") === false || email.includes(".") === false) {
            if (!email)
                toast.error("Please enter your Email.\n");
            else
                toast.error("Invalid Email Format! ,(eg: example@gmail.com");
            return false;
        }
        else if (password.length < 8 || !alphanum(password)) {
            if (!password)
                toast.error("Please enter your Password !");
            else if (password.length < 8)
                toast.error("Password should be at least 8 characters long!");
            else if (!alphanum(password))
                toast.error("Password should contain at least  alphabetic characters and  numeric characters!");
            return false;
        }
        return true;
    }

    const [sendDataApi, setsendDataApi] = useState(false);
    const [createUser, setCreateUser] = useState(false);


    const SignUP = async (e) => {
        e.preventDefault();
        if (test()) {
            await createUserWithEmailAndPassword(auth, email, password).then(() => {

                // Add Patient To The Database
                addDoc(patientCollectionRef, {
                    FirstName: firstName,
                    LastName: lastName,
                    Email: email,
                    Age: 0,
                    Password: password,
                    PhoneNum: "",
                    userId: auth?.currentUser?.uid,
                    Country: "",
                    Gender: "",
                })
                    .then(() => {
                        toast.success("Patient Added Successfully!");
                        // setCreateUser(true);
                    }).catch((error) => {
                        toast.error(error.message);
                    });
            })
                .catch((error) => {
                    toast.error(error.message);
                });

            
                //API between register page and Rapport page
                const data = {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: password,
                }
                // Replace Default Port with  API endpoint
                try {
                    
                    const response = await axios.post(`https://health-insight-ai.vercel.app/api/save-Signup`, data, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    console.log('Data sent:', response.data);
                    setsendDataApi(true);
                }
                catch (error) {
                    console.error('Error sending data:', error);
                }

                // if (sendDataApi)
                //     console.log(sendDataApi)
                navigate('/SignUpForm');
            

        }

    };

    const SignInWithGoogle = async (e) => {
        e.preventDefault();
        // try {
        //     console.log(ex)
        //     for (let i = 0; i < patient.length; i++) {
        //         if (patient[i].Email === ex) {
        //             toast.warning("This email is already in use.");
        //         }
        //         else {
        //             await signInWithPopup(auth, googleProvider);
        //             addDoc(patientCollectionRef, {
        //                 FirstName: "",
        //                 LastName: "",
        //                 Email: auth?.currentUser?.email,
        //                 Age: age || 0,
        //                 Password: password,
        //                 PhoneNum: PhoneNum || 0,
        //                 userId: auth?.currentUser?.uid,
        //             })
        //             navigate('/SignUp2');
        //         }
        //     }
        // }
        // catch (error) {
        //     toast.error(error.message);
        // }
    }


    return (
        <>
            <div className='flex justify-center max-sm:w-full w-1/3 m-auto mt-8'>
                <Link to="/Presentation" ><div className='flex '>
                    <img
                        alt="HealthInsightAI"
                        src={Logo}
                        className="h-10 w-auto " />
                    <span className='font-semibold text-2xl mr-1  dark:text-slate-200'>HealthInsight</span><span className=' text-2xl font-semibold text-purple-500'>AI</span>
                </div></Link>
            </div>
            <div className='bg-white max-sm:h-screen max-sm:w-full flex shadow-xl m-auto my-10 max-md:m-0  rounded-2xl  p-5 max-w-3xl '>
                <div className='w-5/6 p-6 m-auto  '>
                    <h2 className='font-bold text-3xl mb-16 text-center text-purple-600 '>Sign Up</h2>

                    <form action="" className='flex flex-col gap-4 '>
                        <div className='grid grid-cols-2'>
                            <input className='p-2 rounded-xl mt-2 border  m-auto w-11/12 border-gray-400 outline-none focus:border-purple-600' type="text" required placeholder='Your FirstName' onChange={(e) => setFirstName(e.target.value)} />
                            <input className='p-2 rounded-xl mt-2 border  m-auto w-11/12 border-gray-400 outline-none focus:border-purple-600' type="text" required placeholder='Your LastName' onChange={(e) => setLastName(e.target.value)} />
                        </div>

                        <div className='relative'>
                            <IoMail className='absolute text-2xl top-2 left-2 text-purple-600 ' />
                            <input className='p-2 pl-10 rounded-xl border w-full border-gray-400 outline-none focus:border-purple-600' type="email" placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <input className='p-2 rounded-xl border border-gray-400 outline-none focus:border-purple-600 ' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        <button className='bg-purple-600  hover:bg-purple-500 rounded-xl text-white text-xl py-1  ' onClick={(e) => { SignUP(e) }} >Sign Up</button>
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
                            theme="light"
                            transition:Bounce />
                    </form>
                    <p className='text-sm text-slate-500'>You Can Create an account Now!</p>
                    <div className='mt-10 grid grid-cols-3 items-center text-gray-500 '>
                        <hr className='border-gray-500' />
                        <p className='text-center text-sm'>0R</p>
                        <hr className='border-gray-500' />
                    </div>
                    <button onClick={(e) => { SignInWithGoogle(e) }} className='flex m-auto mt-4 justify-center items-center gap-2 w-fit border-2 rounded-lg shadow-xl bg-slate-100 p-2 '>
                        <FcGoogle className='text-2xl' /> Sign Up with Google
                    </button>
                    <Link to='/LogIn' className=' text-xs border-b  text-blue-600 underline'>you have allready an account</Link>

                </div>


            </div>
        </>
    )
}

export default SignUp
