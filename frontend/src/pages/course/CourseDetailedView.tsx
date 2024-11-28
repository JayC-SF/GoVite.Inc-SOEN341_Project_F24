import { useEffect, useState } from "react";
import CommentIcon from "../../assets/CommentIcon.svg";
import { GetDetailedCourseInfo, StudentResponse } from "../../network/services/courseService";


interface StudentReview {
  teamname: string;
  student: StudentResponse;
}

export function CourseDetailedView(props: {courseid:string}) {
  const [reviews, setReviews] = useState<StudentReview[]>();
  useEffect(() => {
    GetDetailedCourseInfo(props.courseid).then((data) =>{
      // iterates through each team in the teams array.
      const flattenedReviews: StudentReview[] = data.teams.flatMap((team) =>
        team.students.map((student) => ({
          teamname: team.teamname,
          student,
        }))
      );

      setReviews(flattenedReviews);      
    })


  }, []);

  return (
    <>
      {reviews === undefined && (
        <div className="mx-auto">
          <p className="text-2xl text-center font-semibold text-white">
            Loading course reviews...
          </p>
        </div>
      )}
      {reviews?.length === 0 && (
        <div className="mx-auto">
          <p className="text-2xl text-center font-semibold text-white">
            There are no reviews...
          </p>
        </div>
      )}
      {reviews && reviews.length > 0 && (
        <>
          {reviews.map((review, index) => (
            <div key={index} className="">
              <div className="flex gap-2 mt-4">
                <div className="student-tag text-center h-10 bg-[#b1d2f9]">
                  <span className="inline-block text-center p-1.5 w-content">
                    <a href={`/profile/${review.student.email}`}>
                      {review.student.firstname + " " + review.student.lastname}
                    </a>
                  </span>
                </div>
                <div className="student-tag text-center h-10 bg-[#FF9AA2]">
                  <span className="inline-block text-center p-1.5">
                    {review.teamname}
                  </span>
                </div>

                <div className="student-tag text-center h-10 bg-[#CAB576]">
                  <span className="inline-block text-center p-1.5">
                    <a href={`/profile/${review.student.email}`}>
                      {review.student.username}
                    </a>
                  </span>
                </div>
              </div>

              {/* Table of Peer Reviews for Each Student */}
              {review.student.ratedby.length !== 0? (
                <>
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
                              <a href={`/profile/${reviewer.email}`}>
                                {reviewer.firstname + " " + reviewer.lastname}
                              </a>
                            </td>
                            <td>{reviewer.ratings.cooperation.toFixed(1) || "NA"}</td>
                            <td>{reviewer.ratings.conceptual.toFixed(1) || "NA"}</td>
                            <td>{reviewer.ratings.practical.toFixed(1) || "NA"}</td>
                            <td>{reviewer.ratings.workethic.toFixed(1) || "NA"}</td>
                            <td>{reviewer.average.toFixed(1) || "NA"}</td>
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
                            <a
                            target="blank"
                            className="hover:underline hover:text-[#9B394B]"
                            href={"/profile/" + reviewer.email}>
                              <p className="text-gray-400 self-center hover:text-[#BE5A6C]">
                                {reviewer.firstname + " " + reviewer.lastname}
                              </p>
                            </a>
                            <p className="text-lg self-center">
                              {reviewer.comment}
                            </p>
                          </div>
                        </div>
                      )
                  )}
                </>
              ): (
                <div className="my-3 rounded-md p-4 text-2xl font-semibold  text-white text-center">
                  This student has no reviews...
                </div>
                
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
