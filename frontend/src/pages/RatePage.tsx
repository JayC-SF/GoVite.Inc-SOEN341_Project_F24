import {
  defaultNewRatingForm,
  PostCreateNewRating,
} from "../network/services/ratingsService";
import CommentBox from "../components/CommentBox";
import RatingQuestion from "../components/RatingQuestion";
import { useEffect, useState } from "react";
import UserInfoContext, { UserInfo } from "../contexts/userinfo";
import SidebarPageTemplate from "../templates/SidebarPageTemplate";
import { useUserInfo } from "../hooks/useUserInfo";
import { useRequireAuthenticated } from "../hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetGroupInfo,
  GroupInfoResponse,
} from "../network/services/groupsService";
import { useFormHook } from "../hooks/useFormHook";

export default function RatePage() {
  const { groupid, email } = useParams();
  const userInfo = useUserInfo();
  const displayContent = useRequireAuthenticated();
  const [selectedStudent, setSelectedStudent] = useState<UserInfo>();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [groupInfo, setGroupInfo] = useState<GroupInfoResponse>();
  const navigate = useNavigate();
  const [useFormData, Provider] = useFormHook({ values: defaultNewRatingForm });
  const { watch,setValue, getValues } = useFormData;
  console.log(watch());
  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  // Load in initial list of students from MongoDB
  useEffect(() => {
    GetGroupInfo(groupid || "").then(setGroupInfo);
    setValue("ratedstudent", email||"")
    setValue("groupid", groupid || "")
  }, []);

  useEffect(() => {
    // Update selectedStudent to the first student in the list once students data is available
    if (groupInfo && groupInfo.students.length > 0 && userInfo !== undefined) {
      const filteredStudents = groupInfo.students.filter(
        (student) => student.email == email
      );
      if (filteredStudents.length > 0) {
        setSelectedStudent(filteredStudents[0]);
      }
    }
  }, [userInfo, groupInfo]);

  const confirmSubmit = () => {
    PostCreateNewRating(getValues());
    setShowConfirmation(false); // Close the modal after submission
    navigate(`/groups/${groupid}`);
  };
  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        {userInfo && (
          <div className="rating-form-section bg-gray-100 rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-bold text-primary-red mb-4">
              Rate My Peers - Assessment Form
            </h2>
            <p className="text-gray-600 mb-2">
              Please rate your peers on their cooperation, conceptual
              contributions, practical contributions, and work ethic within the
              group:{" "}
            </p>

            {/* Rating Criteria */}
            <Provider>
              <form className="space-y-4">
                {/* Member Selection */}
                <div className="flex flex-col mb-4">
                  <label className="text-lg font-semibold text-gray-800">
                    Team Member to Review:
                  </label>
                  <p className="font-semibold border border-gray-300 rounded-md p-2">{`${selectedStudent?.firstname} ${selectedStudent?.lastname}`}</p>
                </div>

                <div>
                  <h2 className="text-xl underline font-semibold text-primary-red mb-4">
                    Cooperation
                  </h2>
                  <RatingQuestion idx={0} criterionId="673028064fb721eb5c820410" label="1. Actively participating in meetings:" />
                  <RatingQuestion idx={1} criterionId="67302bc34fb721eb5c820411" label="2. Communicating within the group:" />
                  <RatingQuestion idx={2} criterionId="67302bcc4fb721eb5c820412" label="3. Cooperating within the group:" />
                  <RatingQuestion idx={3} criterionId="67302bd24fb721eb5c820413" label="4. Assisting team-mates when needed:" />
                  <RatingQuestion idx={4} criterionId="67302bd84fb721eb5c820414" label="5. Volunteering for tasks:" />
                  <br></br>
                </div>

                <div>
                  <h2 className="text-xl underline font-semibold text-primary-red mb-4">
                    Conceptual Contribution
                  </h2>
                  <RatingQuestion idx={5} criterionId="67302be74fb721eb5c820416" label="1. Actively participating in meetings:" />
                  <RatingQuestion idx={6} criterionId="67302bf04fb721eb5c820417" label="2. Communicating within the group:" />
                  <RatingQuestion idx={7} criterionId="67302bfa4fb721eb5c820418" label="3. Cooperating within the group:" />
                  <RatingQuestion idx={8} criterionId="67302c114fb721eb5c820419" label="4. Assisting team-mates when needed:" />
                  <RatingQuestion idx={9} criterionId="67302c184fb721eb5c82041a" label="5. Volunteering for tasks:" />
                  <br></br>
                </div>

                <div>
                  <h2 className="text-xl underline font-semibold text-primary-red mb-4">
                    Practical Contribution
                  </h2>
                  <RatingQuestion idx={10} criterionId="67302c1f4fb721eb5c82041b" label="1. Actively participating in meetings:" />
                  <RatingQuestion idx={11} criterionId="67302c244fb721eb5c82041c" label="2. Communicating within the group:" />
                  <RatingQuestion idx={12} criterionId="6730797a10fb266d58f3ebce" label="3. Cooperating within the group:" />
                  <RatingQuestion idx={13} criterionId="67302c334fb721eb5c82041d" label="4. Assisting team-mates when needed:" />
                  <RatingQuestion idx={14} criterionId="67302c704fb721eb5c82041e" label="5. Volunteering for tasks:" />
                  <br></br>
                </div>

                <div>
                  <h2 className="text-xl underline font-semibold text-primary-red mb-4">
                    Work Ethic
                  </h2>
                  <RatingQuestion idx={15} criterionId="67302cbe4fb721eb5c82041f" label="1. Actively participating in meetings:" />
                  <RatingQuestion idx={16} criterionId="67302cc34fb721eb5c820420" label="2. Communicating within the group:" />
                  <RatingQuestion idx={17} criterionId="67302cc84fb721eb5c820421" label="3. Cooperating within the group:" />
                  <RatingQuestion idx={18} criterionId="67302d524fb721eb5c820422" label="4. Assisting team-mates when needed:" />
                  <RatingQuestion idx={19} criterionId="67302d5c4fb721eb5c820423" label="5. Volunteering for tasks:" />
                  <br></br>
                </div>

                <CommentBox />
                {/* Submit Button */}
                <br />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Submit Ratings
                </button>
              </form>
            </Provider>

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
        )}
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
}
