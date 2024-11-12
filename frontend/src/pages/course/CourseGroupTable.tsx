import { useEffect, useState } from "react";

interface Rating {
  cooperation: number;
  conceptual: number;
  practical: number;
  workethic: number;
}

interface RatedBy {
  firstname: string;
  lastname: string;
  email: string;
  ratings: Rating;
  average: number;
  comment: string;
}

interface Student {
  firstname: string;
  lastname: string;
  averagerating: number;
  ratedby: RatedBy[];
}

interface Team {
  teamname: string;
  students: Student[];
}

interface StudentReview {
  teamname: string;
  student: Student;
  peerCount: number;
  ratings: Rating;
}

export function CourseGroupTable() {
  const [reviews, setReviews] = useState<StudentReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
           // Replace with approriate API
          "https://dummyjson.com/c/9069-b2fd-4103-90af"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: { teams: Team[] } = await response.json();

        // Flatten the data into a list of StudentReview objects
        const flattenedReviews: StudentReview[] = data.teams.flatMap((team) =>
          team.students.map((student) => {
            // Counts how many peers have rated the student
            const peerCount = student.ratedby.length;

            //Goes through each review in student.ratedby and accumulate the total ratings for each rating dimension
            const ratings = student.ratedby.reduce(
              (acc, review) => {
                acc.cooperation += review.ratings.cooperation;
                acc.conceptual += review.ratings.conceptual;
                acc.practical += review.ratings.practical;
                acc.workethic += review.ratings.workethic;
                return acc;
              },
              { cooperation: 0, conceptual: 0, practical: 0, workethic: 0 }
            );

            return {
              teamname: team.teamname,
              student,
              peerCount,

              //Calculates the average for each rating dimension
              ratings: {
                cooperation: ratings.cooperation / peerCount,
                conceptual: ratings.conceptual / peerCount,
                practical: ratings.practical / peerCount,
                workethic: ratings.workethic / peerCount,
              },
            };
          })
        );

        setReviews(flattenedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      {reviews.length === 0 ? (
        <div className="mx-auto">
          <p className="text-2xl text-center font-semibold text-white">
            There are no reviews...
          </p>
        </div>
      ) : (
        <div className=" mt-3 rounded-lg relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs uppercase bg-[#F5F5F5]">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Student ID
                </th>
                <th scope="col" className="px-3 py-3">
                  First Name
                </th>
                <th scope="col" className="px-3 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-3 py-3">
                  Team
                </th>
                <th scope="col" className="px-3 py-3">
                  Cooperation
                </th>
                <th scope="col" className="px-3 py-3">
                  Conceptual
                </th>
                <th scope="col" className="px-3 py-3">
                  Practical
                </th>
                <th scope="col" className="px-3 py-3">
                  Work Ethic
                </th>
                <th scope="col" className="px-3 py-3">
                  Peers who Responded
                </th>
                <th scope="col" className="px-3 py-3">
                  Average
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr
                  key={index}
                  className="bg-white hover:bg-slate-100 border-b text-[#333333]"
                >
                  <td className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {review.student.firstname[0] + review.student.lastname[0]}
                  </td>
                  <td className=" px-3 py-4 text-center">
                    {review.student.firstname}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {review.student.lastname}
                  </td>
                  <td className="px-3 py-4 text-center">{review.teamname}</td>
                  <td className="px-3 py-4 text-center">
                    {review.ratings.cooperation.toFixed(1)}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {review.ratings.conceptual.toFixed(1)}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {review.ratings.practical.toFixed(1)}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {review.ratings.workethic.toFixed(1)}
                  </td>
                  <td className="px-3 py-4 text-center">{review.peerCount}</td>
                  <td className="px-3 py-4 text-center">
                    {review.student.averagerating.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
