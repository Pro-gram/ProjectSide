import React, { useRef } from "react";
import {
  motion,
  useScroll,
} from "framer-motion";
import LiIcon from "./LiIcon";


const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}{" "}
          <a
            className="capitalize text-primary dark:text-primaryDark"
            href={companyLink}
            target={"_blank"}
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize text-dark/75 font-medium dark:text-light/50 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm"> {work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (

      <div className="my-64">
        <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
          The Team
        </h2>

        <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
          <motion.div
            className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-dark 
            origin-top  dark:bg-primaryDark dark:shadow-3xl"
            style={{ scaleY: scrollYProgress }}
          />
          <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
            <Details
              position="The CEO"
              company="Ideas Imprint Incorporated"
              companyLink="https://google.com"
              time="2019-Present"
              address="North Vancouver, British Columbia"
              work="A Visionary for better displaying the world wide web through a different lens. Ideas Imprint Incorporated was founded as an umbrella company, to whom of which, the owner, sees 3DSlides as the pinnacle of it's next success."
            />

            <Details
              position="Consultant / Software Engineer"
              company="Facebook"
              companyLink="https://facebook.com"
              time="2020-2024"
              address="Menlo Park, CA."
              work="Worked as a Level 2 Software Engineer for Facebook for multiple years and is currently persuing his own dream. We consult with this engineer, as we have been friends since 5 years old. Truly a good life long friend, with expert advise."
            />

            <Details
              position="Top Level Photographer"
              company="Vancouver Film School"
              companyLink=""
              time="2020-2021"
              address="Seattle, WA."
              work="Worked on a team responsible for developing Amazon's mobile app, including implementing new features such as product recommendations and user reviews, and optimizing the app's performance and reliability."
            />

            <Details
              position="Software Developer Intern"
              company="Microsoft"
              companyLink="https://microsoft.com"
              time="Summer 2019"
              address="Redmond, WA."
              work="Worked on a team responsible for developing new features for
              Microsoft's Windows operating system, including implementing a new
              user interface for a system settings panel and optimizing the
              performance of a core system component."
            />

            <Details
              position="Teaching Assistant"
              company="MIT"
              companyLink="https://mit.edu"
              time="Fall 2018"
              address="Massachusetts Ave, Cambridge, MA."
              work="Assisted in teaching a course on computer programming, held office
              hours to help students with assignments, and graded exams and
              assignments."
            />
          </ul>
        </div>
        </div>
    );
};

export default Experience;
