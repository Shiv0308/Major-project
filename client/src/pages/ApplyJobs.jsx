
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";

const ApplyJobs = () => {
  const { id } = useParams();
  const [jobData, setJObData] = useState(null);
  const { jobs } = useContext(AppContext);

  useEffect(() => {
    if (jobs.length > 0) {
      const job = jobs.find((job) => job._id === id);
      if (job) {
        setJObData(job);
      }
    }
  }, [id, jobs]);

  return jobData ? (
    <>
      <Navbar />
      <main className="p-4 md:p-6 lg:p-10 max-w-6xl mx-auto">
        {/* Job Header */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-10 flex flex-col sm:flex-row gap-6 lg:items-start">
          {/* Company Logo */}
          <div className="flex justify-center sm:justify-start">
            <img
              src={assets.company_icon}
              alt="Company"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain"
            />
          </div>

          {/* Job Info */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
              {jobData.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
              <div className="flex items-center gap-2">
                <img src={assets.suitcase_icon} className="w-5 h-5" />
                <span>{jobData.companyId.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={assets.location_icon} className="w-5 h-5" />
                <span>{jobData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={assets.person_icon} className="w-5 h-5" />
                <span>{jobData.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={assets.money_icon} className="w-5 h-5" />
                <span>CTC: {kconvert.convertTo(jobData.salary)}</span>
              </div>
            </div>

            <p className="text-gray-500 text-sm mt-4">
              Posted {moment(jobData.date).fromNow()}
            </p>
          </div>
        </div>

        {/* Job Description + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Job Description */}
          <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div
              className="prose max-w-none text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: jobData.description }}
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Apply Now
            </button>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 border border-dashed border-gray-300 h-full min-h-[200px] rounded-lg p-4 text-gray-400 text-center">
              <h2 className="font-semibold text-lg mb-4">More jobs from {jobData.companyId.name}</h2>
              {jobs
                .filter((job) => job._id !== jobData._id && job.companyId._id === jobData.companyId._id)
                .slice(0, 4)
                .map((job, index) => (
                  <div key={index} className="mb-4">
                    <JobCard job={job} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJobs;
