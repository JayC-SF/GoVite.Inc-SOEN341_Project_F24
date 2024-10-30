import { useState, useContext } from "react";
import UserInfoContext, { UserInfo } from "../contexts/userinfo";
//import RatingQuestion from '../components/RatingQuestion';
//import CommentBox from '../components/CommentBox';

// Define an interface for the props of ClassCard
interface ClassCardProps {
    className: string;
    description: string;
    imageUrl: string;
}

// Define an interface for the props of GroupCard
interface GroupCardProps {
    groupName: string;
    imageUrl: string;
}


function ClassCard({ className, description, imageUrl }: ClassCardProps) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="relative bg-white rounded-lg shadow-md w-48 h-48 overflow-hidden flex flex-col justify-between transition-transform transform hover:scale-105 cursor-pointer">
            {/* Red Curve Design */}
            <div className="absolute top-0 right-0 w-14 h-16 bg-gradient-to-br from-primary-red/60 to-primary-red rounded-bl-full z-0"></div>

            {/* Colon Icon with Dropdown */}
            <div className="absolute top-2 right-2 z-10">
                <button onClick={() => setShowDropdown(!showDropdown)} className="text-white font-bold text-xl">
                    &#8942; {/* Unicode for three vertical dots */}
                </button>
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                        <ul>
                            <li
                                className="px-1 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => alert('Star this course selected')}
                            >
                                Star this course
                            </li>
                            <li
                                className="px-1 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => alert('Remove from view selected')}
                            >
                                Remove from view
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Thumbnail Image */}
            <img
                src={imageUrl}
                alt={`${className} Thumbnail`}
                className="absolute top-2 left-2 w-12 h-12 object-cover z-10" // Position the image in the top-left corner
            />

            {/* Class Info */}
            <div className="p-10 pl-6 z-0 flex-grow flex flex-col justify-end"> {/* Ensure content pushes down */}
                <h3 className="text-lg font-semibold text-primary-black">{className}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}

function GroupCard({ groupName, imageUrl }: GroupCardProps) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="relative bg-white rounded-lg shadow-md w-48 h-48 overflow-hidden flex flex-col justify-between transition-transform transform hover:scale-105 cursor-pointer">
            {/* Red Curve Design */}
            <div className="absolute top-0 right-0 w-14 h-16 bg-gradient-to-br from-primary-red/60 to-primary-red rounded-bl-full z-0"></div>

            {/* Colon Icon with Dropdown */}
            <div className="absolute top-2 right-2 z-10">
                <button onClick={() => setShowDropdown(!showDropdown)} className="text-white font-bold text-xl">
                    &#8942; {/* Unicode for three vertical dots */}
                </button>
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                        <ul>
                            <li
                                className="px-1 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => alert('Star this group selected')}
                            >
                                Star this group
                            </li>
                            <li
                                className="px-1 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => alert('Remove from view selected')}
                            >
                                Remove from view
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Thumbnail Image */}
            <img
                src={imageUrl}
                alt={`${groupName} Thumbnail`}
                className="absolute top-2 left-2 w-12 h-12 object-cover z-10"
            />

            {/* Group Info */}
            <div className="p-10 pl-6 z-0 flex-grow flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-primary-black">{groupName}</h3>
            </div>
        </div>
    );
}


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

                {/* My Classes Section */}
                <div className="bg-primary-red/90 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">My Classes</h2>
                    
                    {/* Classes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <ClassCard 
                            className="SOEN 341" 
                            description="Software Process and Practices" 
                            imageUrl="/src/assets/thumbnail.png" 
                        />
                        <ClassCard 
                            className="COMP 335" 
                            description="Software Design" 
                            imageUrl="/src/assets/thumbnail.png" 
                        />
                        <ClassCard 
                            className="SOEN 331" 
                            description="Formal Methods" 
                            imageUrl="/src/assets/thumbnail.png" 
                        />
                        <ClassCard 
                            className="ENGR 275" 
                            description="Fundamentals of Engineering" 
                            imageUrl="/src/assets/thumbnail.png" 
                        />
                    </div>

                    {/* See All Button */}
                    <div className="text-right mt-4">
                        <a href="/my-classes" className="text-white hover:underline">See all &gt;</a>
                    </div>
                </div>

                {/* My Groups Section */}
                <div className="bg-primary-red/90 rounded-lg shadow-md p-6 mt-6">
                    <h2 className="text-2xl font-bold text-white mb-4">My Groups</h2>

                
                    {/* Groups Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <GroupCard 
                            groupName="GoVite" 
                            imageUrl="/src/assets/thumbnail.png" 
                        />
                        <GroupCard 
                            groupName="Flexers" 
                            imageUrl="/src/assets/thumbnail.png" 
                        />
                        <GroupCard 
                            groupName="Faze" 
                            imageUrl="/src/assets/thumbnail.png" 
                        />
                        <GroupCard 
                            groupName="Matrix" 
                            imageUrl="/src/assets/thumbnail.png" 
                        />
                    </div>

                    {/* See All Button */}
                    <div className="text-right center mt-4">
                        <a href="/my-groups" className="text-white hover:underline">See all &gt;</a> {/*Use &gt; for the arrow symbol*/}
                    </div>
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

    

    //  // Render for student
    // if (userInfo?.role === "student") {
    //     return (
    //         <div className="p-6 space-y-6">
    //             {/* Welcome Section */} 
    //             <div className="welcome-section bg-gradient-to-bl from-primary-red/60 to-primary-red rounded-lg shadow-md p-4 flex">
    //                 <div className="flex-1">
    //                     <p className="text-lg font-semibold text-white">
    //                         Hi! {userInfo.firstname} {userInfo.lastname}, your email is {userInfo.email} and your role is {userInfo.role}
    //                     </p><br></br>
    //                     <p className="text-xl text-gray-200 mb-4">{currentDate}</p>
    //                 </div>
    //             </div>

    //             {/* Rating Form Section */}
    //             <div className="rating-form-section bg-gray-100 rounded-lg shadow-md p-4 mt-6">
    //                 <h2 className="text-2xl font-bold text-primary-red mb-4">Rate My Peers - Assessment form</h2>
    //                 <p className="text-gray-600 mb-2">Please rate your peers on their cooperation, conceptual contributions, practical contributions, and work ethic within the group: </p>

    //                 {/* Member Selection */}
    //                 <div className="flex flex-col mb-12">
    //                     <label className="text-lg font-semibold text-gray-800">Select Team Member:</label>
    //                     <select className="border border-gray-300 rounded-md p-2" required>
    //                         <option value="">Choose a team member</option>
    //                         <option value="member1">Member 1</option>
    //                         <option value="member2">Member 2</option>
    //                         <option value="member3">Member 3</option>
    //                     </select>
    //                 </div>

    //                 {/* Rating Criteria */}
    //                 <form className="space-y-4" onSubmit={handleSubmit}>
    //                     <h2 className="text-xl font-bold text-primary-red mb-4 ml-4">Cooperation</h2>
    //                     <RatingQuestion label="1. Actively participating in meetings:" />
    //                     <RatingQuestion label="2. Communicating within the group:" />
    //                     <RatingQuestion label="3. Cooperating within the group:" />
    //                     <RatingQuestion label="4. Assisting team-mates when needed:" />
    //                     <RatingQuestion label="5. Volunteering for tasks:" />
    //                     <CommentBox />
    //                     <br></br><br></br>

    //                     <h2 className="text-xl font-bold text-primary-red mb-4 ml-4">Conceptual Contribution</h2>
    //                     <RatingQuestion label="1. Researching and gathering information:" />
    //                     <RatingQuestion label="2. Quality of individual contribution:" />
    //                     <RatingQuestion label="3. Suggesting ideas:" />
    //                     <RatingQuestion label="4. Tying ideas together:" />
    //                     <RatingQuestion label="5. Identifying difficulties:" />
    //                     <RatingQuestion label="6. Identifying effective approaches:" />
    //                     <CommentBox />
    //                     <br></br><br></br>

    //                     <h2 className="text-xl font-bold text-primary-red mb-4 ml-4">Practical Contribution</h2>
    //                     <RatingQuestion label="1. Writing of the report(s):" />
    //                     <RatingQuestion label="2. Reviewing others’ report(s) or section(s):" />
    //                     <RatingQuestion label="3. Providing constructive feedback on the report(s) or the presentation:" />
    //                     <RatingQuestion label="4. Contributing to the organization of the work:" />
    //                     <RatingQuestion label="5. Contributing to the preparation of presentation(s) :" />
    //                     <CommentBox />
    //                     <br></br><br></br>

    //                     <h2 className="text-xl font-bold text-primary-red mb-4 ml-4">Work Ethic</h2>
    //                     <RatingQuestion label="1. Displaying a positive attitude:" />
    //                     <RatingQuestion label="2. Respecting team-mates:" />
    //                     <RatingQuestion label="3. Respecting commitments:" />
    //                     <RatingQuestion label="4. Respecting deadlines:" />
    //                     <RatingQuestion label="5. Respecting team-mates' ideas:" />
    //                     <CommentBox />
    //                     <br></br><br></br>

    //                     {/* Submit Button */}
    //                     <button type="submit" className="bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">
    //                         Submit Ratings
    //                     </button>
    //                 </form>
    //             </div>
    //         </div>

    //     );
    // } 
    

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
