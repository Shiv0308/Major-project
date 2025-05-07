import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { serachFilter, isSearched,setSerachFilter,jobs} = useContext(AppContext);
  const[showFilter,setShowFilter]=useState(false);
  const[currentPage,setCurrentPage]=useState(1);
  const [selectedCategories,setSetectedCategories]=useState([]);
  const[selectedLocations,setSelectedLocations]=useState([]);
  const[filteredJobs,setFilteredJobs]=useState(jobs);
  const handelCategoryChange=(Category)=>{
    setSetectedCategories(prev=>prev.includes(Category)?prev.filter(c=>c!==Category):[...prev,Category])
  }
  const handelLocationsChange=(location)=>{
    setSelectedLocations(prev=>prev.includes(location)?prev.filter(c=>c!==location):[...prev,location])
  }
  useEffect(()=>{
    const matchesCategories=job=>selectedCategories.length==0 || selectedCategories.includes(job.category)
    const matchesLocations=job=>selectedLocations.length==0 || selectedLocations.includes(job.location);
    const matchesTitle=job=>serachFilter.title ===""||job.title.toLowerCase().includes(serachFilter.title.toLowerCase());
    const matchesSearchLocation=  job=>serachFilter.location ===""|| job.location.toLowerCase().includes(serachFilter.location.toLowerCase());
    const newFilteredJobs=jobs.slice().reverse().filter(
      job=>matchesCategories(job)&& matchesLocations(job)&& matchesTitle(job)&&matchesSearchLocation(job)
    );
    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  },[jobs,selectedCategories,selectedLocations,serachFilter])

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Search Filter from Hero Component */}
        {isSearched && (serachFilter.title !== "" || serachFilter.location !== "") && (
          <>
            <h3 className="font-medium text-lg mb-4">Current Search</h3>
            <div className="mb-4 text-gray-600 ">
            {serachFilter.title && <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-20 px-4 py-1.5">{serachFilter.title}
                <img onClick={e=>setSerachFilter(prev=>({...prev,title:""}))} className="cursor-pointer" src={assets.cross_icon} alt="" /></span>}
                
            {serachFilter.location && <span className=" ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-20 px-4 py-1.5">{serachFilter.location} 
                <img  onClick={e=>setSerachFilter(prev=>({...prev,location:""}))} className="cursor-pointer" src={assets.cross_icon} alt="" /></span>}
                </div>
          </>
        )}
        <button onClick={e=>setShowFilter(prev=>!prev)} className="px-6 py-1.5 rounded border border-gray-400 lg:hidden">
            {showFilter?"close":"Filters"}
        </button>
        {/*Category Filter*/}
        <div className={showFilter?"":"max-lg:hidden"}>
            <h4 className="font-medium text-lg py-4">Search By categories</h4>
            <ul className="space-y-4 text-gray-600">
  {JobCategories.map((category, index) => (
    <li  key={index} className="flex items-center gap-3">
      <input
    
        type="checkbox"
       onChange={()=>{handelCategoryChange(category)}}
       checked={selectedCategories.includes(category)}
        value={category}
        className="accent-blue-600"
      />
      <label htmlFor={`category-${index}`} className="text-sm text-gray-700">
        {category}
      </label>
    </li>
  ))}
</ul>

        </div>
        {/*Location Filter*/}
        <div className={showFilter?"":"max-lg:hidden"}>
            <h4 className="font-medium text-lg py-4">Search By Location</h4>
            <ul className="space-y-4 text-gray-600">
  {JobLocations.map((location, index) => (
    <li  key={index} className="flex items-center gap-3">
      <input
    
        type="checkbox"
        onChange={()=>{handelLocationsChange(location)}}
        checked={selectedLocations.includes(location)}
        value={location}
        className="accent-blue-600"
      />
      <label htmlFor={`category-${index}`} className="text-sm text-gray-700">
        {location}
      </label>
    </li>
  ))}
</ul>

        </div>
      </div>
       {/*Job listings*/}
       <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">Latest jobs</h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job,index)=>(<JobCard key={index} job={job}/>))}

        </div>
        {/* Pagination */ }
        {
  jobs.length > 0 && (
    <div className="flex items-center justify-center space-x-2 mt-10">
      <a href="#job-list">
        <img
          src={assets.left_arrow_icon}
          alt="Previous"
          className="cursor-pointer"
          onClick={() =>
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
        />
      </a>

      {
        Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
          <a href="#job-list" key={index}>
            <button
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
            >
              {index + 1}
            </button>
          </a>
        ))
      }

      <a href="#job-list">
        <img
          src={assets.right_arrow_icon}
          alt="Next"
          className="cursor-pointer"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(jobs.length / 6)))
          }
        />
      </a>
    </div>
  )
}

       </section>

    </div>
  );
};

export default JobListing;
