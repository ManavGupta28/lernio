import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
    // const [profilePreviewImage, setProfilePreviewImage] = useState("");
    // const [profileImage, setProfileImage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userMobile, setUserMobile] = useState("");
    const [userBio, setUserBio] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !userEmail || !userMobile || !userName || !userPassword) {
            toast.error("All fields are required!");
            return;
        }

        if (userMobile.length !== 10) {
            toast.error("Mobile number must be exactly 10 digits.");
            <ToastContainer />;
            return;
        }

        const passwordRegex =
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!passwordRegex.test(userPassword)) {
            toast.error(
                "Password must be at least 8 characters long and include at least one letter, one number, and one special character.",
            );
            return;
        }


        const userData = {
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword
        };

        setIsSubmitting(true);

        try {
            const result = await axios.post(
                "http://localhost:6969/auth/signup",
                userData,
                {
                    headers: { "Content-Type": "application/json" },
                },
            );
            console.log("Data: ", result);

            alert("User Entry Saved in Database. You may login now.");

            setFirstName("");
            setLastName("");
            setUserBio("");
            setUserEmail("");
            setUserMobile("");
            setUserName("");
            setUserPassword("");
            // setProfileImage("");
            // setProfilePreviewImage("");




        } catch (error) {
            console.log("Failed to Register User: ", error);
            setFirstName("");
            setLastName("");
            setUserBio("");
            setUserEmail("");
            setUserMobile("");
            setUserName("");
            setUserPassword("");
            // setProfileImage("");
            // setProfilePreviewImage("");
            if (error.response && error.response.status === 409) {
                toast.error("User already exists. Kindly login.");
            } else if (error.response) {
                toast.error(error.response.data || "An unexpected error occurred.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }

        navigate("/login");
    };

    return (
        <div className="flex h-heightWithoutNavbar w-full items-center justify-center p-4">
            <form
                className="h-100vh flex max-h-full w-full max-w-[700px] flex-col justify-around rounded-xl bg-white p-4 shadow-xl"
                onSubmit={registerUser}
            >
                <h1 className="mb-2 w-full text-center text-xl font-black">Register</h1>
                {errorMessage && (
                    <p className="mb-2 text-center font-bold text-red-500">
                        {errorMessage}
                    </p>
                )}
                <div className="flex w-full justify-between gap-2">
                    <div className="flex w-full max-w-[300px] flex-col items-start justify-center">
                        <label className="font-bold" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
                            placeholder="John"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="flex w-full max-w-[300px] flex-col items-start justify-center">
                        <label className="font-bold" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
                            placeholder="Doe"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex w-full justify-between gap-2">
                    <div className="flex w-full max-w-[300px] flex-col items-start justify-center">
                        <label className="font-bold" htmlFor="userEmail">
                            Email
                        </label>
                        <input
                            type="email"
                            id="userEmail"
                            className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
                            placeholder="your.email@example.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex w-full max-w-[300px] flex-col items-start justify-center">
                        <label className="font-bold" htmlFor="userMobile">
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            id="userMobile"
                            className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
                            placeholder="0000000000"
                            onChange={(e) => setUserMobile(e.target.value)}
                            value={userMobile}
                            maxLength={10}
                            minLength={10}
                        />
                    </div>
                </div>

                <div className="flex w-full justify-between gap-2">
                    <div className="flex w-full max-w-[300px] flex-col">
                        <label className="font-bold" htmlFor="userName">
                            Username
                        </label>
                        <input
                            type="text"
                            id="userName"
                            className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
                            placeholder="johndoe123"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div className="flex w-full max-w-[300px] flex-col">
                        <label className="font-bold" htmlFor="userPassword">
                            Password
                        </label>
                        <input
                            type="password"
                            id="userPassword"
                            className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
                            placeholder="*********"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex w-full flex-col justify-between">
                    <label className="font-bold" htmlFor="userBio">
                        Bio
                    </label>
                    <textarea
                        id="userBio"
                        rows="3"
                        value={userBio}
                        className="h-20 w-full rounded-lg border p-2  focus:outline-none"
                        placeholder="Tell us about yourself"
                        onChange={(e) => setUserBio(e.target.value)}
                    ></textarea>
                </div>

                {/* <div className="flex w-full items-center justify-around gap-2">
          <div className="mb-2 flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border border-dashed border-gray-300">
            {profilePreviewImage === "" ? (
              <p className="text-center text-sm text-gray-500">Profile</p>
            ) : (
              <img
                src={profilePreviewImage}
                alt="Preview"
                className={`h - full w - full object - cover ${ !profilePreviewImage && "hidden" } `} />
            )}
          </div>

          <label
            htmlFor="dropzone-file"
            className="h-22 flex w-80 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pb-4 pt-4">
              <svg
                className="ext-center mb-2 h-6 w-6 text-gray-500"
                aria-hidden="true"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-center text-xs text-gray-500">
                Upload Image
              </p>
              <input
                type="file"
                id="dropzone-file"
                className="hidden"
                onChange={(e) => {
                  // setProfilePreviewImage(
                  //   URL.createObjectURL(e.target.files[0]),
                  // );
                  // setProfileImage(e.target.files[0]);
                }}
              />
            </div>
          </label>
        </div> */}

                <button
                    className="mt-4 w-full rounded-lg bg-[#278adb] px-4 py-2 text-white hover:bg-[#B17457]"
                    type="submit"
                    disabled={isSubmitting}
                >
                    <span
                        className={isSubmitting ? "text-lg font-semibold animate-pulse" : "text-lg font-semibold"}
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </span>
                </button>

                <div className="mt-2 w-full text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="font-bold hover:underline">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;