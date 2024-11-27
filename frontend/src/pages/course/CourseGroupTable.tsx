import { useEffect, useState } from "react";
import { GetDetailedCourseInfo, RatingResponse, StudentResponse } from "../../network/services/courseService";

interface StudentReview {
  teamname: string;
  student: StudentResponse;
  peerCount: number;
  ratings: RatingResponse;
}

export function CourseGroupTable(props: { courseid: string; onTableRendered?: () => void }) {
  const [reviews, setReviews] = useState<StudentReview[]>();

  useEffect(() => {
      GetDetailedCourseInfo(props.courseid).then((data)=> {
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

        // Notify parent when table is ready
        if (flattenedReviews.length > 0 && props.onTableRendered) {
          props.onTableRendered();
        }
      });
  }, [props.courseid, props.onTableRendered]);

  return (
    <>
      {/* case loading reviews */}
      {reviews === undefined && (
        <div className="mx-auto">
          <p className="text-2xl text-center font-semibold text-white">
            Loading course reviews...
          </p>
        </div>
      )}
      {/* case there are no reviews */}
      {reviews?.length === 0 && (
        <div className="mx-auto">
          <p className="text-2xl text-center font-semibold text-white">
            There are no reviews...
          </p>
        </div>
      )}
      {/* case there are reviews */}
      {(reviews && reviews.length > 0 )&& (
        <div className=" mt-3 rounded-lg relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs uppercase bg-[#F5F5F5] text-center">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Student Username
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
                  className="bg-white hover:bg-slate-100 border-b text-[#333333] text-center cursor-pointer"
                  onClick={() => window.open(`/profile/${review.student.email}`)}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {review.student.username}
                  </td>
                  <td className=" px-3 py-4">
                    {review.student.firstname}
                  </td>
                  <td className="px-3 py-4">
                    {review.student.lastname}
                  </td>
                  <td className="px-3 py-4">{review.teamname}</td>
                  <td className="px-3 py-4">
                    {review.ratings.cooperation? review.ratings.cooperation.toFixed(1): "NA"}
                  </td>
                  <td className="px-3 py-4">
                    {review.ratings.conceptual? review.ratings.conceptual.toFixed(1): "NA"}
                  </td>
                  <td className="px-3 py-4">
                    {review.ratings.practical? review.ratings.practical.toFixed(1): "NA"}
                  </td>
                  <td className="px-3 py-4">
                    {review.ratings.workethic? review.ratings.workethic.toFixed(1): "NA"}
                  </td>
                  <td className="px-3 py-4">{review.peerCount}</td>
                  <td className="px-3 py-4">
                    {review.student.averagerating?.toFixed(1) || "NA"}
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


