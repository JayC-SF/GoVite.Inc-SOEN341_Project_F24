import { useContext } from "react";
import UserInfoContext, { UserInfo } from "../contexts/userinfo";
import StudentCourses from "../pages/home/courses/StudentCourses";
import TeacherCourses from "../pages/home/courses/TeacherCourses";

export default function GroupsModule() {
    const userInfo = useContext<UserInfo | undefined>(UserInfoContext);

    const currentDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date());

    // Render for student
    if (userInfo?.role === "student") {
        return (
            <div className="p-1 space-y-6">
                {/* Welcome Section */}
                <div className="module rounded-2xl shadow-md p-4 flex items-center">
                    <div className="pl-8 flex-1">
                        <p className="text-sm text-gray-200 mb-12">{currentDate}</p>
                        <h1 className="text-3xl font-bold text-white">Welcome back, {userInfo.firstname}!</h1>
                        <p className="text-sm text-gray-200 mt-1">Always stay updated in your student portal</p>
                    </div>
                    <img src="/src/assets/student.png" alt="Welcome" className="pr-7 w-200 h-40 object-contain" />
                </div>

                {/* Course Section */}
                <div className="welcome-section module rounded-2xl shadow-md p-4 flex">
                    <div className="flex-1">
                        <p className="header-w font-semibold text-2xl"> My Classes</p>
                        <div className="flex flex-wrap justify-left">
                            <StudentCourses></StudentCourses>
                        </div>
                    </div>
                </div>

                {/* Rating Form Section */}
               
                {/* Footer with Need More Help Section */}
                <footer className="bg-gray-800 text-white py-5 mt-10 w-full">
                    <div className="container mx-auto text-center">
                        <p className="text-sm text-gray-400 mt-2 mb-2">
                            Need more help? Contact us at{" "}
                            <a href="tel:514-848-2424" className="text-[#ca3448] hover:text-[#E9D3D7]">
                                514-848-2424
                            </a>
                        </p>
                        <p>&copy; 2024 GoVite Inc. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        );
    }

    // Render for teacher
    else if (userInfo?.role === "teacher") {
        return (
            <div className="p-6 space-y-6">
                {/* Welcome Section */}
                <div className="module-t rounded-2xl shadow-md p-4 flex items-center">
                    <div className="flex-1">
                        <p className="text-xl text-gray-200 mb-4">{currentDate}</p>
                        <h2 className="text-2xl font-bold text-white mb-4">Welcome back to RateMyPeers!</h2>
                        <p className="mt-2 text-gray-200">You have 27 new students added to your domain. Please reach out to the Course Coordinator if you want them excluded from your domain.</p>
                    </div>
                    <div className="flex-shrink-0">
                        <img src="/src/assets/teacher.png" alt="Welcome Image" className="w-80 h-55 object-cover rounded-lg" />
                    </div>
                </div>

                {/* Courses Section */}
                <div className="module rounded-2xl shadow-md p-4 flex">
                    <div className="flex-1">
                        <p className="header-w font-semibold text-2xl"> Available Courses</p>
                        <div className="flex flex-wrap justify-left">
                            <TeacherCourses></TeacherCourses>
                        </div>
                    </div>
                </div>
                {/* Recent Activities Section */}
                <div className="recent-activities module rounded-2xl shadow-md p-4">
                    <h2 className="text-xl font-bold text-white mb-2">Recent Activities</h2>
                    <ul className="list-disc list-inside text-gray-200">
                        <li className="text-gray-200">Group 1 has submitted the team project on {currentDate}</li>
                        <li className="text-gray-200">You Will Start Teaching Course 2 on {currentDate}</li>
                        <li className="text-gray-200">Group 2 Joined a new team project on {currentDate}</li>
                    </ul>
                </div>

                {/* Footer with Need More Help Section */}
                <footer className="bg-gray-800 text-white py-5 mt-10 w-full">
                    <div className="container mx-auto text-center">
                        <p className="text-sm text-gray-400 mt-2 mb-2">
                            Need more help? Contact us at{" "}
                            <a href="tel:514-848-2424" className="text-[#ca3448] hover:text-[#E9D3D7]">
                                514-848-2424
                            </a>
                        </p>
                        <p>&copy; 2024 GoVite Inc. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        );
    }

    // Fallback return (should not be reached)
    return <></>;
}
