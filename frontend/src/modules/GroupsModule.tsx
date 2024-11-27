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
            <div className="p-1 space-y-6 h-full">
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
            </div>
        );
    }

    // Render for teacher
    else if (userInfo?.role === "teacher") {
        return (
            <div className="p-6 space-y-6">
                {/* Welcome Section */}
                <div className="module-t rounded-2xl shadow-md p-4 flex items-center">
                <div className="pl-8s flex-1">
                        <p className="text-sm text-gray-200 mb-10">{currentDate}</p>
                        <h1 className="text-3xl font-bold text-white mb-4">Welcome back, Professor {userInfo.lastname}!</h1>
                        <p className="text-gray-200">Keep inspiring and guiding your students to reach new heights</p>
                        <p className="pt-4 text-sm italic text-gray-300"  style={{
                            transition: 'opacity 0.1s ease-in-out',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >"Education is the most powerful weapon which you can use to change the world" – Nelson Mandela</p>
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
            </div>
        );
    }

    // Fallback return (should not be reached)
    return <></>;
}
