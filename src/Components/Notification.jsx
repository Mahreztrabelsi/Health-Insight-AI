import * as React from 'react';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import { BellIcon } from '@heroicons/react/24/outline'
import { useState } from'react';
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../Config/firebase'
import { getAuth } from 'firebase/auth'


export default function Notification() {

    const auth = getAuth();
    // Set The Notification Collection
    const NotificationCollectionRef = collection(db, `Notification/${auth.currentUser.uid}/Notifications/`);

    // Set The Counter Of Notification Collection
    const [nbrNotify, setNbrNotify] = useState(0)

    const getNotification = async () => {
        try {
            const data = await getDocs(NotificationCollectionRef);
            const filteredData = data.docs.map((profile) => ({ ...profile.data(), id: profile.id }))
            setNbrNotify(filteredData.length);
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    getNotification();
    

    return (

        <Stack className='mt-2' spacing={2} direction="row" sx={{ color: 'action.active' }}>
            <Badge color="secondary" badgeContent={nbrNotify} showZero>
                <BellIcon aria-hidden="true" className="h-6 w-6  text-slate-600 dark:text-slate-300" />
            </Badge>
        </Stack>
    );
}