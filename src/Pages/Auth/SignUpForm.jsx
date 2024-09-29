import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { db } from '../../Config/firebase'
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'




export default function SignUpForm() {

    const auth = getAuth();
    const user = auth?.currentUser;
    const navigate = useNavigate();

    // Set The Patient Collection
    const [patient, setPatient] = useState([]);
    const patientCollectionRef = collection(db, "patient");

    const [idd, setIdd] = useState("");
    const [Fr, setFr] = useState("");
    const [Ls, setLs] = useState("");
    const [Em, setEm] = useState("");
    const [Ps, setPs] = useState("");



    const getPatient = async () => {
        try {
            const data = await getDocs(patientCollectionRef);
            data.docs.filter((profile) => {
                auth?.currentUser?.uid === profile.data().userId ? setPatient([{ ...profile.data(), id: profile.id }]) : "Error getting patient";
                setIdd(profile.id)
                setFr(profile.data().FirstName)
                setLs(profile.data().LastName)
                setEm(profile.data().Email)
                setPs(profile.data().Password)
            })
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getPatient();
    }, []);



    // set Country & Phone Number

    const [phone, setPhone] = useState("")
    const [country, setCounty] = useState("")
    const [fullPhoneNumber, setFullPhoneNumber] = useState("")
    const fullNmber = phone + fullPhoneNumber

    // st
    const [gender, setGender] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');



    const [age, setAge] = useState(0);

    const calculateAge = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Les mois sont indexés à partir de 0
        let calculatedAge = currentYear - year;

        // Ajuster l'âge si le mois actuel est avant le mois de naissance
        if (currentMonth < month) {
            calculatedAge--;
        }

        setAge(calculatedAge);
    };



    const handleMonth = (event) => {
        setMonth(event.target.value);

    };

    const handleYear = (event) => {
        setYear(event.target.value);

    };


    const handleGender = (event) => {
        setGender(event.target.value);
        calculateAge();
    };




    function num(ch) { //vérifie que la chaine est numérique
        var cha = '0123456789';
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

        if (month === "") {
            if (!month)
                toast.error("Please choose a Month.\n");
            return false;
        }

        else if (year === "") {
            if (!year)
                toast.error("Please choose a Year.\n");
            return false;
        }

        else if (gender === "") {
            if (!gender)
                toast.error("Please choose Your Gender.\n");
            return false;
        }
        else if (country === "") {
            if (!country)
                toast.error("Please choose your Country !");
            return false;
        }
        else if (fullPhoneNumber === "" || !num(fullPhoneNumber)) {
            if (!fullPhoneNumber)
                toast.error("Please enter your Phone Number.\n");
            else if (!num(fullPhoneNumber)) {
                toast.error("Phone Number should only contain numeric characters!");
            }
            return false;
        }
        return true;
    }

    // Set The Notification Collection
    const [notification, setNotification] = useState([]);
    const NotificationCollectionRef = collection(db, `Notification/${auth.currentUser.uid}/Notifications/`);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (test()) {

            const patientDoc = doc(db, `patient/`, idd);

            // Add Patient To The Database
            setDoc(patientDoc, {
                FirstName: Fr,
                LastName: Ls,
                Email: Em,
                Age: age,
                Password: Ps,
                PhoneNum: fullNmber,
                userId: auth?.currentUser?.uid,
                Country: country,
                Gender: gender,
            })
                .then(() => {
                    toast.success("Patient Updated Successfully!");
                }).catch((error) => {
                    toast.error(error.message);
                });

            try {
                const notificationContent = `Welcome to Our Community! Congratulations on joining us ${Fr + ' ' + Ls}! We're thrilled to have you here.
                Explore, connect, and make the most of your experience. If you have any questions, we're here to help.
                Let's get started on this exciting journey together!`
                addDoc(NotificationCollectionRef, {
                    Title: Fr + ' ' + Ls,
                    notificationContent: notificationContent,
                    notificationDateStamp: Timestamp.fromDate(new Date()),
                    notificationIdId: Math.random().toString(36).substr(2, 9),
                    patientId: auth.currentUser.uid,
                });
            } catch (err) {
                alert(err.message);
            }

            // Navigate to Verification Page 
            navigate("/Verification")
        }

    }




    return (


        <div className=' w-8/12 m-auto  grid grid-cols-1 max-md:w-full max-md:h-full max-lg:w-11/12 xl:h-screen   shadow-xl h-full   p-5'>
            <h1 className=' font-bold my-6  text-purple-700'>Fill Out The Form</h1>
                <div className='w-full h-auto  grid grid-cols-2 max-md:grid-cols-1 text-center'>

                    <Box
                        component="form"
                        sx={{ m: 1, width: 300, height: 100 }}
                        noValidate
                        autoComplete="off"
                    >



                        <TextField
                            disabled="true"
                            id="outlined-read-only-input"
                            label="Full Name"
                            value={Fr + " " + Ls}
                        />

                    </Box>


                    <Box
                        component="form"
                        sx={{ m: 1, width: 300, height: 100 }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            disabled="true"
                            id="outlined-read-only-input"
                            label="Email"
                            value={Em}
                        />
                    </Box>
                </div>



            <h1 className=' font-bold my-6  text-purple-700'>BirthDay and Gender:</h1>
            <div className='w-full m-auto grid grid-cols-3 max-md:grid-cols-1 place-items-center '>
                <Box sx={{ m: 1, width: 180, height: 100 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={month}
                            label="Month"
                            onChange={handleMonth}
                        >
                            <MenuItem value={"January"}>January</MenuItem>
                            <MenuItem value={"February"}>February</MenuItem>
                            <MenuItem value={"March"}>March</MenuItem>
                            <MenuItem value={"April"}>April</MenuItem>
                            <MenuItem value={"May"}>May</MenuItem>
                            <MenuItem value={"June"}>June</MenuItem>
                            <MenuItem value={"July"}>July</MenuItem>
                            <MenuItem value={"August"}>August</MenuItem>
                            <MenuItem value={"September"}>September</MenuItem>
                            <MenuItem value={"October "}>October </MenuItem>
                            <MenuItem value={"November"}>November</MenuItem>
                            <MenuItem value={"December"}>December</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ m: 1, width: 180, height: 100 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Year</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={year}
                            label="Year"
                            onChange={handleYear}
                        >
                            <MenuItem value={1980}>1980</MenuItem>
                            <MenuItem value={1981}>1981</MenuItem>
                            <MenuItem value={1982}>1982</MenuItem>
                            <MenuItem value={1983}>1983</MenuItem>
                            <MenuItem value={1984}>1984</MenuItem>
                            <MenuItem value={1985}>1985</MenuItem>
                            <MenuItem value={1986}>1986</MenuItem>
                            <MenuItem value={1987}>1987</MenuItem>
                            <MenuItem value={1988}>1988</MenuItem>
                            <MenuItem value={1989}>1989</MenuItem>
                            <MenuItem value={1990}>1990</MenuItem>
                            <MenuItem value={1991}>1991</MenuItem>
                            <MenuItem value={1992}>1992</MenuItem>
                            <MenuItem value={1993}>1993</MenuItem>
                            <MenuItem value={1994}>1994</MenuItem>
                            <MenuItem value={1995}>1995</MenuItem>
                            <MenuItem value={1996}>1996</MenuItem>
                            <MenuItem value={1997}>1997</MenuItem>
                            <MenuItem value={1998}>1998</MenuItem>
                            <MenuItem value={1999}>1999</MenuItem>
                            <MenuItem value={2000}>2000</MenuItem>
                            <MenuItem value={2001}>2001</MenuItem>
                            <MenuItem value={2002}>2002</MenuItem>
                            <MenuItem value={2003}>2003</MenuItem>
                            <MenuItem value={2004}>2004</MenuItem>
                            <MenuItem value={2005}>2005</MenuItem>
                            <MenuItem value={2006}>2006</MenuItem>
                            <MenuItem value={2007}>2007</MenuItem>
                            <MenuItem value={2008}>2008</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ m: 1, width: 180, height: 100 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Gender"
                            onChange={handleGender}
                        >
                            <MenuItem value={"Man"}>Man</MenuItem>
                            <MenuItem value={"woman"}>woman</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>


            <h1 className=' font-bold my-6  text-purple-700'>Phone Number and Country :</h1>
            <div className='w-full m-auto grid grid-cols-2 max-md:grid-cols-1 place-items-center '>
                <Autocomplete
                    id="country-select-demo"
                    sx={{ width: 250, height: 100 }}
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label + ` (+${option.phone})`}
                    onChange={(event, newValue) => {
                        setPhone('+' + newValue.phone)
                        setCounty(newValue.label)
                    }}

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

                <Box
                    component="form"
                    sx={{ m: 1, width: 250, height: 100 }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="fullPhoneNumber" label="Phone Number" variant="outlined" onChange={(e) => setFullPhoneNumber(e.target.value)} />

                </Box>
            </div>
            <div className=' m-auto w-11/12 flex justify-end'>
                <button className='bg-purple-800 px-8 py-2.5 text-white font-semibold rounded-lg shadow-lg' variant="contained" onClick={handleSubmit}>
                    Continue
                </button>
            </div>
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
        </div>

    );
}









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
