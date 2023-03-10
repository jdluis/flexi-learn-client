//course, topic, strToSearch

const filterBytopicAndStr = (course, topic, strToSearch) => {
  return (
    course.title.toLowerCase().includes(strToSearch.toLowerCase()) &&
    topic === course.topic
  );
};

const filterTopic= (course, topic, strToSearch) => {

    return (topic === course.topic && strToSearch !== "")
  
};

const filterByStr = (course, topic, strToSearch) => {
  return (
    topic === "" &&
    course.title.toLowerCase().includes(strToSearch.toLowerCase())
  );
};

export { filterBytopicAndStr, filterTopic, filterByStr };
