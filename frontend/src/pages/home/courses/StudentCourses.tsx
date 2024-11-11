import { useEffect, useState } from "react";
import NoCoursesFound from "../../../../src/assets/NoCoursesFound.svg";

interface Course {
  courseid: string;
  coursecode: string;
  coursename: string;
  coursedescription: string;
  coursecredits: number;
  teacher: string; // Updated to match your data
}

export default function StudentCourses() {
  const [courses, setCourses] = useState<Course[]>([]); // Initialize with an empty array

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Directly set the courses from the data received
        if (Array.isArray(data)) {
          setCourses(data); // Set courses directly as it's an array
        } else {
          setCourses([]); // Reset to empty array if not valid
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]); // Reset to empty array on error
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      {courses.length === 0 ? (
        <div className="mx-auto">
          <p>{courses.length}</p>
          <img
            src={NoCoursesFound}
            className="mx-auto size-36"
            alt="No courses found"
          />
          <p className="text-2xl text-center font-semibold text-white">
            You have no courses...
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-10 items-start ">
          {courses.map((course) => (
            <div className="" key={course.courseid}>
              <a
                href={`/courses/${course.courseid}`}
                className="block w-[200px] min-h-[150px] rounded-lg border-gray-200 bg-white p-6 shadow hover:bg-zinc-100 dark:border-gray-700
                duration-300 transform outline-none hover:scale-105 hover:shadow-lg
                "
              >
                <div className="class-card-header">
                  <span className="icon">📚</span>
                  <div className="header-decoration">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div>
                  <h5 className="mb-2 text-1xl font-bold tracking-tight text-black">
                    {course.coursecode}
                  </h5>
                  <p className="font-normal text-xs text-gray-700 dark:text-gray-400">
                    {course.coursename}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
