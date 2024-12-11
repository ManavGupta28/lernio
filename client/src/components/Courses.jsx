import React from "react";
import { Link } from "react-router-dom";

const courses = [
  { id: 1, title: "Web Development", description: "Learn the MERN stack from scratch." },
  { id: 2, title: "Data Structures", description: "Master data structures in Java." },
  { id: 3, title: "Machine Learning", description: "Get started with AI and ML concepts." },
  { id: 4, title: "Cloud Computing", description: "Explore cloud technologies with hands-on labs." },
];

const Courses = () => {
  return (
    <section className="py-10 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-5">Our Courses</h2>
      <p className="text-gray-600 mb-10">
        Explore a wide range of courses tailored for your learning journey.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold text-[#2563eb]">{course.title}</h3>
            <p className="text-gray-600 my-3">{course.description}</p>
            <Link
              to={`/courses/${course.id}`}
              className="inline-block bg-[#2563eb] text-white px-5 py-2 rounded-lg hover:bg-[#1e40af]"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
