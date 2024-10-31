import { PostCreateNewRating } from "../network/services/ratingsService";
import CommentBox from "../components/CommentBox";
import RatingQuestion from "../components/RatingQuestion";
import { useEffect, useState } from "react";
import UserInfoContext from "../contexts/userinfo";
import SidebarPageTemplate from "../templates/SidebarPageTemplate";
import { useUserInfo } from "../hooks/useUserInfo";
import { useRequireAuthenticated } from "../hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { GetGroupInfo, GroupInfoResponse } from "../network/services/groupsService";

export default function RatePage() {
  const {groupid, email} = useParams()
  const userInfo = useUserInfo();
  const displayContent = useRequireAuthenticated();
  const [selectedStudent, setSelectedStudent] = useState<any>();
  const [rating, setRating] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [groupInfo, setGroupInfo] = useState<GroupInfoResponse>();
  const navigate = useNavigate()
  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  // Load in initial list of students from MongoDB
  useEffect(() => {
    GetGroupInfo(groupid || "").then(setGroupInfo);
  }, []);

  useEffect(() => {
    // Update selectedStudent to the first student in the list once students data is available
    if (groupInfo && groupInfo.students.length > 0 && userInfo !== undefined) {
      const filteredStudents = groupInfo.students.filter(
        (student) => student.email == email
      );
      if (filteredStudents.length > 0) {
        setSelectedStudent(filteredStudents[0].email);
      }
    }
  }, [userInfo, groupInfo]);

  const confirmSubmit = () => {
    PostCreateNewRating({
      ratedstudent: email || "",
      rating: rating,
      groupid: groupid || "",
    });
    setShowConfirmation(false); // Close the modal after submission
    navigate(`/groups/${groupid}`)
  };
  const handleIncrement = () => {
    if (rating < 5) setRating(rating + 1);
  };

  const handleDecrement = () => {
    if (rating > 1) setRating(rating - 1);
  };
  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        {
          userInfo && <div className="rating-form-section bg-gray-100 rounded-lg shadow-md p-4 mt-6">
          <h2 className="text-2xl font-bold text-primary-red mb-4">
            Rate My Peers - Assessment Form
          </h2>
          <p className="text-gray-600 mb-2">
            Please rate your peers on their cooperation, conceptual
            contributions, practical contributions, and work ethic within the
            group:{" "}
          </p>

          {/* Rating Criteria */}
          <form className="space-y-4">
            {/* Member Selection */}
            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold text-gray-800">
                Choose a Team Member to Review:
              </label>
              <select
                value={selectedStudent}
                className="border border-gray-300 rounded-md p-2"
                onChange={(e) => {
                  setSelectedStudent(e.target.value);
                }}
                required
              >
                {groupInfo?.students
                  .filter((student) => student.email == email)
                  .map((student) => (
                    <option key={student.email} value={student.email}>
                      {`${student.firstname} ${student.lastname}`}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <h2 className="text-xl underline font-semibold text-primary-red mb-4">
                Cooperation
              </h2>
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
              <label className="text-lg font-semibold text-gray-800">
                Overall Rating:
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="px-3 py-1 bg-gray-300 rounded-md"
                >
                  -
                </button>
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
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="px-3 py-1 bg-gray-300 rounded-md"
                >
                  +
                </button>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
            >
              Submit Ratings
            </button>
          </form>

          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md space-y-4">
                <p className="text-gray-800">
                  Are you sure you want to submit this rating?
                </p>
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
        }
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
}
