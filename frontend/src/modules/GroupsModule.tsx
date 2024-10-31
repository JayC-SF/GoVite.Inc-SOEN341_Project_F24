import { useContext, useEffect, useState } from "react";
import UserInfoContext, { UserInfo } from "../contexts/userinfo";
import { PostCreateNewRating } from "../network/services/ratingsService";
import StudentCourses from "../pages/home/courses/StudentCourses";
import TeacherCourses from "../pages/home/courses/TeacherCourses";

export default function GroupsModule() {
    const userInfo = useContext<UserInfo | undefined>(UserInfoContext);
    const [students, setStudents] = useState<any[]>([])
    const [selectedStudent, setSelectedStudent] = useState<any>()
    const [rating, setRating] = useState(1);
    const currentDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date());

    useEffect(() => {
        const loadStudents = async () => {
            const response = await fetch('/api/students');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStudents(data);
        };
        loadStudents();
      }, []);

    const handleIncrement = () => {
        if (rating < 5) setRating(rating + 1);
    };

    const handleDecrement = () => {
        if (rating > 1) setRating(rating - 1);
    };

    // If userInfo is not defined or the user is not a student or teacher, render nothing
    if (!userInfo || (userInfo?.role !== "student" && userInfo?.role !== "teacher")) {
        return <></>;
    }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault(); // Prevent default form submission
    //     const confirmSubmit = window.confirm("Are you sure you want to submit your ratings?");

    //     if (confirmSubmit) {
    //         // Handle the actual submission logic here
    //         console.log("Ratings submitted");
    //         alert("Submission completed"); // Show an alert on successful submission
    //     } else {
    //         console.log("Submission cancelled");
    //         alert("Submission cancelled"); // Show an alert if cancelled
    //     }
    // };

    // Render for student
    if (userInfo?.role === "student") {
        return (
            <div className="p-1 space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-bl from-primary-red/60 to-primary-red rounded-lg shadow-md p-4 flex items-center">
                    <div className="pl-8 flex-1">
                        <p className="text-sm text-gray-200 mb-12">{currentDate}</p>
                        
                        <h1 className="text-3xl font-bold text-white">Welcome back, {userInfo.firstname}!</h1>
                        <p className="text-sm text-gray-200 mt-1">Always stay updated in your student portal</p>
                    </div>
                    <img src="/src/assets/student.png" alt="Welcome" className="pr-7 w-200 h-40 object-contain" />
                </div>


                {/* Course Section */}
                <div className="welcome-section bg-gradient-to-bl from-primary-red/60 to-primary-red rounded-lg shadow-md p-4 flex flex">
                    <div className="flex-1">
                        <p className="header-w font-semibold text-2xl"> My Classes</p>
                        <div className="flex flex-wrap justify-around">
                            <StudentCourses></StudentCourses>
                        </div>
                    </div>
                </div>


                {/* Rating Form Section */}
                <div className="rating-form-section bg-gray-100 rounded-lg shadow-md p-4 mt-6">
                    <h2 className="text-2xl font-bold text-primary-red mb-4">Rate My Peers - Assessment Form</h2>
                    <p className="text-gray-600 mb-2">Please rate your peers on their cooperation, conceptual contributions, practical contributions, and work ethic within the group: </p>

                    {/* Rating Criteria */}
                    <form className="space-y-4">
                        {/* Member Selection */}
                        <div className="flex flex-col mb-4">
                            <label className="text-lg font-semibold text-gray-800">Choose a Team Member to Review:</label>
                            <select className="border border-gray-300 rounded-md p-2" 
                            onChange={(e) => { 
                                setSelectedStudent(e.target.value)
                            }}
                            required>
                                {/* <option value="">Choose a Team Member to Review:</option> */}
                                {students.map((student) => (
                                    <option key={student.email} value={student.email}>
                                    {`${student.firstname} ${student.lastname}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col mb-4">
                            <label className="text-lg font-semibold text-gray-800">Overall Rating:</label>
                            <div className="flex items-center">
                                <button type="button" onClick={handleDecrement} className="px-3 py-1 bg-gray-300 rounded-md">-</button>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="5"
                                    value={rating}
                                    className="border border-gray-300 text-center w-12 p-1"
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    readOnly 
                                    required 
                                />
                                <button type="button" onClick={handleIncrement} className="px-3 py-1 bg-gray-300 rounded-md">+</button>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <button type="button" onClick={() => PostCreateNewRating( {"ratedstudent": selectedStudent, "rating": rating, "groupid": "67211117efa57b840254b949"})} className="bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">
                            Submit Ratings
                        </button>
                    </form>
                </div>
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
                <div className="welcome-section bg-gradient-to-bl from-primary-red/60 to-primary-red rounded-lg shadow-md p-4 flex flex">
                    <div className="flex-1">
                        <p className="header-w font-semibold text-2xl"> Available Courses</p>
                        <div className="flex flex-wrap justify-around">
                            <TeacherCourses></TeacherCourses>
                        </div>
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
