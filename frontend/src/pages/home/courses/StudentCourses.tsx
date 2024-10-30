import { useEffect, useState } from "react";

// const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Course {
  courseid: string;
  coursecode: string;
  coursename: string;
  coursedescription: string;
  coursecredits: number;
  courseteacher: string;
}

export default function StudentCourses() {
  const [courses, setCourses] = useState<Course[]>([]); // Initialize with an empty array

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://localhost:5173/api/courses");
      const courses = (await response.json()) as Course[];
      setCourses(courses);
    };
    fetchCourses();
  }, []);

  // Render the courses
  return (
    <>
      <div className="flex flex-wrap gap-10 items-start">
        {courses.map((course) => {
          return (
            <div className="min-h-[100px]">
              <a
                href={"/courses/"+ course.courseid}
                className="block w-[200px] min-h-28 rounded-lg border-gray-200 bg-white p-6 shadow hover:bg-zinc-100 dark:border-gray-700"
              >
                <h5 className="mb-2 text-1xl font-bold tracking-tight text-black">
                  {course.coursecode}
                </h5>
                <p className="font-normal text-xs text-gray-700 dark:text-gray-400">
                  {course.coursename}
                  {course.courseteacher}
                </p>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}
