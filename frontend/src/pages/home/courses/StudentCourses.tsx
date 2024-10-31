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

        // Log the fetched data for debugging
        console.log("Fetched data:", data);

        // Directly set the courses from the data received
        if (Array.isArray(data)) {
          console.log("Courses array:", data); // Log the courses array
          setCourses(data); // Set courses directly as it's an array
        } else {
          console.warn("Fetched data is not an array:", data);
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
        <div className="flex flex-wrap gap-10 items-start">
          {courses.map((course) => (
            <div className="min-h-[100px]" key={course.courseid}>
              <a
                href={`/courses/${course.courseid}`}
                className="block w-[200px] min-h-28 rounded-lg border-gray-200 bg-white p-6 shadow hover:bg-zinc-100 dark:border-gray-700"
              >
                <h5 className="mb-2 text-1xl font-bold tracking-tight text-black">
                  {course.coursecode}
                </h5>
                <p className="font-normal text-xs text-gray-700 dark:text-gray-400">
                  {course.coursename}
                </p>
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}