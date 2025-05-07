import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        {/* Reduced logo size */}
        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 max-h-12 object-contain"
        />

        {user ? (
          <div className="flex gap-4 max-sm:text-xs items-center">
            <Link to={"/applications"}>Applied jobs</Link>
            <span className="text-gray-600">hii</span>
            <UserButton afterSignOutUrl="/" />
            <span className="text-gray-600 max-sm:hidden">
              {user.fullName}
            </span>
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={(e) => setShowRecruiterLogin(true)}
              className="text-gray-600"
            >
              Admin login
            </button>
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
