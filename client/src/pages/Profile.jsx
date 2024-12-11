import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.user.userData);

  const [userFiles, setUserFiles] = useState([]);
  const [userCourses, setUserCourses] = useState([]);

  const userId = user._id;

  // Fetch files and courses uploaded by the user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const filesResponse = await axios.get(`http://localhost:6969/notes/getFiles/${userId}`);
        const coursesResponse = await axios.get(`http://localhost:6969/courses/getCourses/${userId}`);

        setUserFiles(filesResponse.data.data || []);
        setUserCourses(coursesResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="lg:h-heightWithoutNavbar flex flex-col items-center justify-center lg:flex-row">
      {/* User Information Section */}
      <div className="flex w-full flex-col items-center justify-center bg-gray-100 py-4 lg:h-full lg:w-[40%]">
        <div className="text-center">
          <h2 className="text-2xl font-black">
            {user.firstName} {user.lastName}
          </h2>
          <p className="mt-1 text-gray-600">{user.userName}</p>
          <p className="mt-1 text-gray-600">{user.userBio}</p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-5">
          <div className="grid h-[80px] w-[100px] place-content-center">
            <p className="text-center text-sm font-bold">No. of Files:</p>
            <p className="text-center text-4xl font-black">{userFiles.length}</p>
          </div>
          <span className="h-[60px] w-[1px] bg-gray-400" />
          <div className="grid h-[80px] w-[100px] place-content-center">
            <p className="text-center text-sm font-bold">No. of Courses:</p>
            <p className="text-center text-4xl font-black">{userCourses.length}</p>
          </div>
        </div>
      </div>

      {/* Uploaded Files and Courses Section */}
      <div className="h-auto w-full bg-gray-50 p-5 lg:h-full lg:w-[60%]">
        {/* Files Section */}
        <h1 className="mb-3 text-xl font-black">My Files:</h1>
        {userFiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {userFiles.map((file) => (
              <a
                href={`http://localhost:6969/files/${file.files}`}
                key={file._id}
                className="flex h-[35px] items-center justify-between gap-10 rounded-xl border border-black px-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="font-semibold">{file.fileName}</p>
                <FaExternalLinkAlt />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No files uploaded yet.</p>
        )}

        {/* Courses Section */}
        <h1 className="mt-8 mb-3 text-xl font-black">My Courses:</h1>
        {userCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {userCourses.map((course) => (
              <a
                href={`/courses/${course._id}`}
                key={course._id}
                className="flex flex-col items-start justify-between gap-2 rounded-xl border border-black p-4 hover:bg-gray-100"
              >
                <h2 className="font-semibold text-lg">{course.title}</h2>
                <p className="text-sm text-gray-600">{course.description}</p>
                <FaExternalLinkAlt className="self-end text-blue-500" />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No courses uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
    