import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import profileImg from "../assets/user.png"
import Logo from "../assets/healthinsightai.png"
import { FaArrowRightFromBracket } from "react-icons/fa6";;
import { IoSettingsSharp } from "react-icons/io5";
import ThemeToggle from '../Components/ThemeToggle'
import Notification from "../Components/Notification"
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth';
import BtnScrol from '../Components/BtnScrol'
import Footer from '../Components/Footer'
import dash from '../assets/dashboard.png'
import analyse from '../assets/analysing.png'
import rapport from '../assets/document.png'
import Interface from '../assets/selection.png'
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../Config/firebase'
import { toast } from 'react-toastify';
import Newsletter from '../Components/Newsletter'




export const navigation = [
    { name: 'Home', href: '/Home', current: false },
    { name: 'Servives', href: '/Services', current: true },
    { name: 'AboutUs', href: '/AboutUs', current: false },
    { name: 'ContactUs', href: '/ContactUs', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Service = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    // Set The Image Collection
    const [profileImage, setProfileImage] = useState();
    const imageCollectionRef = collection(db, `Image/${auth.currentUser.uid}/ProfileImgCollection/`);

    // Get Imaga From Firebase
    const getImage = async () => {
        try {
            const data = await getDocs(imageCollectionRef);
            const filteredData = data.docs.map((profile) => ({ ...profile.data(), id: profile.id }))
            if (filteredData.length == 0) {
                setProfileImage(null);
            }
            else {
                setProfileImage(filteredData[0]['imageUrl']);
            }


        }
        catch (error) {
            toast.error(error.message)
        }
    }

    // Set The Notification Collection
    const [notification, setNotification] = useState([]);
    const [displayNotif, setDisplayNotif] = useState([]);

    // Set The Notification Collection
    const NotificationCollectionRef = collection(db, `Notification/${auth.currentUser.uid}/Notifications/`);


    // State of Number Of Notifications to Navigate to the Notifications Page
    const [stateNbrNot, setStateNbrNot] = useState(false);

    // This State will work if there is no notification of 
    const [if0Notif, setIf0Notif] = useState(false);


    // Get Notification From Firebase
    const getNotification = async () => {
        try {
            const data = await getDocs(NotificationCollectionRef);
            const filteredData = data.docs.map((profile) => ({ ...profile.data(), id: profile.id }))
            if (filteredData.length == 0) {
                setNotification(null);
                setIf0Notif(true);
            }
            else {
                setNotification(filteredData)
                if (filteredData.length > 2) {
                    for (let i = 0; i < filteredData.length; i++) {
                        displayNotif[i] = filteredData[i]
                        if (i >= 1) {
                            break;
                        }
                    }
                    setStateNbrNot(true)
                }
                else {
                    setDisplayNotif(filteredData)
                }
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getNotification();
        getImage();
    }, []);


    const SignOut = async () => {
        try {
            await signOut(auth);
            navigate('/Presentation');
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Disclosure as="nav" className=" sticky top-0 w-full z-50 bg-whiteblur backdrop-blur-lg shadow-xl dark:bg-darkblur">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 hover: text-gray-950  hover:bg-gray-300 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-400   dark:hover:bg-gray-950  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>

                        {/* Logo and Nav elements*/}

                        <div className="flex  flex-1 items-center  justify-center sm:items-stretch sm:justify-start">
                            <Link to="/Home" className='-ml-4'><div className="flex  flex-shrink-0 items-center">
                                <img
                                    alt="HealthInsightAI"
                                    src={Logo}
                                    className="h-10 w-auto" />
                                <span className='font-semibold mr-1 sm:text-sm dark:text-slate-200'>HealthInsight</span><span className=' font-semibold text-purple-500'>AI</span>
                            </div></Link>

                            <div className="hidden sm:ml-6  sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? ' text-white bg-purple-800 ' : '  text-gray-950  hover:bg-[#925FF0] hover:text-white dark:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Light and Dark buttons Mode switcher */}
                        <div className="absolute inset-y-0 right-0 flex justify-around items-center max-sm:space-x-8 md:space-x-4 lg:space-x-8 xl:space-x-14 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                            <div className='max-sm:hidden'>
                                <ThemeToggle />
                            </div>

                            {/* Notification dropdown */}
                            <Menu as="div" className="relative ml-3 top-0 left-0 ">
                                <div>
                                    <MenuButton className="relative flex rounded-full  text-sm ">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open Notification menu</span>
                                        <button
                                            type="button"
                                            className="relative rounded-full px-2 py-1 text-gray-950 dark:text-gray-400 dark:hover:text-white focus:border-slate-400 focus:border-2 dark:focus:border-slate-400 dark:focus:border-2"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <Notification />
                                        </button>
                                    </MenuButton>

                                    <MenuItems transition className="absolute -left-32 z-10 mt-4 w-60  lg:w-60 lg:-left-28 xl:w-80 origin-top-right rounded-md  bg-white dark:bg-slate-900  py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                        <>
                                            {displayNotif.map((item, indx) => (
                                                <div key={indx} className='py-1 px-3 m-auto w-full h-fit  ' >
                                                    <ul>
                                                        <Link to="/Notifications">
                                                            <li className='h-fit py-2  px-4 hover:bg-purple-100 dark:hover:bg-slate-800 rounded-md cursor-pointer hover:scale-105 duration-300'>
                                                                <h1 className='text-center font-semibold text-purple-600 mb-1 '>{item.Title}</h1>
                                                                <p className="text-sm text-center h-10 w-full dark:text-slate-300  overflow-hidden text-ellipsis">{item.notificationContent}</p>
                                                                <span className='text-blue-700 dark:text-blue-600 text-sm w-fit flex mr-2 '>More...</span>
                                                            </li>
                                                        </Link>
                                                    </ul>
                                                </div>
                                            ))}
                                            {stateNbrNot &&
                                                <div className='py-1 mt-2 px-2 m-auto w-full h-10  ' >
                                                    <Link to="/Notifications">
                                                        <span className='flex text-md  justify-center py-1 font-semibold border-2 hover:bg-purple-200 text-purple-600 border-purple-500 rounded-lg '>More Notifications...</span>
                                                    </Link>
                                                </div>
                                            }
                                            {if0Notif &&
                                                <div className='py-1 px-3 m-auto w-full h-fit  ' >
                                                    <h1 className='p-2 text-purple-700 dark:text-slate-400 font-semibold text-center'>No notification found.</h1>
                                                </div>
                                            }
                                        </>

                                    </MenuItems>
                                </div>
                            </Menu>


                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3 ">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none  focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt=""
                                            src={profileImage == null ? profileImg : profileImage}
                                            className="h-9 w-9 rounded-full bg-white"
                                        />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition className="absolute right-0 z-10 mt-4 w-60 origin-top-right rounded-md  bg-white dark:bg-black  py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <a href="#" className="flex gap-2 justify-start items-center px-4 py-3  text-sm text-gray-700 dark:text-white data-[focus]:bg-gray-300  dark:data-[focus]:bg-gray-700">
                                            {/* <MdAccountBox className='mr-2 text-xl  dark:text-white' />  */}
                                            <img
                                                alt=""
                                                src={profileImage == null ? profileImg : profileImage}
                                                className="h-8 w-8 rounded-full bg-white"
                                            />
                                            {auth?.currentUser?.email}
                                        </a>
                                    </MenuItem>

                                    <MenuItem>
                                        <Link to='/Profile' className="flex justify-start items-center px-4 py-3   text-sm text-gray-700 dark:text-white data-[focus]:bg-gray-300 dark:data-[focus]:bg-gray-700">
                                            <IoSettingsSharp className="mr-2 text-lg  dark:text-white " /> Settings
                                        </Link>
                                    </MenuItem>
                                    <hr className='w-5/6 m-auto h-1' />
                                    <MenuItem onClick={() => setIsOpen((prev) => !prev)} >
                                        <a href="#" className="flex justify-start items-center   px-4 py-3  text-sm dark:text-white  text-gray-700 data-[focus]:bg-gray-300 dark:data-[focus]:bg-gray-700">
                                            <FaArrowRightFromBracket className='mr-2 text-lg dark:text-white' />Sign out
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                            {isOpen &&
                                <div className='absolute top-0 max-sm:-right-2 max-md:-right-6 max-lg:-right-6 max-xl:-right-8 xl:-right-36 h-screen w-screen flex justify-center items-center  backdrop-blur-lg bg-black/90'>
                                    <div className=' absolute z-50  flex-row text-center space-y-4 bg-slate-100  max-sm:w-5/6 md:w-4/6 lg:w-1/3 blur-none p-4  m-auto rounded-xl shadow-xl '>
                                        <IoClose className='absolute cursor-pointer top-2 right-2 text-2xl text-purple-600 ' onClick={() => setIsOpen((prev) => !prev)} />
                                        <FaArrowRightFromBracket className='m-auto  text-purple-600  text-5xl' />
                                        <h1 className=' font-bold text-2xl'>Confirm Sign Out</h1>
                                        <p className='text-sm'>Are you sure you want to sign out?</p>
                                        <div className='flex justify-center gap-4 mt-4'>
                                            <button onClick={SignOut} className='bg-purple-600 text-white px-4 py-2 rounded-xl'>Sign Out</button>
                                            <button className='bg-purple-100 text-black px-4 py-2 rounded-xl border-2 border-purple-700' onClick={() => setIsOpen((prev) => !prev)}>Cancel</button>
                                        </div>
                                    </div>

                                </div>
                            }
                        </div>
                    </div>
                </div>

                {/* Mobile Responsive Navbar */}

                <DisclosurePanel className="sm:hidden">
                    <div className=" relative space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-400   text-white dark:bg-gray-800' : 'dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-950 dark:hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium ',
                                )}
                            >
                                {item.name}

                            </DisclosureButton>

                        ))}
                        <hr className='w-full m-auto h-1' />
                        <div className=' p-3 flex  justify-start gap-4'>
                            <h1 className='text-lg dark:text-white '>Screen Mode</h1>   <ThemeToggle className="py-3 dark:bg-dark   " />
                        </div>

                    </div>
                </DisclosurePanel>
            </Disclosure >


            {/* Services Section */}
            <section className="w-11/12 max-sm:mt-0 m-auto my-8 py-10">
                <div className="  mx-auto px-4 ">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold max-sm:text-2xl text-purple-700 mb-4">Our Services</h2>
                        <p className="text-lg max-sm:text-sm dark:text-slate-400 mb-8">
                            We are a team committed to providing top-notch services and solutions. Our mission is to deliver excellence in every project we undertake and to foster a culture of innovation and growth.
                        </p>
                    </div>
                    <div className='grid  gap-8 md:grid-cols-2' >

                        <div className=" relative shadow-lg rounded-lg p-6 mb-6 md:mb-0 w-full hover:bg-slate-200 dark:hover:bg-slate-800 dark:bg-slate-900 hover:scale-105 duration-200">
                            <img className=' absolute top-4 right-4 w-10' src={dash} alt="" />
                            <h3 className="text-xl font-semibold  text-purple-400  mb-2">1. Automated Image Analysis                            </h3>
                            <p className="text-base max-lg:text-sm text-slate-700 dark:text-slate-400">
                                Segmentation: Identify and delineate different structures in neurology images, such as brain regions, tumors, or lesions.
                                Classification: Categorize images based on detected abnormalities, such as types of brain tumors, stroke areas, or other neurological conditions.
                                Detection: Automatically detect anomalies or pathologies in neurology images, such as microbleeds or ischemic regions.
                            </p>
                        </div>
                        <div className=" relative shadow-lg rounded-lg p-6 mb-6 md:mb-0 w-full hover:bg-slate-200 dark:hover:bg-slate-800  dark:bg-slate-900 hover:scale-105 duration-200">
                            <img className=' absolute top-4 right-4 w-10' src={analyse} alt="" />
                            <h3 className="text-xl font-semibold text-purple-400 mb-2 ">2.Quantitative Analysis                            </h3>
                            <p className="text-base max-lg:text-sm text-slate-700 dark:text-slate-400">
                                Measurement of Volumes and Areas: Provide precise measurements of brain structures, lesions, or tumors to monitor changes over time.
                                Tracking Disease Progression: Analyze changes in brain images over multiple scans to track the progression of neurological diseases.
                            </p>
                        </div>
                        <div className="relative shadow-lg rounded-lg p-6 w-full hover:bg-slate-200 dark:hover:bg-slate-800 dark:bg-slate-900 hover:scale-105 duration-200">
                            <img className=' absolute top-4 right-4 w-10' src={rapport} alt="" />
                            <h3 className="text-xl font-semibold text-purple-400 mb-2">3.Report Generation</h3>
                            <p className="text-base max-lg:text-sm text-slate-700 dark:text-slate-400">
                                Generate comprehensive reports that include  images, analysis results, and diagnostic suggestions.
                            </p>
                        </div>
                        <div className="relative shadow-lg rounded-lg p-6 w-full hover:bg-slate-200 dark:hover:bg-slate-800 dark:bg-slate-900 hover:scale-105 duration-200">
                            <img className=' absolute top-4 right-4 w-10' src={Interface} alt="" />
                            <h3 className="text-xl font-semibold text-purple-400 mb-2">4.User-Friendly Interface                            </h3>
                            <p className="text-base max-lg:text-sm text-slate-700 dark:text-slate-400">
                                Intuitive Dashboard: Offer a user-friendly interface for easy navigation and access to analysis results ,services and reports.
                                Visualization Tools: Provide advanced visualization tools for detailed examination of neurology images.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <BtnScrol />
            <Newsletter />
            <Footer />
        </>
    );
}

export default Service
