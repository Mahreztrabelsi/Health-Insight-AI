import React from 'react'
import Logo from "../assets/healthinsightai.png"
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { TbBrandPicsart } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import gp from "../assets/google-play-en.svg"
import { Link } from 'react-router-dom';
import ast from "../assets/app-store-en.svg"


const Footer = () => {
    const d = new Date();
    let year = d.getFullYear();
    return (
        <>
            <footer className='bg-black dark:bg-slate-950 text-white w-full h-full '>
                <div className=' w-full overflow-hidden '>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-purple-500 dark:fill-purple-600"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-purple-300 "></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="absolute w-full fill-white dark:fill-black"></path>
                    </svg>
                    <div className='grid  lg:grid-cols-4 md:grid-cols-2 grid-cols-2 p-20 max-sm:p-10 max-sm:gap-16 md:gap-20 max-md:gap-12 '>
                        <div className='flex flex-col gap-5   justify-center items-center'>
                            <h2 className='text-3xl text-purple-600'>Company</h2>
                            <ul className='grid gap-2 max-sm:gap-1'>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>About Us</li></a>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>Contact Us</li></a>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>Careers</li></a>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>Help And Support</li></a>
                            </ul>
                        </div>
                        <div className='flex flex-col gap-5 justify-center items-center'>
                            <h2 className='text-3xl text-purple-600'>Resources</h2>
                            <ul className='grid gap-2 max-sm:gap-1'>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>Privacy Policy</li></a>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>Terms And Conditions</li></a>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>Partners Program</li></a>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>Presentations</li></a>
                            </ul>
                        </div>
                        <div className='flex flex-col gap-5 justify-center items-center'>
                            <h2 className='text-3xl text-purple-600'>Explore</h2>
                            <ul className='grid gap-2 max-sm:gap-1'>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>Blog</li></a>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>Posters</li></a>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>Branding Tools</li></a>
                                <a href="#" className=' text-slate-400 hover:text-white text-sm hover:underline duration-200 w-fit '><li>Terms Of Services</li></a>
                            </ul>
                        </div>
                        <div className='flex flex-col gap-5 justify-center items-center'>
                            <div className='p-4'>
                                <select name="" id="" className='bg-transparent isal border-2 p-1 px-4 rounded-md'>
                                    <option value="En" defaultValue={"English"} className="bg-slate-950" >English</option>
                                    <option value="Ar" className="bg-slate-800">Arabic</option>
                                    <option value="Fr"className="bg-slate-800">French</option>
                                    <option value="Sp"className="bg-slate-800">Spanish</option>
                                    <option value="Rs"className="bg-slate-800">Russia</option>
                                </select>
                            </div>
                            <div className='grid gap-3'>
                                <img className=' hover:bg-slate-600 hover:dark:bg-slate-500 rounded-md  cursor-pointer' src={gp} alt="" />
                                <img className='hover:bg-slate-600 hover:dark:bg-slate-500  rounded-md  cursor-pointer' src={ast} alt="" />
                            </div>
                        </div>

                    </div>
                    <hr className=' w-5/6 m-auto '></hr>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full p-4  '>
                        <div className='flex justify-center items-center p-4'>
                        <Link to="#" className='flex justify-center items-center -ml-4 w-fit max-sm:w-full cursor-pointer '><div className="flex justify-center items-center ">
                                <img
                                    alt="HealthInsightAI"
                                    src={Logo}
                                    className="h-16 w-auto max-sm:h-12" />
                                <span className='font-semibold mr-1 max-sm:text-sm dark:text-slate-200'>HealthInsight</span><span className=' font-semibold text-purple-500'>AI</span>
                            </div></Link>
                        </div>


                        <div className='flex justify-center items-center p-8' >
                            <p className='text-sm text-gray-500'> {year} HealthInsightAI &copy; All rights reserved.</p>
                        </div>
                        <div className='flex space-x-4 justify-center items-center p-4'>
                            <a href="#"><FaFacebookF className='text-slate-400 hover:text-white' /></a>
                            <a href="#"><AiFillInstagram className='text-slate-400 hover:text-white' /></a>
                            <a href="#"><TbBrandPicsart className='text-slate-400 hover:text-white' /></a>
                            <a href="#"><FaXTwitter className='text-slate-400 hover:text-white' /></a>
                            <a href="#"><IoLogoYoutube className='text-slate-400 hover:text-white' /></a>
                            <a href="#"><FaLinkedinIn className='text-slate-400 hover:text-white' /></a>
                        </div>


                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
