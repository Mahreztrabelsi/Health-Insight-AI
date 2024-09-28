import React from 'react';
import { useEffect, useState } from 'react'
import { db, storage } from '../Config/firebase'
import { getDocs, collection, deleteDoc, doc, updateDoc, setDoc, Timestamp } from 'firebase/firestore'
import { getAuth, deleteUser, signOut } from 'firebase/auth'
import ThemeToggle from "../Components/ThemeToggle"
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { IoReturnUpBack } from "react-icons/io5";
import profileImg from "../assets/user.png";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";


const Profile = () => {

    const auth = getAuth();

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

    // Set The Patient Collection
    const [patient, setPatient] = useState([]);
    const patientCollectionRef = collection(db, "patient/");


    // State For The Delete Account PopUp
    const [isOpenToDelete, setIsOpenToDelete] = useState(false);

    // State for The Sign Out popup
    const [isOpen, setIsOpen] = useState(false);


    const [idd, setIdd] = useState("");

    // Get Patient Data From Firebase

    const getPatient = async () => {
        try {
            const data = await getDocs(patientCollectionRef);
            data.docs.filter((profile) => {
                auth?.currentUser?.uid === profile.data().userId ? setPatient([{ ...profile.data(), id: profile.id }]) : "Error getting patient"
                setIdd(profile.id)
            })
        }
        catch (error) {
            console.log(error.message)
        }
    }



    useEffect(() => {
        getPatient();
        getImage();
    }, []);



    // Sign Out Function
    const SignOut = async () => {
        try {
            await signOut(auth);
            navigate('/Presentation');
            location.reload();
        }
        catch (error) {
            console.error(error);
        }
    }

    // State For Uploading Profile Img
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    const handleImageChange = (e) => {
        const imageName = e.target.files[0];
        if (imageName) {
            setImage(imageName)
        }
    };



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

    function num(ch) { //vérifie que la chaine est numérique
        var cha = '+0123456789';
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

        if (!alpha1(newName) || newName === "") {
            if (!newName)
                toast.error("Please enter your FirstName.\n");
            else
                toast.error("FirstName should only contain alphabetic characters!");
            return false;
        }

        else if (!alpha1(newLastName) || newLastName === "") {
            if (!newLastName)
                toast.error("Please enter your LastName.\n");
            else
                toast.error("LastName should only contain alphabetic characters!");
            return false;
        }

        else if (newEmail.length <= 3 || newEmail.includes("@") === false || newEmail.includes(".") === false) {
            if (!newEmail)
                toast.error("Please enter your Email.\n");
            else
                toast.error("Invalid Email Format! ,(eg: example@gmail.com");
            return false;
        }
        else if (newPassword.length < 8 || !alphanum(newPassword)) {
            if (!newPassword)
                toast.error("Please enter your Password !");
            else if (newPassword.length < 8)
                toast.error("Password should be at least 8 characters long!");
            else if (!alphanum(newPassword))
                toast.error("Password should contain at least  alphabetic characters and  numeric characters!");
            return false;
        }
        else if (!num(newPhoneNum.toString())) {
            if (!num(newPhoneNum.toString()))
                toast.error("Invalid Phone Number Format! (eg: 12345678)");

            return false;
        }
        return true;
    }


    const handleSubmit = () => {

        const imageRef = ref(storage, `${auth.currentUser.uid}/Images/ProfileImg`)
        uploadBytes(imageRef, image).then(() => {
            toast.success("Profile Image Updated Successfully")
            getDownloadURL(imageRef).then((url) => {
                setUrl(url)
                setImage(null)
                try {
                    // Assuming a `Image` document and storing image URLs
                    const imageDocRef = doc(db, `Image/${auth.currentUser.uid}/ProfileImgCollection/`, `ProfileImg`); // Adjust document reference
                    setDoc(imageDocRef, {
                        imageId: Math.random().toString(36).substr(2, 9),
                        patientId: auth.currentUser.uid,
                        imageUrl: url,
                        imageTimeStamp: Timestamp.fromDate(new Date())
                    });
                }
                catch (error) {
                    toast.error(error.message)
                }
            })
        })
            .catch((err) => {
                if (!image) {
                    toast.error("No Image was Uploated")
                }
            })

    }


    setTimeout(() => {
        if (url != null) {
            location.reload();
        }
    }, 2000);


    const [isShow, setIsShow] = useState(false);
    const pass = document.getElementById("Password");
    if (isShow && pass != null) {
        pass.type = "text";
    } else if (!isShow && pass != null) {
        pass.type = "password";
    }


    // Update Patient Data
    const [newName, setNewName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newAge, setNewAge] = useState(0);
    const [newPhoneNum, setNewPhoneNum] = useState('');
    const [numCountry, setNumCountry] = useState('');
    const [gender, setGender] = useState('');
    const [country, setNewCountry] = useState('')


    // Set the Form  update state
    const [isEdit, setIsEdit] = useState(false);

    const updateUserData = async (id) => {

        if (isEdit) {

            if (test()) {


                try {
                    // Update Patient Data In Firebase
                    const patientDoc = doc(db, `patient/`, id);
                    {
                        await setDoc(patientDoc, {
                            FirstName: newName,
                            LastName: newLastName,
                            Age: newAge,
                            Email: newEmail,
                            Password: newPassword,
                            PhoneNum: numCountry + " " + newPhoneNum,
                            Gender: gender,
                            Country: country,
                            userId: auth.currentUser.uid,
                        }),
                            toast.success("Patient Data Updated Successfully")
                        setIsEdit(false)
                        location.reload();
                    }
                }
                catch (error) {
                    toast.error(error.message);
                }
            }

        }

    }


    // Delete User Account
    const deleteAcc = async (id) => {
        try {

            // Delete User Account From Database
            const patientDoc = doc(db, `patient/`, id);
            const imageDoc = doc(db, `Image/${auth.currentUser.uid}/`, `ProfileImgCollection/ProfileImg`)
            const imageDoc2 = doc(db, `Image/${auth.currentUser.uid}/`, `AsymptotesImgCollection/AsymptotesImg`)
            // const notificationDs = doc(db, `Notification/${auth.currentUser.uid}`,`/Notifications/${id}`)
            await deleteDoc(patientDoc);
            await deleteDoc(imageDoc);
            await deleteDoc(imageDoc2);
            // await deleteDoc(notificationDs);

            

            // Delete Image from Firebase Storage
            const storageRef = ref(storage, `${auth.currentUser.uid}/Images/ProfileImg`);
            const storageRef1 = ref(storage, `${auth.currentUser.uid}/AsymptotesImg/`);

            // List all files in the folder
            const listResult = await listAll(storageRef1);

            // Loop through and delete each file
            for (const itemRef of listResult.items) {
                await deleteObject(itemRef);
            }

            await deleteObject(storageRef);


        }
        catch (error) {
            toast.error(error.message)
        }
        
        // Delete User From Authentication
        await deleteUser(auth?.currentUser);
        location.reload();
        navigate('/Presentation');
    }


    return (
        <div className=' relative w-5/6 h-fit  max-sm:h-fit max-sm:w-full bg-slate-100 dark:bg-gray-900 rounded-xl shadow-2xl p-4 max-sm:p-1  max-sm:m-0  m-auto '>
            <div className='flex justify-between mx-10 mt-4 '>
                <Link to="/home"><IoReturnUpBack className='dark:text-purple-200 border-2 rounded-lg text-slate-700 border-slate-400 text-3xl w-12  cursor-pointer' /></Link>
                <ThemeToggle />
            </div>
            <div className='w-fit m-auto p-4 my-2'>
                <img className='w-40 h-40 max-sm:w-26 max-sm:h-26 max-md:w-32 max-md:h-32 border-4 p-1  border-purple-500 dark:border-purple-800 rounded-full ' src={profileImage == null ? profileImg : profileImage} alt="" />
                <div className='relative bottom-8 left-24 max-md:left-20 max-md:bottom-8 max-sm:bottom-9  max-sm:left-20 '>
                    <div className='absolute flex  w-fit h-fit p-1 space-x-1 rounded-3xl top-0 left-0 bg-slate-200 dark:bg-slate-800 '>
                        <div className=' w-8 h-8 max-md:w-6  max-md:h-6 flex justify-center overflow-hidden items-center rounded-full' >
                            <Fab color="primary" aria-label="add" onClick={() => document.getElementById("upload").click()} >
                                <AddIcon className='-z-1' />
                                <input className=' w-0 rounded-md text-white ' type="file" id="upload" onChange={handleImageChange} />
                            </Fab>
                        </div>
                        <div className=' w-8 h-8 max-md:w-6  max-md:h-6 flex justify-center overflow-hidden items-center rounded-full' >
                            <Fab color="secondary" aria-label="edit" onClick={handleSubmit}>
                                <EditIcon className='-z-1' />
                            </Fab>
                        </div>
                    </div>
                </div>
            </div>
            {/* Display the user Data */}
            {patient.map((profile) => (
                <div key={profile.id}>
                    {auth?.currentUser?.uid == profile.userId &&
                        <>
                            {!isEdit &&
                                <div>
                                    <div className=' m-auto w-10/12 grid h-fit grid-cols-2 max-sm:my-0 my-2 space-y-1'>
                                        <label className='text-purple-500 font-bold' htmlFor="FirstName">FirstName </label>
                                        <label className='text-purple-500 font-bold' htmlFor="LastName">LastName </label>
                                        <input className='p-2 w-11/12 px-3 max-md:text-lg text-xl max-sm:text-md   outline-none shadow-lg rounded-md  ' readOnly={true} type="text" id="FirstName" value={profile.FirstName} />
                                        <input className='p-2 w-11/12 px-3 max-md:text-lg text-xl max-sm:text-md outline-none shadow-lg rounded-md  ' readOnly={true} type="text" id="LastName" value={profile.LastName} />
                                    </div>
                                    <div className=' m-auto w-5/6 grid grid-cols-1 space-y-2 max-sm:space-y-1 '>
                                        <label className='text-purple-500  font-bold' htmlFor="Email">Email </label>
                                        <input className='p-2 w-full px-3 max-md:text-lg text-xl max-sm:text-md outline-none shadow-lg rounded-md ' type="text" id="Email" readOnly={true} value={profile.Email} />
                                        <label className='text-purple-500  font-bold' htmlFor="Password">Password </label>
                                        <input className=' p-2 w-full px-3 max-md:text-lg text-xl max-sm:text-md   outline-none shadow-lg rounded-md  ' readOnly={true} type="Password" id="Password" value={profile.Password} />
                                        <label className='text-purple-500  font-bold' htmlFor="Age">Age </label>
                                        <input className=' p-2 w-full px-3  max-md:text-lg text-xl max-sm:text-md  outline-none shadow-lg rounded-md ' readOnly={true} type="Number" id="Age" value={profile.Age} />
                                        <label className='text-purple-500  font-bold' htmlFor="PhoneNum">Phone </label>
                                        <input className=' p-2 w-full px-3 max-md:text-lg  text-xl max-sm:text-md outline-none shadow-lg rounded-md ' readOnly={true} type="text" id="PhoneNum" value={profile.PhoneNum} />
                                        <label className='text-purple-500  font-bold' htmlFor="Gender">Gender </label>
                                        <input className=' p-2 w-full px-3 max-md:text-lg  text-xl max-sm:text-md outline-none shadow-lg rounded-md ' readOnly={true} type="text" id="Gender" value={profile.Gender} />
                                        <label className='text-purple-500  font-bold' htmlFor="Country">Country </label>
                                        <input className=' p-2 w-full px-3 max-md:text-lg  text-xl max-sm:text-md outline-none shadow-lg rounded-md ' readOnly={true} type="text" id="Country" value={profile.Country} />




                                        <button className=' bg-purple-800 font-semibold rounded-md  w-full  text-white px-4 py-2 max-sm:text-xs ' onClick={() => setIsEdit(true)}>Edit Profile</button>
                                    </div>
                                </div>
                            }

                            {isEdit &&
                                <div>
                                    <div className=' m-auto w-10/12 grid h-fit grid-cols-2 max-sm:my-0 my-2 space-y-1'>
                                        <label className='text-purple-500 font-bold' htmlFor="FirstName">FirstName </label>
                                        <label className='text-purple-500 font-bold' htmlFor="LastName">LastName </label>
                                        <input className='p-2 w-11/12 px-3 max-md:text-lg text-xl max-sm:text-md   outline-none shadow-lg rounded-md  ' type="text" id="FirstName" placeholder={profile.FirstName} onChange={(e) => { setNewName(e.target.value), setUpdateState(true); }} />
                                        <input className='p-2 w-11/12 px-3 max-md:text-lg text-xl max-sm:text-md outline-none shadow-lg rounded-md  ' type="text" id="LastName" placeholder={profile.LastName} onChange={(e) => setNewLastName(e.target.value)} />
                                    </div>
                                    <div className=' m-auto w-5/6 grid grid-cols-1 space-y-2 max-sm:space-y-1 '>
                                        <label className='text-purple-500  font-bold' htmlFor="Email">Email </label>
                                        <input className='p-2 w-full px-3 max-md:text-lg text-xl max-sm:text-md outline-none shadow-lg rounded-md ' type="text" id="Email" placeholder={profile.Email} onChange={(e) => setNewEmail(e.target.value)} />
                                        <label className='text-purple-500  font-bold' htmlFor="Password">Password </label>
                                        <input className=' p-2 w-full px-3 max-md:text-lg text-xl max-sm:text-md   outline-none shadow-lg rounded-md  ' type="Password" id="Password" placeholder={profile.Password} onChange={(e) => setNewPassword(e.target.value)} />
                                        <div className='relative max-md:bottom-10 bottom-8 w-full'>
                                            {!isShow &&
                                                <FaEyeSlash className='absolute right-10 top-0 text-xl text-purple-600 max-sm:text-md max-sm:top-1 max-md:-top-2 md:-top-2 ' onClick={() => setIsShow(true)} />
                                            }
                                            {isShow &&
                                                <IoEyeSharp className='absolute right-10 top-0 text-xl text-purple-600 max-sm:text-md max-sm:top-1 max-md:-top-2 md:-top-2 ' onClick={() => setIsShow(false)} />

                                            }
                                        </div>
                                        <label className='text-purple-500  font-bold' htmlFor="Age">Age </label>
                                        <input className=' p-2 w-full px-3  max-md:text-lg text-xl max-sm:text-md  outline-none shadow-lg rounded-md ' min={0} type="Number" id="Age" placeholder={profile.Age} onChange={(e) => setNewAge(e.target.value)} />
                                        <label className='text-purple-500  font-bold' htmlFor="PhoneNum">Phone </label>
                                        <input className=' p-2 w-full px-3 max-md:text-lg  text-xl max-sm:text-md outline-none shadow-lg rounded-md ' min={0} type="text" id="PhoneNum" placeholder={profile.PhoneNum} onChange={(e) => setNewPhoneNum(e.target.value)} />
                                        <label className='text-purple-500  font-bold' htmlFor="Gender">Gender </label>
                                        <Box className='w-full'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                                <Select

                                                    labelId="demo-simple-select-label"
                                                    id="Gende"
                                                    label="Gender"
                                                    onChange={(e) => setGender(e.target.value)}
                                                >
                                                    <MenuItem value={"Man"}>Man</MenuItem>
                                                    <MenuItem value={"woman"}>woman</MenuItem>
                                                    <MenuItem value={"Other"}>Other</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>

                                        <label className='text-purple-500  font-bold' htmlFor="Country">Country </label>
                                        <Autocomplete
                                            className='w-full'
                                            id="Country"
                                            sx={{ height: 100 }}
                                            options={countries}
                                            autoHighlight
                                            getOptionLabel={(option) => option.label + ` (+${option.phone})`}
                                            onChange={(event, newValue) => {
                                                setNewCountry(newValue.label)
                                                setNumCountry(`(+${newValue.phone})`)
                                            }}
                                            defaultValue={profile.country}

                                            renderOption={(props, option) => {
                                                const { key, ...optionProps } = props;
                                                return (
                                                    <Box
                                                        key={key}
                                                        component="li"
                                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                        {...optionProps}
                                                    >
                                                        <img
                                                            loading="lazy"
                                                            width="20"
                                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                            alt=""

                                                        />
                                                        {option.label} ({option.code}) +{option.phone}

                                                    </Box>
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField

                                                    {...params}
                                                    label="Choose a country"
                                                    slotProps={{

                                                        htmlInput: {
                                                            ...params.inputProps,
                                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                                        },
                                                    }}
                                                />
                                            )}
                                        />



                                        <button className=' bg-green-600 rounded-md  w-full font-semibold  text-white px-4 py-2 max-sm:text-xs ' onClick={() => updateUserData(profile.id)}>SAVE CHANGES</button>
                                    </div>
                                </div>
                            }

                            <div className=' flex justify-around mt-4'>
                                <button className='flex bg-red-700 hover:bg-red-500 text-white p-2 rounded-md max-sm:text-xs' onClick={() => setIsOpenToDelete((prev) => !prev)} >Delete Account <MdDelete className='mt-1 ml-1' /></button>
                                <button className='flex bg-slate-600 hover:bg-slate-500 text-white p-2 rounded-md max-sm:text-xs' onClick={() => setIsOpen((prev) => !prev)} >Sign Out <FaArrowRightFromBracket className='mt-1 ml-2' /></button>

                            </div>
                            {isOpen &&
                                <div className='absolute top-0 z-50 max-sm:-right-0 max-md:-right-14 max-lg:-right-20 max-xl:-right-24 xl:-left-36 h-full w-screen flex justify-center items-center  backdrop-blur-lg bg-black/90'>
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
                            {isOpenToDelete &&
                                <div className='absolute top-0 z-50 max-sm:-right-0 max-md:-right-14 max-lg:-right-20 max-xl:-right-24 xl:-left-36 h-full w-screen flex justify-center items-center  backdrop-blur-lg bg-black/90'>
                                    <div className=' absolute z-50  flex-row text-center space-y-4 bg-slate-100  max-sm:w-5/6 md:w-4/6 lg:w-1/3 blur-none p-4  m-auto rounded-xl shadow-xl '>
                                        <IoClose className='absolute cursor-pointer top-2 right-2 text-2xl text-purple-600 ' onClick={() => setIsOpenToDelete((prev) => !prev)} />
                                        <MdDelete className='m-auto  text-purple-600  text-5xl' />
                                        <h1 className=' font-bold text-2xl'>Confirm Deleting This Account</h1>
                                        <p className='text-sm'>Are you sure you want to Delete This Account permanently ?</p>
                                        <div className='flex justify-center gap-4 mt-4'>
                                            <button onClick={() => deleteAcc(profile.id)} className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl'>Delete Account</button>
                                            <button className='bg-purple-100 text-black px-4 py-2 rounded-xl border-2 border-purple-700' onClick={() => setIsOpenToDelete((prev) => !prev)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>}
                        </>
                    }
                </div>
            ))}
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
                theme="colored"
                transition:Bounce />
        </div>
    )

}

export default Profile
// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
        code: 'AE',
        label: 'United Arab Emirates',
        phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
        code: 'AG',
        label: 'Antigua and Barbuda',
        phone: '1-268',
    },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    {
        code: 'AU',
        label: 'Australia',
        phone: '61',
        suggested: true,
    },
    { code: 'AW', label: 'Aruba', phone: '297' },
    { code: 'AX', label: 'Alland Islands', phone: '358' },
    { code: 'AZ', label: 'Azerbaijan', phone: '994' },
    {
        code: 'BA',
        label: 'Bosnia and Herzegovina',
        phone: '387',
    },
    { code: 'BB', label: 'Barbados', phone: '1-246' },
    { code: 'BD', label: 'Bangladesh', phone: '880' },
    { code: 'BE', label: 'Belgium', phone: '32' },
    { code: 'BF', label: 'Burkina Faso', phone: '226' },
    { code: 'BG', label: 'Bulgaria', phone: '359' },
    { code: 'BH', label: 'Bahrain', phone: '973' },
    { code: 'BI', label: 'Burundi', phone: '257' },
    { code: 'BJ', label: 'Benin', phone: '229' },
    { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
    { code: 'BM', label: 'Bermuda', phone: '1-441' },
    { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
    { code: 'BO', label: 'Bolivia', phone: '591' },
    { code: 'BR', label: 'Brazil', phone: '55' },
    { code: 'BS', label: 'Bahamas', phone: '1-242' },
    { code: 'BT', label: 'Bhutan', phone: '975' },
    { code: 'BV', label: 'Bouvet Island', phone: '47' },
    { code: 'BW', label: 'Botswana', phone: '267' },
    { code: 'BY', label: 'Belarus', phone: '375' },
    { code: 'BZ', label: 'Belize', phone: '501' },
    {
        code: 'CA',
        label: 'Canada',
        phone: '1',
        suggested: true,
    },
    {
        code: 'CC',
        label: 'Cocos (Keeling) Islands',
        phone: '61',
    },
    {
        code: 'CD',
        label: 'Congo, Democratic Republic of the',
        phone: '243',
    },
    {
        code: 'CF',
        label: 'Central African Republic',
        phone: '236',
    },
    {
        code: 'CG',
        label: 'Congo, Republic of the',
        phone: '242',
    },
    { code: 'CH', label: 'Switzerland', phone: '41' },
    { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
    { code: 'CK', label: 'Cook Islands', phone: '682' },
    { code: 'CL', label: 'Chile', phone: '56' },
    { code: 'CM', label: 'Cameroon', phone: '237' },
    { code: 'CN', label: 'China', phone: '86' },
    { code: 'CO', label: 'Colombia', phone: '57' },
    { code: 'CR', label: 'Costa Rica', phone: '506' },
    { code: 'CU', label: 'Cuba', phone: '53' },
    { code: 'CV', label: 'Cape Verde', phone: '238' },
    { code: 'CW', label: 'Curacao', phone: '599' },
    { code: 'CX', label: 'Christmas Island', phone: '61' },
    { code: 'CY', label: 'Cyprus', phone: '357' },
    { code: 'CZ', label: 'Czech Republic', phone: '420' },
    {
        code: 'DE',
        label: 'Germany',
        phone: '49',
        suggested: true,
    },
    { code: 'DJ', label: 'Djibouti', phone: '253' },
    { code: 'DK', label: 'Denmark', phone: '45' },
    { code: 'DM', label: 'Dominica', phone: '1-767' },
    {
        code: 'DO',
        label: 'Dominican Republic',
        phone: '1-809',
    },
    { code: 'DZ', label: 'Algeria', phone: '213' },
    { code: 'EC', label: 'Ecuador', phone: '593' },
    { code: 'EE', label: 'Estonia', phone: '372' },
    { code: 'EG', label: 'Egypt', phone: '20' },
    { code: 'EH', label: 'Western Sahara', phone: '212' },
    { code: 'ER', label: 'Eritrea', phone: '291' },
    { code: 'ES', label: 'Spain', phone: '34' },
    { code: 'ET', label: 'Ethiopia', phone: '251' },
    { code: 'FI', label: 'Finland', phone: '358' },
    { code: 'FJ', label: 'Fiji', phone: '679' },
    {
        code: 'FK',
        label: 'Falkland Islands (Malvinas)',
        phone: '500',
    },
    {
        code: 'FM',
        label: 'Micronesia, Federated States of',
        phone: '691',
    },
    { code: 'FO', label: 'Faroe Islands', phone: '298' },
    {
        code: 'FR',
        label: 'France',
        phone: '33',
        suggested: true,
    },
    { code: 'GA', label: 'Gabon', phone: '241' },
    { code: 'GB', label: 'United Kingdom', phone: '44' },
    { code: 'GD', label: 'Grenada', phone: '1-473' },
    { code: 'GE', label: 'Georgia', phone: '995' },
    { code: 'GF', label: 'French Guiana', phone: '594' },
    { code: 'GG', label: 'Guernsey', phone: '44' },
    { code: 'GH', label: 'Ghana', phone: '233' },
    { code: 'GI', label: 'Gibraltar', phone: '350' },
    { code: 'GL', label: 'Greenland', phone: '299' },
    { code: 'GM', label: 'Gambia', phone: '220' },
    { code: 'GN', label: 'Guinea', phone: '224' },
    { code: 'GP', label: 'Guadeloupe', phone: '590' },
    { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
    { code: 'GR', label: 'Greece', phone: '30' },
    {
        code: 'GS',
        label: 'South Georgia and the South Sandwich Islands',
        phone: '500',
    },
    { code: 'GT', label: 'Guatemala', phone: '502' },
    { code: 'GU', label: 'Guam', phone: '1-671' },
    { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
    { code: 'GY', label: 'Guyana', phone: '592' },
    { code: 'HK', label: 'Hong Kong', phone: '852' },
    {
        code: 'HM',
        label: 'Heard Island and McDonald Islands',
        phone: '672',
    },
    { code: 'HN', label: 'Honduras', phone: '504' },
    { code: 'HR', label: 'Croatia', phone: '385' },
    { code: 'HT', label: 'Haiti', phone: '509' },
    { code: 'HU', label: 'Hungary', phone: '36' },
    { code: 'ID', label: 'Indonesia', phone: '62' },
    { code: 'IE', label: 'Ireland', phone: '353' },
    { code: 'IL', label: 'Israel', phone: '972' },
    { code: 'IM', label: 'Isle of Man', phone: '44' },
    { code: 'IN', label: 'India', phone: '91' },
    {
        code: 'IO',
        label: 'British Indian Ocean Territory',
        phone: '246',
    },
    { code: 'IQ', label: 'Iraq', phone: '964' },
    {
        code: 'IR',
        label: 'Iran, Islamic Republic of',
        phone: '98',
    },
    { code: 'IS', label: 'Iceland', phone: '354' },
    { code: 'IT', label: 'Italy', phone: '39' },
    { code: 'JE', label: 'Jersey', phone: '44' },
    { code: 'JM', label: 'Jamaica', phone: '1-876' },
    { code: 'JO', label: 'Jordan', phone: '962' },
    {
        code: 'JP',
        label: 'Japan',
        phone: '81',
        suggested: true,
    },
    { code: 'KE', label: 'Kenya', phone: '254' },
    { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
    { code: 'KH', label: 'Cambodia', phone: '855' },
    { code: 'KI', label: 'Kiribati', phone: '686' },
    { code: 'KM', label: 'Comoros', phone: '269' },
    {
        code: 'KN',
        label: 'Saint Kitts and Nevis',
        phone: '1-869',
    },
    {
        code: 'KP',
        label: "Korea, Democratic People's Republic of",
        phone: '850',
    },
    { code: 'KR', label: 'Korea, Republic of', phone: '82' },
    { code: 'KW', label: 'Kuwait', phone: '965' },
    { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
    { code: 'KZ', label: 'Kazakhstan', phone: '7' },
    {
        code: 'LA',
        label: "Lao People's Democratic Republic",
        phone: '856',
    },
    { code: 'LB', label: 'Lebanon', phone: '961' },
    { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
    { code: 'LI', label: 'Liechtenstein', phone: '423' },
    { code: 'LK', label: 'Sri Lanka', phone: '94' },
    { code: 'LR', label: 'Liberia', phone: '231' },
    { code: 'LS', label: 'Lesotho', phone: '266' },
    { code: 'LT', label: 'Lithuania', phone: '370' },
    { code: 'LU', label: 'Luxembourg', phone: '352' },
    { code: 'LV', label: 'Latvia', phone: '371' },
    { code: 'LY', label: 'Libya', phone: '218' },
    { code: 'MA', label: 'Morocco', phone: '212' },
    { code: 'MC', label: 'Monaco', phone: '377' },
    {
        code: 'MD',
        label: 'Moldova, Republic of',
        phone: '373',
    },
    { code: 'ME', label: 'Montenegro', phone: '382' },
    {
        code: 'MF',
        label: 'Saint Martin (French part)',
        phone: '590',
    },
    { code: 'MG', label: 'Madagascar', phone: '261' },
    { code: 'MH', label: 'Marshall Islands', phone: '692' },
    {
        code: 'MK',
        label: 'Macedonia, the Former Yugoslav Republic of',
        phone: '389',
    },
    { code: 'ML', label: 'Mali', phone: '223' },
    { code: 'MM', label: 'Myanmar', phone: '95' },
    { code: 'MN', label: 'Mongolia', phone: '976' },
    { code: 'MO', label: 'Macao', phone: '853' },
    {
        code: 'MP',
        label: 'Northern Mariana Islands',
        phone: '1-670',
    },
    { code: 'MQ', label: 'Martinique', phone: '596' },
    { code: 'MR', label: 'Mauritania', phone: '222' },
    { code: 'MS', label: 'Montserrat', phone: '1-664' },
    { code: 'MT', label: 'Malta', phone: '356' },
    { code: 'MU', label: 'Mauritius', phone: '230' },
    { code: 'MV', label: 'Maldives', phone: '960' },
    { code: 'MW', label: 'Malawi', phone: '265' },
    { code: 'MX', label: 'Mexico', phone: '52' },
    { code: 'MY', label: 'Malaysia', phone: '60' },
    { code: 'MZ', label: 'Mozambique', phone: '258' },
    { code: 'NA', label: 'Namibia', phone: '264' },
    { code: 'NC', label: 'New Caledonia', phone: '687' },
    { code: 'NE', label: 'Niger', phone: '227' },
    { code: 'NF', label: 'Norfolk Island', phone: '672' },
    { code: 'NG', label: 'Nigeria', phone: '234' },
    { code: 'NI', label: 'Nicaragua', phone: '505' },
    { code: 'NL', label: 'Netherlands', phone: '31' },
    { code: 'NO', label: 'Norway', phone: '47' },
    { code: 'NP', label: 'Nepal', phone: '977' },
    { code: 'NR', label: 'Nauru', phone: '674' },
    { code: 'NU', label: 'Niue', phone: '683' },
    { code: 'NZ', label: 'New Zealand', phone: '64' },
    { code: 'OM', label: 'Oman', phone: '968' },
    { code: 'PA', label: 'Panama', phone: '507' },
    { code: 'PE', label: 'Peru', phone: '51' },
    { code: 'PF', label: 'French Polynesia', phone: '689' },
    { code: 'PG', label: 'Papua New Guinea', phone: '675' },
    { code: 'PH', label: 'Philippines', phone: '63' },
    { code: 'PK', label: 'Pakistan', phone: '92' },
    { code: 'PL', label: 'Poland', phone: '48' },
    {
        code: 'PM',
        label: 'Saint Pierre and Miquelon',
        phone: '508',
    },
    { code: 'PN', label: 'Pitcairn', phone: '870' },
    { code: 'PR', label: 'Puerto Rico', phone: '1' },
    {
        code: 'PS',
        label: 'Palestine, State of',
        phone: '970',
    },
    { code: 'PT', label: 'Portugal', phone: '351' },
    { code: 'PW', label: 'Palau', phone: '680' },
    { code: 'PY', label: 'Paraguay', phone: '595' },
    { code: 'QA', label: 'Qatar', phone: '974' },
    { code: 'RE', label: 'Reunion', phone: '262' },
    { code: 'RO', label: 'Romania', phone: '40' },
    { code: 'RS', label: 'Serbia', phone: '381' },
    { code: 'RU', label: 'Russian Federation', phone: '7' },
    { code: 'RW', label: 'Rwanda', phone: '250' },
    { code: 'SA', label: 'Saudi Arabia', phone: '966' },
    { code: 'SB', label: 'Solomon Islands', phone: '677' },
    { code: 'SC', label: 'Seychelles', phone: '248' },
    { code: 'SD', label: 'Sudan', phone: '249' },
    { code: 'SE', label: 'Sweden', phone: '46' },
    { code: 'SG', label: 'Singapore', phone: '65' },
    { code: 'SH', label: 'Saint Helena', phone: '290' },
    { code: 'SI', label: 'Slovenia', phone: '386' },
    {
        code: 'SJ',
        label: 'Svalbard and Jan Mayen',
        phone: '47',
    },
    { code: 'SK', label: 'Slovakia', phone: '421' },
    { code: 'SL', label: 'Sierra Leone', phone: '232' },
    { code: 'SM', label: 'San Marino', phone: '378' },
    { code: 'SN', label: 'Senegal', phone: '221' },
    { code: 'SO', label: 'Somalia', phone: '252' },
    { code: 'SR', label: 'Suriname', phone: '597' },
    { code: 'SS', label: 'South Sudan', phone: '211' },
    {
        code: 'ST',
        label: 'Sao Tome and Principe',
        phone: '239',
    },
    { code: 'SV', label: 'El Salvador', phone: '503' },
    {
        code: 'SX',
        label: 'Sint Maarten (Dutch part)',
        phone: '1-721',
    },
    {
        code: 'SY',
        label: 'Syrian Arab Republic',
        phone: '963',
    },
    { code: 'SZ', label: 'Swaziland', phone: '268' },
    {
        code: 'TC',
        label: 'Turks and Caicos Islands',
        phone: '1-649',
    },
    { code: 'TD', label: 'Chad', phone: '235' },
    {
        code: 'TF',
        label: 'French Southern Territories',
        phone: '262',
    },
    { code: 'TG', label: 'Togo', phone: '228' },
    { code: 'TH', label: 'Thailand', phone: '66' },
    { code: 'TJ', label: 'Tajikistan', phone: '992' },
    { code: 'TK', label: 'Tokelau', phone: '690' },
    { code: 'TL', label: 'Timor-Leste', phone: '670' },
    { code: 'TM', label: 'Turkmenistan', phone: '993' },
    { code: 'TN', label: 'Tunisia', phone: '216' },
    { code: 'TO', label: 'Tonga', phone: '676' },
    { code: 'TR', label: 'Turkey', phone: '90' },
    {
        code: 'TT',
        label: 'Trinidad and Tobago',
        phone: '1-868',
    },
    { code: 'TV', label: 'Tuvalu', phone: '688' },
    {
        code: 'TW',
        label: 'Taiwan',
        phone: '886',
    },
    {
        code: 'TZ',
        label: 'United Republic of Tanzania',
        phone: '255',
    },
    { code: 'UA', label: 'Ukraine', phone: '380' },
    { code: 'UG', label: 'Uganda', phone: '256' },
    {
        code: 'US',
        label: 'United States',
        phone: '1',
        suggested: true,
    },
    { code: 'UY', label: 'Uruguay', phone: '598' },
    { code: 'UZ', label: 'Uzbekistan', phone: '998' },
    {
        code: 'VA',
        label: 'Holy See (Vatican City State)',
        phone: '379',
    },
    {
        code: 'VC',
        label: 'Saint Vincent and the Grenadines',
        phone: '1-784',
    },
    { code: 'VE', label: 'Venezuela', phone: '58' },
    {
        code: 'VG',
        label: 'British Virgin Islands',
        phone: '1-284',
    },
    {
        code: 'VI',
        label: 'US Virgin Islands',
        phone: '1-340',
    },
    { code: 'VN', label: 'Vietnam', phone: '84' },
    { code: 'VU', label: 'Vanuatu', phone: '678' },
    { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
    { code: 'WS', label: 'Samoa', phone: '685' },
    { code: 'XK', label: 'Kosovo', phone: '383' },
    { code: 'YE', label: 'Yemen', phone: '967' },
    { code: 'YT', label: 'Mayotte', phone: '262' },
    { code: 'ZA', label: 'South Africa', phone: '27' },
    { code: 'ZM', label: 'Zambia', phone: '260' },
    { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];
