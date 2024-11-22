import { GetDetailedCourseInfo } from "../network/services/courseService";

export function DownloadCSVButton({ courseid }: { courseid: string }) {
  const downloadCSV = async () => {
    // Show the pop-up alert before starting the download
    alert('The download is starting...');

    // Fetch the data
    const data = await GetDetailedCourseInfo(courseid);
    const rows = data.teams.flatMap((team) =>
      team.students.map((student) => ({
        username: student.username,
        firstname: student.firstname,
        lastname: student.lastname,
        teamname: team.teamname,
        cooperation: student.ratedby.reduce((sum, review) => sum + review.ratings.cooperation, 0) / student.ratedby.length || "NA",
        conceptual: student.ratedby.reduce((sum, review) => sum + review.ratings.conceptual, 0) / student.ratedby.length || "NA",
        practical: student.ratedby.reduce((sum, review) => sum + review.ratings.practical, 0) / student.ratedby.length || "NA",
        workethic: student.ratedby.reduce((sum, review) => sum + review.ratings.workethic, 0) / student.ratedby.length || "NA",
        peerCount: student.ratedby.length,
        average: student.averagerating || "NA",
      }))
    );

    // Prepare CSV data
    const csv = [
      ["Username", "First Name", "Last Name", "Team", "Cooperation", "Conceptual", "Practical", "Work Ethic", "Peers", "Average"],
      ...rows.map(Object.values),
    ]
      .map((row) => row.join(","))
      .join("\n");

    // Create a Blob from CSV data
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Trigger file download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${courseid}_course_reviews.csv`;
    a.click();

    // Revoke the URL
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6"> {/* Added margin-top for spacing between table and button */}
    <button 
      onClick={downloadCSV} 
      className="bg-[#9B394B] text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
    >
      Download CSV
    </button>
  </div>
  );
}
