import * as React from 'react';
import { getAuth } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { db, storage } from '../Config/firebase'
import { getDocs, collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { GrValidate } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { CgSpinnerTwo } from "react-icons/cg";





const Form = () => {

    const auth = getAuth();
    const navigate = useNavigate();

    // Set The Patient Collection
    const [patient, setPatient] = useState([]);
    const patientCollectionRef = collection(db, "patient");

    //Get Patient Data From Firebase
    const getPatient = async () => {
        try {
            const data = await getDocs(patientCollectionRef);
            data.docs.filter((profile) => {
                auth?.currentUser?.uid === profile.data().userId ? setPatient([{ ...profile.data(), id: profile.id }]) : "Error getting patient"
            })
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        getPatient();
    }, []);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [PhoneNum, setPhoneNum] = useState(0);



    // function alpha1(ch) {//vérifie que la chaine est alphabétique 
    //     var t = true;
    //     let i = 0;
    //     ch = ch.toUpperCase();
    //     while (i < ch.length && t)
    //         if (ch.charAt(i) < "A" || ch.charAt(i) > "Z")
    //             t = false;
    //         else
    //             i++;
    //     return t;
    // }

    // function num(ch) { //vérifie que la chaine est alphanumérique
    //     var cha = '0123456789';
    //     var t = true;
    //     let i = 0;
    //     while ((i < ch.length) && t)
    //         if (cha.indexOf(ch.charAt(i)) == -1)
    //             t = false;
    //         else
    //             i++;
    //     return t;
    // }


    // // Field Data Structure Testing
    // const test = () => {

    //     if (!alpha1(firstName) || firstName === "") {
    //         if (!firstName)
    //             toast.error("Please enter your FirstName.\n");
    //         else
    //             toast.error("FirstName should only contain alphabetic characters!");
    //         return false;
    //     }

    //     else if (!alpha1(lastName) || lastName === "") {
    //         if (!lastName)
    //             toast.error("Please enter your LastName.\n");
    //         else
    //             toast.error("LastName should only contain alphabetic characters!");
    //         return false;
    //     }

    //     else if (email.length <= 3 || email.includes("@") === false || email.includes(".") === false) {
    //         if (!email)
    //             toast.error("Please enter your Email.\n");
    //         else
    //             toast.error("Invalid Email Format! ,(eg: example@gmail.com");
    //         return false;
    //     }

    //     else if (!num(PhoneNum.toString()) || PhoneNum.length < 8) {
    //         if (PhoneNum.toString().length < 8)
    //             toast.error("Please enter a valid Phone Number (8 digits)");
    //         else
    //             toast.error("Invalid Phone Number Format! (eg: 12345678)");
    //         return false;
    //     }

    //     else if (!num(age.toString()) || age < 16 || age > 100 || age.toString().length == 0) {
    //         if (age < 16 || age > 100)
    //             toast.error("age must be between 16 and 100");
    //         else if (!num(age.toString())) (
    //             toast.error("Age should be a number")
    //         )
    //         else if (age.toString().length == 0) (
    //             toast.error("Please enter your Age")
    //         )
    //         else
    //             toast.error("Invalid Phone Number Format! (eg: 12345678)");
    //         return false;
    //     }



    //     return true;
    // }


    // const [testS1, setTestS1] = useState(false);

    // const submitForm = () => {
    //     if (test()) {
    //         setTestS1(true);
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }



    // State For Uploading  Images
    const [file, setFile] = useState(null);
    const [Up, setUp] = useState([]);

    // Get prediction result form the AI model
    const [prediction, setPrediction] = useState('');
    const [histogram, setHistogram] = useState('');
    const [stage, setStage] = useState('');
    const [stageInfo, setStageInfo] = useState('');
    const [stageReco, setStageReco] = useState('');

    const [testS2, setTestS2] = useState(false);

    // Upload Image To Firebase Storage
    const handleImageChange = async (e) => {
        var up = [];
        const imageName = e.target.files[0];
        if (imageName) {
            setFile(imageName)
            setTestS2(true)
            try {
                const imageRef = ref(storage, `${auth.currentUser.uid}/AsymptotesImg/${imageName.name}`)
                await uploadBytes(imageRef, imageName).then(() => {
                    toast.success("Images Updated  in Storage Successfully");
                    getDownloadURL(imageRef).then((url) => {
                        up.push(url)
                    })
                }).catch((err) => {
                    console.error(err.message)
                })

            }
            catch (error) {
                console.error(error);
            }
            setUp(up);

        }
    }


    const sendTestApiRequest = async() => {
        // API between register and the IA model
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPrediction(response.data.prediction);
            setHistogram(response.data.histogram);
            setStage(response.data.stage_prediction);
            setStageInfo(response.data.stage_info);
            setStageReco(response.data.stage_recommendation);

        } catch (error) {
            console.error('Error uploading image:', error);
        }

    }

    
    const secondStep = () => {
        if (!testS2)
            toast.error("Please upload Images");
        else {
            sendTestApiRequest();
            handleChange();
            setValue(value + 1);
            handleNext();
        }
    };





    const Register = async () => {

        // API between register page and Rapport page
        const data = {
            firstname: firstName,
            lastname: lastName,
            age: age,
            email: email,
            phone: PhoneNum,
            Gender: patient[0].Gender,
            Country: patient[0].Country,
            imgUrl: Up[0],
            prediction: prediction,
            histogram: histogram,
            stage: stage,
            stageInfo: stageInfo,
            stageRecommandation: stageReco
        }
        try {
            const response = await axios.post('http://localhost:8080/save-data', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Data sent:', response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }

        // Upload Image To Firestore
        try {
            // Assuming a `Image` document and storing image URLs
            const imageDocRef = doc(db, `Image/${auth.currentUser.uid}/AsymptotesImgCollection/`,`AsymptotesImg`); // Adjust document reference
            setDoc(imageDocRef, {
                imageId: Math.random().toString(36).substr(2, 9),
                patientId: auth.currentUser.uid,
                imagesUrl: Up[0],
                imageName: file.name,
                imageTimeStamp: Timestamp.fromDate(new Date())
            });
            toast.info("DataBase Uploaded Successfully")
        }
        catch (error) {
            toast.error(error.message)
        }
    }



    const steps = [
        {
            label: 'Fill Out The Form',
            description: `Complete the form by entering the required information in the designated fields.
            Ensure all necessary sections are filled out accurately. Review the details for correctness
            before submitting the form as instructed.`,
        },
        {
            label: 'Upload Related Images',
            description:
                `Select and Upload the relevant brain MRI images by clicking the upload button. 
                Ensure the images meet the specified format and size requirements before submitting.`,
        },
        {
            label: 'Confirm all previous steps',
            description: `Carefully review all previous steps to ensure everything is accurate and complete.
            Verify that all required information is entered correctly, and confirm that any necessary files,
            including brain MRI images, have been successfully uploaded.`,
        },
    ];

    const [activeStep, setActiveStep] = React.useState(0);
    var [next, setNext] = React.useState(false)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setNext(true);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    //-------------------------------------------

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ px: 3, py: 1 }}>{children}</Box>}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    // Set the value of the number of tab control
    var [value, setValue] = React.useState(0);

    var handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // Handle next tab 

    const firstStep = () => {
        {
            patient.map((profile, i) => (
                setFirstName(profile.FirstName),
                setLastName(profile.LastName),
                setAge(profile.Age),
                setEmail(profile.Email),
                setPhoneNum(profile.PhoneNum)
            ))
        }
        // if (!submitForm()) {
        //     toast.error("Please fill out all required fields");
        // }
        // else {
        //     handleChange();
        //     setValue(value + 1);
        //     handleNext();
        // }

        handleChange();
        setValue(value + 1);
        handleNext();
    }

    


    // Handle previous tab
    const Back = () => {
        handleChange();
        setValue(value - 1);
        handleBack();
    };


    const [loading, setLoading] = useState(false);

    // Handle finish tab
    const Finish = () => {
        handleChange();
        handleNext();
        setValue(value + 1);
        if (value === steps.length - 1) {
            Register();
        }
        setLoading(true);
        setTimeout(() => {
            navigate("/Rapport")
        }, 1000)
    };



    return (
        <>
            <div className="flex  max-lg:flex-col  max-lg:pt-0   w-full lg:px-8  dark:bg-transparent  py-8 shadow-2xl  max-sm:w-full max-sm:my-0   h-fit m-auto  ">

                <div className='w-full flex justify-center items-center  basis-5/12  max-lg:basis-1/2  max-lg:w-full md:p-10  p-8 lg:p-12'>
                    <Box sx={{ maxWidth: 400, maxHeight: 1200 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        optional={
                                            index === 2 ? (
                                                <Typography className='dark:text-slate-300 ' variant="caption">Last step</Typography>
                                            ) : null
                                        }
                                    >
                                        <h1 className='dark:text-blue-700 font-bold text-lg '>{step.label}</h1>
                                    </StepLabel>
                                    <StepContent  >
                                        <Typography className='dark:text-slate-300 py-2'>{step.description}</Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <div className='flex  flex-row space-x-4 text-purple-700 dark:text-purple-500 font-semibold'>
                                                <p
                                                    variant="contained"
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                </p>
                                                <p>Or</p>
                                                <p
                                                    disabled={index === 0}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </p>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper >
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 0, background: "transparent", color: "green" }}>
                                <Typography className='flex flex-row'><GrValidate className='mr-2 text-xl' /> All steps completed - you're finished</Typography>
                            </Paper>
                        )}
                    </Box>
                </div>




                <div className='  basis-1/12 max-lg:basis-0 '>
                    <div className=' w-[1.6px] m-auto h-full bg-slate-400 max-lg:hidden '>
                    </div>
                </div>

                <div method='Post' className="  basis-7/12 max-lg:basis-1/2 h-fit  max-md:w-full lg:w-full md:w-10/12 m-auto lg:m-0 w-full  bg-transparent  p-2   space-y-0 md:px-20 lg:p-8  md:py-8   ">


                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} aria-label="basic tabs example">
                                <Tab sx={{ color: "gray" }} label="Step One" {...a11yProps(0)} />
                                <Tab sx={{ color: "lightgray" }} label="Step Two" {...a11yProps(1)} />
                                <Tab sx={{ color: "lightgray" }} label="Step Three" {...a11yProps(2)} />
                                <Tab sx={{ color: "lightgray" }} label="Final Result " {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            {patient.map((profile) => (

                                <div>
                                    <div >
                                        <div className='mb-4'>
                                            <h2 className="text-center text-purple-700 font-bold text-xl mb-6">Your Health, Our Priority. Register Now!</h2>
                                            <label htmlFor="FirstName" className=" text-purple-700 font-semibold">FirstName:</label>
                                            <input type="text" id="FirstName" name="name" className="w-full px-4 py-2  shadow-lg  rounded-md focus:outline-none focus:ring-2 focus:ring-medium-purple" value={profile.FirstName} readOnly />
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="LastName" className="block text-purple-700 font-semibold">LastName:</label>
                                            <input type="text" id="LastName" name="surname" className="w-full px-4 py-2 shadow-lg  rounded-md focus:outline-none focus:ring-2 focus:ring-medium-purple" value={profile.LastName} readOnly />
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="email" className="block text-purple-700 font-semibold">Email:</label>
                                            <input type="email" id="email" name="email" className="w-full px-4 py-2 shadow-lg  rounded-md focus:outline-none focus:ring-2 focus:ring-medium-purple" value={profile.Email} readOnly />
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="phone" className="block text-purple-700 font-semibold">Phone Number:</label>
                                            <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 shadow-lg  rounded-md focus:outline-none focus:ring-2 focus:ring-medium-purple" value={profile.PhoneNum} readOnly />
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="age" className="block text-purple-700 font-semibold">Age:</label>
                                            <input type="number" id="age" name="age" min={0} className="w-full px-4 py-2 shadow-lg  rounded-md focus:outline-none focus:ring-2 focus:ring-medium-purple" value={profile.Age} readOnly />
                                        </div>
                                    </div>

                                    <div className='flex flex-row w-full p-2 space-x-2'>
                                        <button className=' w-full px-10 py-3 bg-purple-700 rounded-md text-white font-semibold' onClick={() => firstStep()}>Continue</button>
                                    </div>

                                </div>

                            ))}
                        </CustomTabPanel>


                        <CustomTabPanel value={value} index={1}>

                            <div className="mb-4">
                                <label htmlFor="Images" className="block text-purple-700 font-semibold">Upload Images:</label>
                                <input type="file" id="Images" accept='.png, .jpg, .jpeg' name="Images" className="w-0 h-0 hidden px-4 py-2 shadow-lg  rounded-md focus:outline-none focus:ring-2 focus:ring-medium-purple" onChange={handleImageChange} />
                                <div className='flex justify-center items-center m-auto w-96 h-48 mt-2 border-2 border-dashed border-blue-600' onClick={() => document.getElementById("Images").click()}>
                                    <Button onChange={handleImageChange}
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload Image
                                    </Button>
                                </div>
                                <div className='w-full h-auto flex  flex-wrap justify-center items-center'>

                                    {Up &&

                                        Up.map((image, i) => (
                                            <div key={i}>
                                                <img src={image} alt='Image' className='w-24 h-24 m-2' />
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                            <div className='flex flex-row w-full  p-2 space-x-2'>
                                <button className='  w-1/2 px-10 py-3 bg-purple-700 rounded-md text-white font-semibold' onClick={() => secondStep()}>Continue</button>
                                <button className='  w-1/2 px-10 py-3 bg-purple-700 rounded-md text-white font-semibold' onClick={() => Back()}>Back</button>
                            </div>
                        </CustomTabPanel>


                        <CustomTabPanel value={value} index={2}>
                            <p className=' max-sm:text-sm max-md:p-2 p-4 dark:bg-slate-400  '>
                                Before proceeding, please take a moment to carefully review all the information you've provided.
                            </p>
                            <p className=' max-sm:text-sm max-md:p-2 p-4 dark:bg-slate-400  '>
                                Ensure that every detail is accurate and complete, from the personal information to the uploaded brain MRI images.
                            </p>
                            <p className=' max-sm:text-sm max-md:p-2 p-8 px-4 dark:bg-slate-400 font font-semibold '>- Confirm your submission. Are you sure everything is
                                correct and ready to be submitted?</p>
                            <div className='flex flex-row w-full p-2 space-x-2'>
                                <button className='  w-1/2 px-10 py-3 bg-purple-700 rounded-md text-white font-semibold' onClick={() => Finish()}>Finish</button>
                                <button className='  w-1/2 px-10 py-3 bg-purple-700 rounded-md text-white font-semibold' onClick={() => Back()}>Back</button>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <div className='w-full h-full '>
                                <h1 className=' text-center py-8 text-2xl'>analysis in progress please wait few seconds</h1>
                            </div>
                            {loading && <div className=" py-12 flex justify-center items-center w-full h-full  ">
                                <CgSpinnerTwo className="animate-spin text-5xl dark:text-slate-400" />
                            </div>}

                            {/* {prediction && <div className="  flex justify-center items-center w-full h-full  ">
                                <p className='Text-2xl text-red-600'>Tumor:{prediction}</p>
                            </div>} */}


                        </CustomTabPanel>
                    </Box>
                </div>
                {/* {histogram && (
                        <img src={`data:image/png;base64,${histogram}`} alt="Prediction Histogram" />
                    )} */}
            </div>


        </>
    )
}

export default Form
