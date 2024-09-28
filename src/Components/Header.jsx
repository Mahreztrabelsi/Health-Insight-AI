import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from "../assets/healthinsightai.png"
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'



const navigation = [
  { name: 'Home', href: '/Home', current: false },
  { name: 'Servives', href: '/Services', current: false },
  { name: 'AboutUs', href: '/AboutUs', current: false },
  { name: 'ContactUs', href: '/ContactUs', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Header = () => {

  return (
    <Disclosure as="nav" className=" sticky top-0 w-full z-50 bg-whiteblur backdrop-blur-lg shadow-xl dark:bg-darkblur">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative  flex h-16 items-center justify-between">
          <div className="absolute  inset-y-0 left-0 flex items-center sm:hidden">
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
            <Link to="/Presentation" className='-ml-4' ><div className="flex  flex-shrink-1 items-center">
              <img
                alt="HealthInsightAI"
                src={Logo}
                className="h-10 w-auto" />
              <span className='font-semibold mr-1 sm:text-sm dark:text-slate-200'>HealthInsight</span><span className=' font-semibold text-purple-500'>AI</span>
            </div></Link>

            <div className="hidden sm:ml-6  sm:block">
              <div className="flex w-auto md:ml-7 lg:ml-0 space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? ' text-white bg-purple-800 ' : '  text-gray-950  hover:bg-[#9822e0] hover:text-white dark:text-white',
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

          <div className=' flex max-sm:hidden md:mr-3 lg:mr-5  space-x-0 dark:text-white shadow-xl rounded-md py-1 px-1 border-gray-400'>
            <ThemeToggle className=" py-3 dark:bg-dark   " />
          </div>
          <div className="absolute  max-sm:hidden  inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto space-x-1 sm:ml-6 sm:pr-0 md:ml-0 lg:ml-5 ">
            <Link to='/LogIn'><button
              type="button"
              className="   inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md dark:bg-[#8325bd]  dark:hover:bg-purple-600 text-white bg-[#9822e0]  hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Login
            </button>
            </Link>
            <Link to='/SignUp'><button
              type="button"
              className=" inline-flex items-center px-4 py-2  text-sm font-medium border-2 rounded-md text-gray-950  border-purple-400  shadow-lg bg-transparent hover:border-purple-600  dark:text-white dark:border-[#9822e0] dark:hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Sign in
            </button>
            </Link>
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
          <div className=' p-3 flex  justify-start gap-4'>
            <h1 className='text-lg  dark:text-white '>Screen Mode</h1>   <ThemeToggle className="py-3 dark:bg-dark   " />
          </div>
          <hr className='w-full  text-black dark:text-white  mx-auto h-3 ' />

          {/* // buttons inside the DisclosureButton group */}
          < div className=" h-fit w-full  flex  justify-around  items-center   bottom-2" >
            <Link to='/LogIn'><button
              type="button"
              className=" flex  items-center justify-center  py-3 px-8 border border-transparent text-sm font-semibold rounded-md dark:bg-purple-700  dark:hover:bg-purple-600 text-white bg-purple-800 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Login
            </button>
            </Link>
            <Link to='/SignUp'>
              <button
                type="button"
                className=" flex  items-center justify-center  py-3 px-8 border border-transparent text-sm font-semibold rounded-md dark:bg-purple-700  dark:hover:bg-purple-600 text-white bg-purple-800 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Sign in
              </button></Link>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure >
  );
}

export default Header;
