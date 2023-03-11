import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function SearchCourses(props) {
  //Context States
  const { isInstructor } = useContext(AuthContext);

  const {
    isMyCourses,
    setIsMyCourses,
    setAlltopic,
    checkIsMyCourses,
    setAllStrToSearch,
    topic,
    strToSearch,
  } = props;

  console.log(topic, strToSearch);
  const handleTopicChange = (e) => {
    setAlltopic(e.target.value);
  };
  const handleSearchChange = (e) => {
    setAllStrToSearch(e.target.value);
  };

  const handleCourses = () => {
    setIsMyCourses(!isMyCourses);
    checkIsMyCourses(isMyCourses);
  };

  return (
    <div className="flex">
      {isInstructor && (
        <input
          value={isMyCourses ? "All Courses" : "My Courses"}
          type="button"
          onClick={handleCourses}
          className="px-2 rounded-l bg-white text-slate-700 active:opacity-70 hover:opacity-70"
        />
      )}
      <select
        className="px-2 rounded-l text-slate-700"
        value={topic}
        onChange={handleTopicChange}
      >
        <option value={""}>All categories</option>
        <option value="healthy">Healthy</option>
        <option value="programming">Programming</option>
        <option value="marketing">Marketing</option>
        <option value="psychology">Psychology</option>
      </select>
      <div className="relative w-full">
        <input
          onChange={handleSearchChange}
          value={strToSearch}
          type="search"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="🔍 Search by course, instructor..."
        />
      </div>
    </div>
  );
}

export default SearchCourses;
