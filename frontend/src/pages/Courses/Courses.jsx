import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/admin/get-course`, {
          withCredentials: true, 
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className='ml-7'>Loading courses...</p>;

  return (
    <>
      <h1 className='ml-7'>My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="max-w-xs overflow-hidden rounded-lg border border-slate-200 bg-white p-4"
          >
            <Link to={`/courses/view/${course.code}`} className="text-lg font-bold text-blue-450">
              {course.title}
            </Link>
            <p className="text-sm text-gray-600">{course.description}</p>
            <div className="flex justify-between text-sm text-gray-800">
              <span><span className="font-bold">Code:</span> {course.code}</span>
              <span><span className="font-bold">Credits:</span> {course.credits}</span>
            </div>
            <p className="text-sm my-1 text-gray-800">
              <span className="font-bold">Faculties:</span> {course.faculties.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;
