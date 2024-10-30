import { useContext } from "react";
import UserInfoContext, { UserInfo } from "../contexts/userinfo";

export default function GroupsModule() {
    const userInfo = useContext<UserInfo | undefined>(UserInfoContext);
    const currentDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date());

    // If userInfo is not defined or the user is not a student or teacher, render nothing
    if (!userInfo || (userInfo?.role !== "student" && userInfo?.role !== "teacher")) {
        return <></>;
    }

    // Render for student
    if (userInfo?.role === "student") {
        return (
            <div className="p-6 space-y-6">
                {/* Welcome Section */}
                <div className="welcome-section bg-gradient-to-bl from-primary-red/60 to-primary-red rounded-lg shadow-md p-4 flex">
                    <div className="flex-1">
                        <p className="text-lg font-semibold text-white">
                            Hi! {userInfo.firstname} {userInfo.lastname}, your email is {userInfo.email} and your role is {userInfo.role}
                        </p><br></br>
                        <p className="text-xl text-gray-200 mb-4">{currentDate}</p>
                    </div>
                </div>
                 {/* More sections */}
            </div>

        );
    }

    // Render for teacher
    else if (userInfo?.role === "teacher") {
        return (
            <div className="p-6 space-y-6">
                {/* Welcome Section */}
                <div className="welcome-section bg-gradient-to-bl from-primary-red/60 to-primary-red rounded-lg shadow-md p-4 flex">
                    <div className="flex-1">
                        <p className="text-lg font-semibold text-white">
                            Hi! {userInfo.firstname} {userInfo.lastname}, your email is {userInfo.email} and your role is {userInfo.role}
                        </p><br></br>
                        <p className="text-xl text-gray-200 mb-4">{currentDate}</p>
                        <h2 className="text-2xl font-bold text-white mb-4">Welcome back to RateMyPeers!</h2>
                        <p className="mt-2 text-gray-200">You have 27 new students added to your domain. Please reach out to the Course Coordinator if you want them excluded from your domain.</p>
                    </div>
                    <div className="flex-shrink-0">
                        <img src="/src/assets/teacher.png" alt="Welcome Image" className="w-80 h-55 object-cover rounded-lg" />
                    </div>
                </div>

                {/* Courses Section */}
                <div className="courses-section bg-primary-red rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold text-white mb-2">Available Courses</h2><br></br>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Course 1 */}
                        <div className="course-card bg-gray-100 rounded-lg overflow-hidden shadow-md">
                            <img src="/src/assets/SOEN 341.jfif" alt="Course 1" className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">SOEN 341</h3>
                                <p className="text-sm text-gray-600">Software Process and Practices</p>
                                <a href="/courses/soen-341" className="text-blue-600 hover:underline">View Course</a>
                            </div>
                        </div>
                        
                        {/* Course 2 */}
                        <div className="course-card bg-gray-100 rounded-lg overflow-hidden shadow-md">
                            <img src="/path/to/course2-image.jpg" alt="Course 2" className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">Course 2</h3>
                                <p className="text-sm text-gray-600">Short description of Course 2.</p>
                                <a href="/courses/course2" className="text-blue-600 hover:underline">View Course</a>
                            </div>
                        </div>

                        {/* Course 3 */}
                        <div className="course-card bg-gray-100 rounded-lg overflow-hidden shadow-md">
                            <img src="/path/to/course3-image.jpg" alt="Course 3" className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">Course 3</h3>
                                <p className="text-sm text-gray-600">Short description of Course 3.</p>
                                <a href="/courses/course3" className="text-blue-600 hover:underline">View Course</a>
                            </div>
                        </div>
                        {/* Add more courses as needed */}
                    </div>
                </div>

                {/* Recent Activities Section */}
                <div className="recent-activities bg-primary-red rounded-lg shadow-md p-4">
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
