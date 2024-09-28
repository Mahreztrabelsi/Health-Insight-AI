import React from 'react'
import { useState } from 'react'
import { getDocs, collection,setDoc,doc,addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'
import { db } from '../Config/firebase'

const Test = () => {

    const auth = getAuth();

    // Set The Notification Collection
    const [notification, setNotification] = useState([]);
    const NotificationCollectionRef = collection(db, `Notification/${auth.currentUser.uid}/Notifications/`);

    const handelInfo = (e) => {
        e.preventDefault()
        const title = document.getElementById('Title').value;
        const nameit = document.getElementById('nameit').value;  
        const notificationContent = document.getElementById('notificationContent').value
        const notificationId = document.getElementById('notificationId').value
        

        try {
            // const NotifDocRef = doc(db, `Notification/${auth?.currentUser?.uid}/`); // Adjust document reference
            addDoc(NotificationCollectionRef, {
                Title: title,
                notificationContent: notificationContent,
                notificationDateStamp: Timestamp.fromDate(new Date()),
                notificationIdId: Math.random().toString(36).substr(2, 9),
                patientId: auth.currentUser.uid,
            });
            alert('Notification added successfully');
        }catch(err){
            alert(err.message);
        }
    }


    return (
        <div className='w-5/6 m-auto bg-slate-300 p-4 my-4'>
            <h1 className='text-2xl'>Notification Collection:</h1>
            <form  >
                <div className=' w-1/2 m-auto flex flex-col gap-1'>
                <label htmlFor="Title">Title</label>
                <input type="text" id='Title' required /><br />
                <label htmlFor="nameit">Nameit</label>
                <input type="text" id='nameit' required /><br />
                <label htmlFor="notificationContent">NotificationContent</label>
                <textarea rows={3}  id="notificationContent"></textarea><br />
                <label htmlFor="notificationId">NotificationId</label>
                <input type="number" min={0} id="notificationId" /><br />
                
                <button type="button" className=" w-5/6 mt-4 py-2 px-8 m-auto border-2  border-purple-700 rounded-lg" onClick={handelInfo}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Test
