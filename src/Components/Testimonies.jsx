import React from 'react'
import img1 from "../assets/SW.png"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/father.png"
import img4 from "../assets/Image3.jpg"
import img5 from "../assets/OIP1.jpeg"
import img6 from "../assets/OIP2.jpeg"
import { cn } from "@/lib/utils";
import Marquee from "@/Components/magicui/marquee";
import TextReveal from "@/Components/magicui/text-reveal";



const Testimonies = () => {

    const reviews = [
        {
            name: "Maria Santos",
            username: "@Maria Santos",
            body: "Using this web application has been a game-changer for my health. The AI quickly analyzes my symptoms and provides accurate advice. It has helped me understand when to seek professional medical help and when to rest at home. Highly recommend!",
            img: img1,
        },
        {
            name: "Willson Smith",
            username: "@Willson Smith",
            body: "This app has been an essential tool for managing my family's health. The AI's ability to provide preliminary diagnoses and actionable advice has saved us countless trips to the doctor. It's user-friendly and highly accurate.",
            img: img2,
        },
        {
            name: "David samanta",
            username: "@David samanta",
            body: "As a busy professional, I don't always have time to visit the doctor for minor issues. This app has been invaluable in providing me with quick and reliable health advice based on my symptoms. It's like having a healthcare assistant in my pocket",
            img: img3,
        },
        {
            name: "Sarah Jacob",
            username: "@Sarah Jacob",
            body: "I was initially skeptical about an AI-based diagnosis app, but this tool has exceeded my expectations. The recommendations are spot-on, and it's like having a mini-doctor available 24/7. It's especially helpful for late-night health concerns.",
            img: img4,
        },
        {
            name: "Jenny",
            username: "@jenny",
            body: "I'm at a loss for words. This is amazing. I love it. I cant think of how it easily makes me check on myself in just a few minutes.",
            img: img5,
        },
        {
            name: "James",
            username: "@james",
            body: "This app is really amazing. I love it.This app helps me a lot about knowing my brain health and cheking on myself whenever i want to.",
            img: img6,
        },
    ];

    const firstRow = reviews.slice(0, reviews.length / 2);
    const secondRow = reviews.slice(reviews.length / 2);

    const ReviewCard = ({
        img,
        name,
        username,
        body,
    }) => {
        return (
            <figure
                className={cn(
                    "relative w-96 h-48 cursor-pointer overflow-hidden rounded-xl border p-4",
                    // light styles
                    "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                    // dark styles
                    "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                )}
            >
                <div className="flex flex-row  items-center gap-2">
                    <img className="rounded-full" width="32" height="32" alt="" src={img} />
                    <div className="flex flex-col">
                        <figcaption className="text-sm font-medium dark:text-white">
                            {name}
                        </figcaption>
                        <p className="text-xs font-medium dark:text-white/40">{username}</p>
                    </div>
                </div>
                <blockquote className="mt-2 text-sm dark:text-white">{body}</blockquote>
            </figure>
        );
    };


    return (
        <>
            <div className="w-11/12 text-xl m-auto ">
                <TextReveal text="What  Our  Clients  Says  About  Us !" />
            </div>
            <div className="relative flex h-[480px] lx:mt-12 border-y  border-black dark:border-white  w-full  m-auto flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-black"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-black"></div>
            </div>
            </>
    )
}

export default Testimonies
