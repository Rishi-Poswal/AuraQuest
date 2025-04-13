import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseView = () => {
  const { code } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/admin/get-course-by-code/${code}`, {
          withCredentials: true,
        });
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to fetch course", err);
      }
    };

    fetchCourse();
  }, [code]);

  if (!course) return <div className="p-6 text-center text-lg">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{course.title}</h1>
        <p className="text-sm text-gray-600 mb-4">{course.description}</p>

        <div className="flex justify-between text-sm font-medium text-gray-800 mb-2">
          <span><strong>Code:</strong> {course.code}</span>
          <span><strong>Credits:</strong> {course.credits}</span>
        </div>

        <p className="text-sm text-gray-700"><strong>Faculties:</strong> {course.faculties.join(', ')}</p>
      </div>

      {/* Announcements Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">📢 Announcements</h2>
        {course.Announcements.length === 0 ? (
          <p className="text-gray-500">No announcements yet.</p>
        ) : (
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {course.Announcements.map((a, idx) => (
              <div key={idx} className="border p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-800">{a.title}</h3>
                <p className="text-gray-700 mb-2">{a.message}</p>
                <p className="text-xs text-gray-500">By {a.postedBy?.username || "Unknown"} on {new Date(a.postedAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assignments Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">📝 Assignments</h2>
        {course.assignments.length === 0 ? (
          <p className="text-gray-500">No assignments posted yet.</p>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {course.assignments.map((assgn, idx) => (
              <div key={idx} className="border p-4 rounded-lg shadow-sm">
                <p className="text-lg font-semibold text-gray-800">{assgn.title}</p>
                <p className="text-sm text-gray-700">Due Date: <span className="font-medium">{new Date(assgn.dueDate).toLocaleDateString()}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseView;
