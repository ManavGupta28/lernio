import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { removeUserData } from "../Redux/slices/user-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [location]);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
  };

  return (
    <header className="flex h-[80px] items-center justify-center bg-[#2f8fde] shadow-md">
      <div className="mx-5 flex w-full max-w-[1550px] items-center justify-between">
        {/* Logo Placeholder */}
        <div className="flex h-[60px] w-[120px] items-center justify-center">
          <Link to="/">
            <h1 className="text-white text-2xl font-bold">LEARNIO</h1>
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <GiHamburgerMenu
          className="cursor-pointer text-2xl text-white md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />

        {/* Desktop Navigation */}
        <nav className="hidden text-white md:flex md:items-center md:gap-4">
          <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
          <Link to="/about" className="hover:text-gray-300 transition duration-200">About</Link>
          {isAuthenticated ? (
            <>
              <Link to="/search" title="Search">
                <FaSearch className="text-xl hover:text-gray-300 transition duration-200" />
              </Link>
              <Link to="/upload" title="Upload">
                <MdOutlineFileUpload className="text-2xl hover:text-gray-300 transition duration-200" />
              </Link>
              <Link to="/profile">
                <button className="rounded-xl bg-[#4A4947] px-5 py-2 text-[#FFF0D1] hover:bg-[#B17457] transition duration-200">
                  Profile
                </button>
              </Link>
              <button
                className="rounded-xl bg-[#4A4947] px-5 py-2 text-[#FFF0D1] hover:bg-[#B17457] transition duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-xl bg-white px-5 py-2 text-black hover:bg-[#B17457] transition duration-200">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-xl bg-white px-5 py-2 text-black hover:bg-[#B17457] transition duration-200">
                  Signup
                </button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute left-0 top-[80px] w-full flex flex-col items-center gap-4 bg-black bg-opacity-90 py-4 text-white md:hidden z-50">
            <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
            <Link to="/about" className="hover:text-gray-300 transition duration-200">About</Link>
            {isAuthenticated ? (
              <>
                <Link to="/search" title="Search">
                  <FaSearch className="text-xl hover:text-gray-300 transition duration-200" />
                </Link>
                <Link to="/upload" title="Upload">
                  <MdOutlineFileUpload className="text-2xl hover:text-gray-300 transition duration-200" />
                </Link>
                <Link to="/profile">
                  <button className="rounded-xl bg-[#4A4947] px-5 py-2 text-[#FFF0D1] hover:bg-[#B17457] transition duration-200">
                    Profile
                  </button>
                </Link>
                <button
                  className="rounded-xl bg-[#4A4947] px-5 py-2 text-[#FFF0D1] hover:bg-[#B17457] transition duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="rounded-xl bg-white px-5 py-2 text-black hover:bg-[#B17457] transition duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-xl bg-white px-5 py-2 text-black hover:bg-[#B17457] transition duration-200">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
