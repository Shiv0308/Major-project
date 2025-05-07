import { useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getShortName = (name) => {
    const parts = name.split(" ");
    if (parts.length === 1) return name;
    return `${parts[0][0]}. ${parts.slice(1).join(" ")}`;
  };

  const getShortTitle = (title) => {
    return title.length > 15 ? title.substring(0, 15) + "..." : title;
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">View Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">User Name</th>
              <th className="p-3">Job Title</th>
              <th className="p-3">Location</th>
              <th className="p-3">Resume</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={applicant.imgSrc}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline">{applicant.name}</span>
                  <span className="inline sm:hidden">{getShortName(applicant.name)}</span>
                </td>
                <td className="p-3">
                  <span className="hidden sm:inline">{applicant.jobTitle}</span>
                  <span className="inline sm:hidden">{getShortTitle(applicant.jobTitle)}</span>
                </td>
                <td className="p-3">{applicant.location}</td>
                <td className="p-3">
                  <a
                    href={applicant.resumeLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    Resume
                    <img
                      src={assets.resume_download_icon}
                      alt="Download"
                      className="w-4 h-4"
                    />
                  </a>
                </td>
                <td className="p-3">
                  {/* Buttons on medium and up */}
                  <div className="hidden sm:flex gap-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                      Accept
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                      Reject
                    </button>
                  </div>

                  {/* Ellipsis dropdown on small screens */}
                  <div className="relative sm:hidden">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="text-gray-700 text-xl px-2"
                    >
                      ...
                    </button>
                    {openIndex === index && (
                      <div className="absolute z-10 right-0 mt-1 bg-white shadow-lg border rounded w-28">
                        <button
                          onClick={() => console.log("Accepted")}
                          className="w-full px-3 py-1 text-sm hover:bg-green-100"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => console.log("Rejected")}
                          className="w-full px-3 py-1 text-sm hover:bg-red-100"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
