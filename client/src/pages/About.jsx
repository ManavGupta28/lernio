import React from "react";

const About = () => {
  return (
    <div className="h-heightWithoutNavbar flex flex-col items-center justify-start p-5 lg:flex-row lg:gap-10">
      {/* Image Section */}
      <div className="grid h-full w-full place-content-center">
        <img
          src="./aboutus.jpg"
          alt="About Us"
          className="w-[300px] sm:w-[400px] md:w-[450px] lg:w-[600px]"
        />
      </div>

      {/* Text Content Section */}
      <div className="flex h-full w-full flex-col items-start justify-center space-y-8">
        {/* About Us Section */}
        <div>
          <h1 className="relative w-fit text-2xl font-bold text-[#1e40af] before:absolute before:top-full before:h-[3px] before:w-[60%] before:bg-[#2563eb] lg:text-4xl">
            About Us
          </h1>
          <p className="mt-3 text-sm text-gray-700 lg:text-base">
            Welcome to **Learnio**, the ultimate hub for people to seamlessly share and access educational resources. Our platform is designed with a singular purpose – to make the exchange of study materials as effortless as possible, fostering a collaborative and enriching academic experience for students across colleges.
          </p>
        </div>

        {/* Who We Are Section */}
        <div>
          <h1 className="relative w-fit text-2xl font-bold text-[#1e40af] before:absolute before:top-full before:h-[3px] before:w-[60%] before:bg-[#2563eb] lg:text-4xl">
            Who We Are
          </h1>
          <p className="mt-3 text-sm text-gray-700 lg:text-base">
            Learnio is more than just a website; it's a community-driven initiative fueled by the passion for learning. Founded by a group of dedicated students, our platform is a testament to the belief that education should be a collective journey. Our team comprises tech enthusiasts, educators, and creative minds, all united in the mission to enhance the learning landscape.
          </p>
        </div>

        {/* Our Mission Section */}
        <div>
          <h1 className="relative w-fit text-2xl font-bold text-[#1e40af] before:absolute before:top-full before:h-[3px] before:w-[60%] before:bg-[#2563eb] lg:text-4xl">
            Our Mission
          </h1>
          <p className="mt-3 text-sm text-gray-700 lg:text-base">
            At **Learnio**, our mission is clear: to empower people by providing a centralized platform where knowledge knows no boundaries. We aim to break down the barriers to academic success, making valuable study materials accessible to all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
