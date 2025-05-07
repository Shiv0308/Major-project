 import React, { useEffect, useState } from 'react';
 import PropTypes from 'prop-types';
import { jobsData } from '../assets/assets';

// Create a context for the app state
 
 export const AppContext = React.createContext();   
 export const AppContextProvider = (props) => {
   const[serachFilter,setSerachFilter]=useState({
      title:"",
      location:""
   });
   const [ isSearched ,setIsSearched]=useState(false)
   const [jobs,setJobs]=useState([])
   const [showRecruiterLogin,setShowRecruiterLogin]=useState(false);
   //function to fetch jobs
   const fetchJobs=async()=>{
      setJobs(jobsData)

   }
   useEffect(()=>{
      fetchJobs()
   },[]);

    const values = {
      serachFilter,setSerachFilter,
      isSearched,setIsSearched,
      jobs,setJobs,
      showRecruiterLogin,setShowRecruiterLogin
    }
    return (<AppContext.Provider value={values}>
        {props.children}
    </AppContext.Provider>)
 }
 AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };