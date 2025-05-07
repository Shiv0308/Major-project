import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="shadow py-4 bg-white">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            className="w-12 cursor-pointer"
            src={assets.logo}
            alt="Logo"
          />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden text-gray-700">Welcome, CampusConnect</p>
            <div className="relative group">
              <img
                className="w-8 h-8 border rounded-full object-cover"
                src={assets.company_icon}
                alt="Company"
              />
              <div className="absolute hidden group-hover:block top-10 right-0 z-10 text-black">
                <ul className="bg-white rounded-md border text-sm shadow-md">
                  <li className="py-2 px-4 cursor-pointer hover:bg-gray-100">Log out</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar + Content Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white min-h-screen border-r">
          <ul className="flex flex-col pt-6 text-gray-800">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center p-4 gap-3 hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
            >
              <img className="w-5" src={assets.add_icon} alt="Add Job" />
              <p className="max-sm:hidden">Add Jobs</p>
            </NavLink>

            <NavLink
              to="/dashboard/manage-jobs"
              className={({ isActive }) =>
                `flex items-center p-4 gap-3 hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
            >
              <img className="w-5" src={assets.home_icon} alt="Manage Jobs" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              to="/dashboard/viewapplication"
              className={({ isActive }) =>
                `flex items-center p-4 gap-3 hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
            >
              <img className="w-5" src={assets.person_tick_icon} alt="Applications" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
