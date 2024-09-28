import React from 'react'


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import GradualSpacing from "@/Components/magicui/gradual-spacing";




const Questions = () => {
    


    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded)

    }

    return (
        <>
            <div className='p-4 '  >
                <GradualSpacing   
                    className="font-display  text-center xxs:text-md xxs:text-md md:text-5xl lg:text-7xl font-bold tracking-[-0.1em]  text-black dark:text-slate-200  md:leading-[5rem]"
                    text="Frequently Asked Questions"
                />
            </div>
            <div className=' w-10/12 m-auto  space-y-6  xxs:p-2 xs:p-4 sm:p-6 md:p-10 lg:p-20'>
                <Accordion
                    className='bg-black'
                    expanded={expanded}
                    onChange={handleExpansion}
                    slots={{ transition: Fade }}
                    slotProps={{ transition: { timeout: 400 } }}
                    sx={{
                        '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                        '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                        background: "rgba(70,20,100)", color: "rgba(255,255,255)", boxShadow: "rgba(255,255,0)", borderRadius: "18px"
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='text-white' />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography><h1 className='font-semibold p-2 text'>What is this application and how does it work ? </h1></Typography>
                    </AccordionSummary>
                    <AccordionDetails className=' bg-purple-900 '>
                        <Typography className='  p-6 '>
                            This application uses artificial intelligence algorithms to analyze the brain symptoms you enter and provide a preliminary diagnosis. It also offers advice and recommendations for further actions.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={{

                        background: "rgba(0,0,60)", shadow: "rgba(255,255,255)", color: "rgba(255,255,255)", BorderRadius: "15px"
                    }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='text-white' />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography> <h1 className='font-semibold p-2'>Is the diagnosis provided by the application accurate ?</h1></Typography>
                    </AccordionSummary>
                    <AccordionDetails className=' bg-blue-950 ' >
                        <Typography className=' p-6 '>
                            The diagnosis provided by the application is based on AI algorithms and is intended to offer preliminary insights. It should not replace professional brain medical advice. Always consult a healthcare brain provider for an accurate diagnosis and treatment plan.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={{

                        background: "rgba(70,20,100)", shadow: "rgba(255,255,255)", color: "rgba(255,255,255)", BorderRadius: "15px", lightingColor: "rgba(255,0,255"
                    }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='text-white' />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography><h1 className='font-semibold p-2'>How do I enter my symptoms and get a diagnosis ?</h1> </Typography>
                    </AccordionSummary>
                    <AccordionDetails className=' bg-purple-900 '>
                        <Typography className='  p-6 '>
                            You can enter your information by filling out a form with your personal details and  you also have the option to upload images if relevant. Once submitted, the AI algorithms will analyze the data and provide a preliminary diagnosis and recommendations.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={{

                        background: "rgba(0,0,60)", shadow: "rgba(255,255,255)", color: "rgba(255,255,255)", BorderRadius: "15px"
                    }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='text-white' />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography><h1 className='font-semibold p-2 text'>Is this app designed to be used only once? ?</h1></Typography>
                    </AccordionSummary>
                    <AccordionDetails className=' bg-blue-950 '>
                        <Typography className='  p-6 '>
                        The app is not designed to be used only once; instead, it is intended for repeated use. Its features and functionalities are structured to provide ongoing value, encouraging users to return regularly. Whether it's for tracking progress, accessing updated content, or utilizing services that require frequent interaction, the app is built to sustain user engagement over time.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={{

                        background: "rgba(70,20,100)", shadow: "rgba(255,255,255)", color: "rgba(255,255,255)", BorderRadius: "15px"
                    }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='text-white' />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography> <h1 className='font-semibold p-2 text'>Is my personal information safe and secure ?</h1> </Typography>
                    </AccordionSummary>
                    <AccordionDetails className=' bg-purple-800 '>

                        <Typography className='  p-6 '>
                            Yes, we prioritize the security and privacy of your personal information. All data is encrypted and stored securely. We comply with relevant data protection regulations to ensure your information is safe.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={{

                        background: "rgba(0,0,60)", shadow: "rgba(255,255,255)", color: "rgba(255,255,255)", BorderRadius: "15px"
                    }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='text-white' />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography> <h1 className='font-semibold p-2 text'>Can I use this application for any kind of symptoms ?</h1></Typography>
                    </AccordionSummary>
                    <AccordionDetails className=' bg-blue-950 '>
                        <Typography className='  p-6 '>
                        The application is designed to handle a wide range of common brain symptoms. However, it may not cover all possible brain medical conditions. If you have severe or unusual brain symptoms, it is important to seek immediate medical attention from a healthcare professional.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    )
}

export default Questions 
