import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJobs = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Banglore");
  const [category, setCategory] = useState("programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const description = quillRef.current.root.innerHTML;
    console.log({ title, location, category, level, salary, description });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Add a New Job</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            placeholder="e.g., Frontend Developer"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
          <div ref={editorRef} className="bg-white border rounded-md min-h-[150px] p-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              {JobCategories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              {JobLocations.map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select
              onChange={(e) => setLevel(e.target.value)}
              value={level}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="Beginner level">Beginner level</option>
              <option value="Medium level">Medium level</option>
              <option value="Senior level">Senior level</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
          <input
            type="number"
            placeholder="e.g., 50000"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJobs;
