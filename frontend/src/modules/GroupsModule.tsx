import { useContext, useEffect, useState } from "react";
import UserInfoContext, { UserInfo } from "../contexts/userinfo";
import { PostCreateNewRating } from "../network/services/ratingsService";
import StudentCourses from "../pages/home/courses/StudentCourses";
import TeacherCourses from "../pages/home/courses/TeacherCourses";
import CommentBox from "../components/CommentBox";
import RatingQuestion from "../components/RatingQuestion";

export default function GroupsModule() {
    const userInfo = useContext<UserInfo | undefined>(UserInfoContext);
    const [students, setStudents] = useState<any[]>([])
    const [selectedStudent, setSelectedStudent] = useState<any>()
    const [rating, setRating] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const currentDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date());

    // Load in initial list of students from MongoDB
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

    
    useEffect(() => {
        // Update selectedStudent to the first student in the list once students data is available
        if (students.length > 0) {
            const filteredStudents = students.filter(student => student.email !== userInfo?.email);
            if (filteredStudents.length > 0) {
                setSelectedStudent(filteredStudents[0].email);
            }
        }
    }, [students]);

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

    const handleSubmit = () => {
        setShowConfirmation(true);
    };

    const confirmSubmit = () => {
        PostCreateNewRating({
            "ratedstudent": selectedStudent,
            "rating": rating,
            "groupid": "67211117efa57b840254b949"
        });
        setShowConfirmation(false);  // Close the modal after submission
    };

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
                            <select value={selectedStudent} className="border border-gray-300 rounded-md p-2" 
                            onChange={(e) => { 
                                setSelectedStudent(e.target.value)
                            }}
                            required>
                                {students
                                    .filter(student => student.email !== userInfo.email)
                                    .map((student) => (
                                        <option key={student.email} value={student.email}>
                                        {`${student.firstname} ${student.lastname}`}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <h2 className="text-xl underline font-semibold text-primary-red mb-4">Cooperation</h2>
                            <RatingQuestion label="1. Actively participating in meetings:" />
                            <RatingQuestion label="2. Communicating within the group:" />
                            <RatingQuestion label="3. Cooperating within the group:" />
                            <RatingQuestion label="4. Assisting team-mates when needed:" />
                            <RatingQuestion label="5. Volunteering for tasks:" />
                            <CommentBox />
                            <br></br>
                        </div>
                        
                        {/* Input value to add overall rating */}
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
                        <button type="button" onClick={handleSubmit} className="bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">
                            Submit Ratings
                        </button>
                    </form>

                    {/* Confirmation Modal */}
                    {showConfirmation && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-md space-y-4">
                                <p className="text-gray-800">Are you sure you want to submit this rating?</p>
                                <div className="flex justify-end space-x-2">
                                    <button 
                                        onClick={() => setShowConfirmation(false)} 
                                        className="px-4 py-2 bg-gray-300 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={confirmSubmit} 
                                        className="px-4 py-2 bg-primary-red text-white rounded-md hover:bg-red-600"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
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
                        <div className="flex flex-wrap justify-around">
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
