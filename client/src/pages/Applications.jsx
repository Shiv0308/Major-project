import { useState } from "react";
import Navbar from "../components/Navbar";
import { assets ,jobsApplied } from "../assets/assets";
import moment from "moment";

const Applications = () => {  
    const [isEdit,setIsEdit]=useState(false)  ;
    const [resume, setResume]=useState(null)    
    return (
        <>
        <Navbar/>
        <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
            <h2 className="text-xl font-semibold">Your Resume</h2>
            <div className="flex gap-2 mb-6 mt-3">
            {
                isEdit?<>
                <label className="flex items-center" htmlFor="resumeUpload">
                    <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">select Resume</p>
                    <input id="resumeUpload" onChange={e=>setResume(e.target.files[0])} accept="application/pdf" type="file" hidden />
                    <img src={assets.profile_upload_icon} alt="" />
                </label>
                <button onClick={e=>setIsEdit(false)} className="bg-green-100 border-green-400 rounded-lg px-4 py-2">save</button>
                
                </>:<div className="flex gap-2">
                    <a  className="bg-blue-100 text-blue-500 px-4 py-2 rounded-lg" href="">
                        Resume
                    </a>
                    <button onClick={()=>setIsEdit(true)} className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2">Edit</button>
                </div>
            }
            </div>
            <h2>Jobs Applied</h2>
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
  <thead className="bg-blue-50 text-blue-800">
    <tr>
      <th className="px-4 py-3 text-left text-sm font-semibold">Company</th>
      <th className="px-4 py-3 text-left text-sm font-semibold">Job Title</th>
      <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
      <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
      <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-100">
    {jobsApplied.map((job, index) => {
      const status = job.status?.toLowerCase().trim(); // normalize status
      const statusColor =
        status === "accepted"
          ? "bg-green-100 text-green-700"
          : status === "rejected"
          ? "bg-red-100 text-red-700"
          : "bg-gray-100 text-gray-700"; // pending/default

      return (
        <tr key={index} className="hover:bg-gray-50 transition duration-150">
          <td className="px-4 py-3 flex items-center gap-3">
            <img src={job.logo} alt="" className="w-10 h-10 object-contain" />
            <span className="font-medium">{job.company}</span>
          </td>
          <td className="px-4 py-3">{job.title}</td>
          <td className="px-4 py-3">{job.location}</td>
          <td className="px-4 py-3">{moment(job.date).format("ll")}</td>
          <td className="px-4 py-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>


        </div>
          
        </>
    );
}   

export default Applications;
