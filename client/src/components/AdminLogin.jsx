import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const AdminLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
  const{setShowRecruiterLogin}=useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Sign up" && !isTextDataSubmited) {
      setIsTextDataSubmited(true);
      return;
    }
   
    };  
    useEffect(() => {
        document.body.style.overflow = 'hidden';
      
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, []);    

    // Handle form submission logic here
 

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-[90%] max-w-md"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm mb-4">Welcome back! Please sign in to continue.</p>

        {state === "Sign up" && isTextDataSubmited ? (
          <>
            <div className="flex items-center gap-4 my-6">
              <label htmlFor="image" className="cursor-pointer">
                <img
                  className="w-16 h-16 object-cover rounded-full"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="Upload"
                />
              </label>
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
              <p>
                Upload Company <br />
                Logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-3 flex items-center gap-2 rounded-full mt-4">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm w-full"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}
            <div className="border px-4 py-3 flex items-center gap-2 rounded-full mt-4">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm w-full"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                required
              />
            </div>
            <div className="border px-4 py-3 flex items-center gap-2 rounded-full mt-4">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm w-full"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
              />
            </div>

            {state === "Login" && (
              <p className="text-sm text-blue-600 my-4 cursor-pointer">
                Forgot password?
              </p>
            )}
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-2"
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmited
            ? "Create Account"
            : "Next"}
        </button>

        <p className="mt-5 text-center text-sm">
          {state === "Login" ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Sign up")}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </>
          )}
        </p>
        <img onClick={e=>setShowRecruiterLogin(false)} className="absolute top-5 right-5 cursor-pointer" src={assets.cross_icon} alt="" />
      </form>
    </div>
  );
};

export default AdminLogin;
