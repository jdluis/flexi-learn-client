import React from "react";

function SearchCourses(props) {
  const { setAlltopic, setAllStrToSearch, topic, strToSearch } = props;

  console.log(topic, strToSearch);
  const handleTopicChange = (e) => {
    setAlltopic(e.target.value);
  };
  const handleSearchChange = (e) => {
    setAllStrToSearch(e.target.value);
  };
  return (
    <div className="flex">
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
