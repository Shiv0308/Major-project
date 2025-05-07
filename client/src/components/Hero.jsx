import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useContext,useRef } from "react";

const Hero = () => {
    const{setSerachFilter,setIsSearched,serachFilter}=useContext(AppContext);
    const titleRef=useRef(null);
    const locationRef=useRef(null);
    const onSearch=()=>{
        setSerachFilter({title:titleRef.current.value,
            location:locationRef.current.value
        });
        setIsSearched(true)
        console.log(serachFilter);

    }
  return (
    <>
    <div className="py-10 px-4 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Over 1000+ jobs present</h2>
        <p className="text-gray-600 mt-2">
          Your Next Big Career Move Starts Right Here – Explore the opportunities
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <div className="flex items-center border rounded px-3 w-full sm:w-1/3">
          <img src={assets.search_icon} alt="search" className="w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search for jobs"
            className="p-2 rounded outline-none w-full"
            ref={titleRef}
          />
        </div>

        <div className="flex items-center border rounded px-3 w-full sm:w-1/3">
          <img src={assets.location_icon} alt="location" className="w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Location"
            className="p-2 rounded outline-none w-full"
            ref={locationRef}
          />
        </div>

        <button onClick={onSearch} className="bg-blue-600 text-white px-6 py-2 rounded">Search</button>
      </div>
     
    </div>
    <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex justify-center">
  <div className="flex justify-center gap-6 lg:gap-12 flex-wrap items-center">
    <p className="font-medium w-full text-center mb-4 lg:mb-0">Trusted By</p>
    <img src={assets.accenture_logo} alt="accenture" className="h-6 object-contain" />
    <img src={assets.walmart_logo} alt="walmart" className="h-6 object-contain" />
    <img src={assets.microsoft_logo} alt="microsoft" className="h-6 object-contain" />
    <img src={assets.adobe_logo} alt="adobe" className="h-6 object-contain" />
    <img src={assets.amazon_logo} alt="amazon" className="h-6 object-contain" />
    <img src={assets.samsung_logo} alt="samsung" className="h-6 object-contain" />
  </div>
</div>

    </>
  );
};

export default Hero;
