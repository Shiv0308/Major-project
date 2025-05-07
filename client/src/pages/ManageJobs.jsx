import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ManageJobs = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Jobs</h2>
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-all text-sm"
        >
          Add New Job
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Job Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Location</th>
              <th className="p-3">Applications</th>
              <th className="p-3">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{job.title}</td>
                <td className="p-3">{moment(job.date).format("ll")}</td>
                <td className="p-3">{job.location}</td>
                <td className="p-3">{job.applicants}</td>
                <td className="p-3">
                  <input
                    type="checkbox"
                    defaultChecked={job.visible}
                    className="accent-blue-500 w-4 h-4"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageJobs;
