import { useEffect, useState } from "react";
import CommentIcon from "../../assets/CommentIcon.svg";

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
}

export function CourseDetailedView() {
  const [reviews, setReviews] = useState<StudentReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/c/67b7-3ef4-4be2-b353"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: { teams: Team[] } = await response.json();

        // iterates through each team in the teams array.
        const flattenedReviews: StudentReview[] = data.teams.flatMap((team) =>
          team.students.map((student) => ({
            teamname: team.teamname,
            student,
          }))
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
        <>
          {reviews.map((review, index) => (
            <div key={index} className="">
              <div className="flex gap-2 mt-4">
                <div className="student-tag text-center h-10 bg-[#b1d2f9]">
                  <span className="inline-block text-center py-1.5">
                    {review.student.firstname + " " + review.student.lastname}
                  </span>
                </div>
                <div className="student-tag text-center h-10 bg-[#FF9AA2]">
                  <span className="inline-block text-center py-1.5">
                    {review.teamname}
                  </span>
                </div>

                <div className="student-tag text-center h-10 bg-[#CAB576]">
                  <span className="inline-block text-center py-1.5">
                    {review.student.firstname[0] + review.student.lastname[0]}
                  </span>
                </div>
              </div>

              {/* Table of Peer Reviews for Each Student */}
              <div className="rounded-lg mt-3 relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                  <thead className="text-xs uppercase bg-[#F5F5F5]">
                    <tr className="text-center">
                      <th scope="col" className="px-6 py-4">
                        Reviewer
                      </th>
                      <th scope="col">Cooperation</th>
                      <th scope="col">Conceptual</th>
                      <th scope="col">Practical</th>
                      <th scope="col">Work Ethic</th>
                      <th scope="col">Average</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {review.student.ratedby.map((reviewer, reviewerIndex) => (
                      <tr
                        key={reviewerIndex}
                        className="bg-white hover:bg-slate-100 border-b text-[#333333]"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {reviewer.firstname + " " + reviewer.lastname}
                        </td>
                        <td>{reviewer.ratings.cooperation.toFixed(1)}</td>
                        <td>{reviewer.ratings.conceptual.toFixed(1)}</td>
                        <td>{reviewer.ratings.practical.toFixed(1)}</td>
                        <td>{reviewer.ratings.workethic.toFixed(1)}</td>
                        <td>{reviewer.average.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {review.student.ratedby.map(
                (reviewer) =>
                  reviewer.comment.length !== 0 && (
                    <div className="comment mt-3 flex" key={reviewer.email}>
                      <img
                        src={CommentIcon}
                        className="size-12 self-center"
                        alt="Comment Icon"
                      />
                      <div>
                        <p className="text-gray-400 self-center">
                          {reviewer.firstname + " " + reviewer.lastname}
                        </p>
                        <p className="text-lg self-center">
                          {reviewer.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}

              {/* Horizontal line between students */}
              <hr className="border-2 border-solid border-[#B64859] mt-5 mb-1 w-11/12 mx-auto" />
            </div>
          ))}
        </>
      )}
    </>
  );
}
