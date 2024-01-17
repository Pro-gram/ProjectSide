// index.js

import React, { useState } from "react";
import AnimatedText from "@/components/AnimatedText";
import { HireMe } from "@/components/HireMe";
import { LinkArrow } from "@/components/Icons";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import profilePic from "../../public/images/profile/developer-pic-1.png";
import TransitionEffect from "@/components/TransitionEffect";
import Calendar from "../components/Calendar/Calendar";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>3DSlides</title>
        <meta
          name="description"
          content="Explore 3DSlides, a multi-media company taking photography to the next step, while helping you grow your business."
        />
      </Head>

      <TransitionEffect />
      <article className={`flex min-h-screen items-center text-dark dark:text-light sm:items-start`}>
        <Layout className="!pt-0 md:!pt-16 sm:!pt-16">
          <div className="flex w-full items-start justify-between md:flex-col">
            <div className="w-1/2 lg:hidden md:inline-block md:w-full">
              <Image src={profilePic} alt="CodeBucks" className="h-auto w-full" sizes="100vw" priority />
            </div>
            <div className="flex w-1/2 flex-col items-center self-center lg:w-full lg:text-center">
              <AnimatedText
                text="Turning vision into reality with Photography, Code and Design."
                className="pt-2 !text-left !text-6xl xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"
              />
              <p className="my-4 text-base font-medium md:text-sm sm:!text-xs">
                A professional team dedicated to making things look excellent. We are a diverse team, from computer programmers to Vancouver Film School graduates. Our goal is to bring visions to life and help companies achieve new sales goals through our multi-media network.
              </p>
              <div className="mt-2 flex items-center self-start lg:self-center">
                <button
                  className={`flex items-center rounded-lg border-2 border-solid bg-dark p-2.5 px-6 text-lg font-semibold
    capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark 
    dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
    md:p-2 md:px-4 md:text-base
  `}
                  onClick={handleBookNowClick}
                >
                  Book 3D Now <LinkArrow className="ml-1 !w-6 md:!w-4" />
                </button>

                <Link
                  href="mailto:codebucks27@gmail.com"
                  className="ml-4 text-lg font-medium capitalize text-dark underline 
                  dark:text-light md:text-base"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </Layout>

        <HireMe />
        <div className="absolute right-8 bottom-8 inline-block w-24 md:hidden">
          TEST
        </div>

        <Transition show={isModalOpen} as={React.Fragment}>
          <Dialog onClose={handleCloseModal}>
            <div className="fixed inset-0 z-10 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded shadow-md">
                {/* Pass the onClose prop to the Calendar component */}
                <Calendar onClose={handleCloseModal} />
              </div>
            </div>
          </Dialog>
        </Transition>
      </article>
    </>
  );
}
