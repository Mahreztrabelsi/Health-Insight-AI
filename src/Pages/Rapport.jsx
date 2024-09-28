import React from 'react'
import { getAuth } from 'firebase/auth'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactToPrint } from 'react-to-print';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useRef } from "react";
import { db } from '../Config/firebase'
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'

const Rapport = () => {

    const auth = getAuth();


    // Get The data from the Form Page
    const [fetchedData, setFetchedData] = useState({});
    // const [histogram, setHistogram] = useState('');
    const getData = async () => {

        try {
            const response = await axios.get('http://localhost:8080/fetch-data');
            setFetchedData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Set The Notification Collection
    const NotificationCollectionRef = collection(db, `Notification/${auth.currentUser.uid}/Notifications/`);
    const submitNofications = async () => {
        try {
            const notificationContent = `Your brain report is ready! 🧠✨
            Check your notifications for insights and details about your cognitive health.
            Don’t miss out on understanding your mental well-being!`
            addDoc(NotificationCollectionRef, {
                Title: "For You !",
                notificationContent: notificationContent,
                notificationDateStamp: Timestamp.fromDate(new Date()),
                notificationIdId: Math.random().toString(36).substr(2, 9),
                patientId: auth.currentUser.uid,
            });
        } catch (err) {
            alert(err.message);
        }

    };


    useEffect(() => {
        getData();
        submitNofications();        
    }, []);
    


    const glioma = `${fetchedData.firstname} ${fetchedData.lastname}, a ${fetchedData.age}-year-old male, presents with ${fetchedData.prediction}.\n
                A glioma is a type of tumor that forms in the brain or spinal cord from glial cells, which support neurons. Gliomas can be benign (non-cancerous) or malignant (cancerous) and are classified according to the type of glial cells involved and their aggressivity.\n
                
                \b-Types of Gliomas:\bb\n
                Astrocytomas: Include glioblastomas, which are very aggressive.\n
                Oligodendrogliomas: Tend to grow more slowly but may become more aggressive.\n
                Ependymomes: Formed in the ventricles of the brain or spinal cord.\n
                
                -Common Symptoms:\n

                Headaches, often more intense in the morning.\n
                Nausea and vomiting.\n
                Confusion or decline in brain function.\n
                Memory loss.
                Changes in personality or irritability.\n
                Vision problems.\n
                Speech difficulties.`

    const gliomaRecommandations = `
                - Diagnosis and Follow-up\n
                - Medical Imaging: MRI and CT to visualize the tumor.\n
                - Biopsy: To determine the exact type of glioma.\n
                - Regular follow-up: MRI to monitor tumor progression.`



    const meningioma = `${fetchedData.firstname} ${fetchedData.lastname}, a ${fetchedData.age}-year-old male, presents with ${fetchedData.prediction}.\n
                A meningioma is a tumor that develops from the membranes (meninges) surrounding the brain and spinal medulla1. Most meningiomas are benign (non-cancerous) and grow slowly, but sometimes they can be malignant (cancerous).\n

                -Types of Meningiomas:\n

                Convex meningiomas: Develop on the surface of the brain and can exert pressure on it.\n
                Intraventricular Meningiomas: Develop in the ventricles of the brain.\n
                Olfactory groove meningiomas: Located between the brain and nose, near the olfactory nerve.\n
                Sphenoid wing meningiomas: Formed along a bone ridge behind the eyes.\n

                -Common Symptoms:\n

                Headaches that get worse over time\n
                Changes in vision (double or blurred vision)\n
                Hearing loss or ringing in the ears\n
                Memory loss and concentration difficulties\n
                Weakness in arms and legs\n
                Loss of sense of smell\n
                Seizures\n
                Numbness\n
                Speech problems`

    const meningiomaRecommandations = `- Diagnosis and Follow-up.\n
                - Medical Imaging: MRI and CT to visualize the tumor.\n
                - Biopsy: To determine the exact type of meningitis.\n
                - Regular follow-up: MRI to monitor tumor progression`






    const pituitary = `${fetchedData.firstname} ${fetchedData.lastname}, a ${fetchedData.age}-year-old male, presents with ${fetchedData.prediction}.\n
                A pituitary adenoma is a benign tumor that develops in the pituitary gland (or pituitary gland), a small gland located at the base of the brees1. This gland plays a crucial role in regulating many bodily functions by producing various hormones.\n

                -Types of Pituitary:\n

                Functional adenomas: Produce excess hormones, which can cause various hormonal disorders.\n
                Nonfunctional adenomas: Do not produce excess hormones but may cause symptoms due to their size and pressure on surrounding structures2.\n

                -Common Symptoms:\n

                Headaches\n
                Visual impairment (blurred or double vision)\n
                Fatigue\n
                Weight changes\n
                Specific hormonal disorders (such as acromegaly, Cushing's syndrome, or hyperprolactinemia)\n
                Nausea.`


    const pituitaryRecommandations = `- Diagnosis and Follow-up.\n
                - Medical Imaging: MRI and CT to visualize the tumor.\n
                - Hormone tests: To assess hormone levels and determine whether the tumor is functional.\n
                - Regular follow-up: MRI and regular hormone tests to monitor tumor progression`





    const noTumor = `${fetchedData.firstname} ${fetchedData.lastname}, a ${fetchedData.age}-year-old male, presents with ${fetchedData.prediction}.\n
                Non-tumoral brain diseases include a variety of conditions that affect the brain without forming tumors.\n
                \b-Types of No tumor:\bb\n
                Neurodegenerative diseases\n
                Alzheimer’s disease: Causes a progressive loss of memory and cognitive function.\n
                Parkinson’s disease: Affects movement and can cause tremor, stiffness and balance problems.\n
                Multiple sclerosis: An autoimmune disease that attacks the protective sheath of the nerves, causing communication problems between the brain and the body.\n
                Vascular Diseases.\n
                Stroke: Occurs when the blood supply to the brain is interrupted, causing damage to brain cells.\n
                Cerebral aneurysm: A weakened area in the wall of a cerebral artery that can rupture and cause bleeding.\n
                Infections and Inflammation.\n
                Meningitis: Inflammation of the membranes surrounding the brain and spinal cord, often caused by an infection.\n
                Encephalitis: Inflammation of the brain, usually due to a viral infection.`

    // noTumor = noTumor.replace(/\\b/g, '<b>').replace(/\\bb/g, '</b>');

    // // Replace newlines with <br> tags
    // noTumor = noTumor.replace(/\n/g, '<br />');


    const noTumorRecommandations = `- Diagnosis and Follow-up.\n
                - Medical Imaging: MRI and CT to visualize brain abnormalities.\n
                - Laboratory Tests: To identify infections or chemical imbalances.\n
                - Regular follow-up: Regular consultations with neurologists to monitor the progression of the disease.`


    var Overview = ""
    var Recommandations = ""

    if (fetchedData.prediction === "Glioma") {
        Overview = glioma
        Recommandations = gliomaRecommandations
    }
    else if (fetchedData.prediction === "Meningioma") {
        Overview = meningioma
        Recommandations = meningiomaRecommandations
    }
    else if (fetchedData.prediction === "Pituitary") {
        Overview = pituitary
        Recommandations = pituitaryRecommandations
    }
    else if (fetchedData.prediction === "No Tumor") {
        Overview = noTumor
        Recommandations = noTumorRecommandations
    }

    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;



    const histogram = (fetchedData.histogram);
    const stage = (fetchedData.stage);
    console.log(fetchedData)


    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: -3.745,
        lng: -38.523
    };



    return (
        <div>

            <div id='printable-div' className='w-full   bg-slate-50 p-20 max-md:p-8 max-xs:p-4 max-xm:text-sm md:p-12 lg:p-20'>
                <h1 className=' font-bold text-center text-3xl text-purple-700'>Patient Report</h1> <br />
                <div className='w-full grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
                    <div className='w-full'>
                        <b>First Name :</b> {fetchedData.firstname} <br />
                        <b>Last Name :</b> {fetchedData.lastname}<br />
                        <b> Email :</b> {fetchedData.email} <br />
                        <b>Age :</b> {fetchedData.age} <br /><br />
                    </div>
                    <div className='md:hidden lg:flex'></div>
                    <div className='md:hidden lg:flex'></div>
                    <div className='w-full ' >
                        <b>Phone Number : </b>{fetchedData.phone} <br />
                        <b>Gender :</b> {fetchedData.Gender} <br></br>
                        <b>Country :</b> {fetchedData.Country} <br></br>
                        <b>Date of creation :</b> {formattedDate} <br></br> <br />
                    </div>
                </div>
                <hr className='border-black' />
                <br />
                <h3 className='text-center max-md:text-xl mx-8 max-lg:text-2xl lg:text-4xl'>Medical Condition: <b>{fetchedData.prediction}</b></h3><br />

                <h4 className='my-2'><b>- Overview:</b></h4>




                {Overview.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line.trim()}
                        <br />
                    </React.Fragment>
                ))}




                <h4 className='my-2 mt-10'>
                    <b>- MRI Brain Image:</b></h4>
                {/* Asymptomes Images */}

                <div className='w-full h-fit m-auto max-md:space-x-0 gap-6 my-10 p-2 space-x-20 space-y-2  rounded-xl grid lg:grid-cols-2 max-md:grid-cols-1  '>

                    <img src={fetchedData.imgUrl} className='w-48 h-48 rounded-md m-auto    ' />

                    {histogram && (
                        <img className='' src={`data:image/png;base64,${histogram}`} alt="Prediction Histogram" />
                    )}
                </div>
                <br /><br />


                {stage && (
                    <div className='w-full flex flex-col '>
                        <h1 className='text-4xl'>Prediction Stage : <b>{stage}</b></h1><br />
                        <p><b> Stage Description : </b>{fetchedData.stageInfo}</p><br />
                        <p><b> Stage Recommentations : </b>{fetchedData.stageRecommandation}</p>
                    </div>
                )
                }


                <br /><br />

                {/* <iframe
                    width="600"
                    height="450"
                    
                    loading="lazy"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAbLZN4JhxzxWxds5Y2EsI-JAcVQyIJEG0
    &q=Space+Needle,Seattle+WA">
                </iframe> */}
                <br /> <br />

                <br />
                <h4 className='my-2 '><b>- Recommendations:</b></h4>

                {Recommandations.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line.trim()}
                        <br />
                    </React.Fragment>
                ))}


                <br />
                <br />
                <hr className='border-black' />
                <br />
                <p className='text-center'>-Thank you for choosing <b>HealthInsight AI </b>Team for your Brain healthcare needs. If you have any questions or concerns, please don't hesitate to contact our customer support team at <b>HealthInsightAI.Team@gmail.com</b>.</p>
                <br />
                <b>[Health Insight AI Team]</b>.
                <br /> <br />
            </div>
            <div className='px-20 max-md:px-8 max-xs:px-4 max-xm:text-sm md:px-12 lg:px-20'>
                If you want to print to PDF, you can do so here: <br />
                <ReactToPrint
                    trigger={() => <button className='my-2 mb-6 max-md:text-md md:text-xl bg-purple-900 text-white px-8 py-2.5 rounded-md shadow-xl'>Print Report</button>}
                    content={() => document.getElementById('printable-div')}
                />
            </div>

        </div>
    )
}

export default Rapport
