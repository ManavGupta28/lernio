import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2f8fde] text-white py-6">
      <div className="container mx-auto flex flex-col items-center gap-8 px-4 lg:flex-row lg:justify-between lg:gap-0">
        {/* Official Mail Section */}
        <div className="text-center lg:text-left">
          <h2 className="relative mb-3 text-xl font-semibold">
            Official Mail ID
            <span className="absolute left-0 top-full mt-1 block h-[3px] w-[50px] bg-white" />
          </h2>
          <p className="text-base">learnio2024@gmail.com</p>
        </div>

        {/* Contact Info Section */}
        <div className="text-center lg:text-left">
          <h2 className="relative mb-3 text-xl font-semibold">
            Contact Info
            <span className="absolute left-0 top-full mt-1 block h-[3px] w-[50px] bg-white" />
          </h2>
          <ul>
            <li className="mb-2">
              <a href="tel:+919999999999" className="hover:underline">
                +91 99999 99999
              </a>
            </li>
            <li className="mb-2">
              <a href="tel:+919999999998" className="hover:underline">
                +91 99999 99998
              </a>
            </li>
            <li className="mb-2">
              <a href="tel:+919999999997" className="hover:underline">
                +91 99999 99997
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
