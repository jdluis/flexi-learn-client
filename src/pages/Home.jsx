import CoursesList from "../components/CoursesList";

function Home() {
  return (
    <div className="flex mt-10 gap-10 flex-col justify-center items-center">
      <div className="flex p-4 flex-col gap-5">
        <h1 className="text-center mb-10 text-4xl"><span className="text-shadow-black ">Flexi</span>  <span className="relative text-lime-500 shadow-md top-8">Learn</span></h1>
        <p className="text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          quisquam consequatur illo assumenda consectetur ab harum error,
          blanditiis magnam inventore!
        </p>
      </div>
      <CoursesList />
    </div>
  );
}

export default Home;
