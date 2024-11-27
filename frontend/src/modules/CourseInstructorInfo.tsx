interface CourseInstructorInfoProps {
    firstname: string,
    lastname: string,
    email: string
}
export const  CourseInstructorInfo = ({firstname, lastname, email}: CourseInstructorInfoProps) => (
    <div className="m-5">
        <h2 className="text-3xl mb-2 mt-5 font-bold">Instructor Information</h2>
        <a href={`/profile/${email}`} className="block font-semibold m-5">{firstname} {lastname}</a>
        <a href={`mailto:${email}`} className="block font-semibold m-5">{email}</a>
    </div>
)