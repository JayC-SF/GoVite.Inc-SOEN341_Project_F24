import { useContext } from "react";
import UserInfoContext, { UserInfo } from "../contexts/userinfo";
import RatingQuestion from '../components/RatingQuestion';
import CommentBox from '../components/CommentBox';

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        const confirmSubmit = window.confirm("Are you sure you want to submit your ratings?");

        if (confirmSubmit) {
            // Handle the actual submission logic here
            console.log("Ratings submitted");
            alert("Submission completed"); // Show an alert on successful submission
        } else {
            console.log("Submission cancelled");
            alert("Submission cancelled"); // Show an alert if cancelled
        }
    };

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

                {/* Rating Form Section */}
                <div className="rating-form-section bg-gray-100 rounded-lg shadow-md p-4 mt-6">
                    <h2 className="text-2xl font-bold text-primary-red mb-4">Rate My Peers - Assessment form</h2>
                    <p className="text-gray-600 mb-2">Please rate your peers on their cooperation, conceptual contributions, practical contributions, and work ethic within the group: </p>

                    {/* Member Selection */}
                    <div className="flex flex-col mb-12">
                        <label className="text-lg font-semibold text-gray-800">Select Team Member:</label>
                        <select className="border border-gray-300 rounded-md p-2" required>
                            <option value="">Choose a team member</option>
                            <option value="member1">Member 1</option>
                            <option value="member2">Member 2</option>
                            <option value="member3">Member 3</option>
                        </select>
                    </div>

                    {/* Rating Criteria */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <h2 className="text-xl font-bold text-primary-red mb-4 ml-4">Cooperation</h2>
                        <RatingQuestion label="1. Actively participating in meetings:" />
                        <RatingQuestion label="2. Communicating within the group:" />
                        <RatingQuestion label="3. Cooperating within the group:" />
                        <RatingQuestion label="4. Assisting team-mates when needed:" />
                        <RatingQuestion label="5. Volunteering for tasks:" />
                        <CommentBox />
                        <br></br><br></br>

                        <h2 className="text-xl font-bold text-primary-red mb-4 ml-4">Conceptual Contribution</h2>
                        <RatingQuestion label="1. Researching and gathering information:" />
                        <RatingQuestion label="2. Quality of individual contribution:" />
                        <RatingQuestion label="3. Suggesting ideas:" />
                        <RatingQuestion label="4. Tying ideas together:" />
                        <RatingQuestion label="5. Identifying difficulties:" />
                        <RatingQuestion label="6. Identifying effective approaches:" />
                        <CommentBox />
                        <br></br><br></br>

                        <h2 className="text-xl font-bold text-primary-red mb-4 ml-4">Practical Contribution</h2>
                        <RatingQuestion label="1. Writing of the report(s):" />
                        <RatingQuestion label="2. Reviewing others’ report(s) or section(s):" />
                        <RatingQuestion label="3. Providing constructive feedback on the report(s) or the presentation:" />
                        <RatingQuestion label="4. Contributing to the organization of the work:" />
                        <RatingQuestion label="5. Contributing to the preparation of presentation(s) :" />
                        <CommentBox />
                        <br></br><br></br>

                        <h2 className="text-xl font-bold text-primary-red mb-4 ml-4">Work Ethic</h2>
                        <RatingQuestion label="1. Displaying a positive attitude:" />
                        <RatingQuestion label="2. Respecting team-mates:" />
                        <RatingQuestion label="3. Respecting commitments:" />
                        <RatingQuestion label="4. Respecting deadlines:" />
                        <RatingQuestion label="5. Respecting team-mates' ideas:" />
                        <CommentBox />
                        <br></br><br></br>

                        {/* Submit Button */}
                        <button type="submit" className="bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">
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
                <div className="courses-section bg-primary-red rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold text-white mb-2">Available Courses</h2><br></br>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Course 1 */}
                        <div className="course-card bg-gray-100 rounded-lg overflow-hidden shadow-md">
                            <img src="/src/assets/SOEN 341.jfif" alt="Course 1" className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">SOEN 341</h3>
                                <p className="text-sm text-gray-600">Software Process and Practices</p>
                                <a href="/courses/course1" className="text-blue-600 hover:underline">View Course</a>
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
