import CoursesList from "../components/CoursesList";
import IsStudent from "../components/IsStudent";
import ListOfProducts from "./Payment/ListOfProducts";

function Home() {
  return (
    <div className="flex mt-20 gap-10 flex-col justify-center items-center">
      <div className="flex p-4 flex-col gap-5">
        <h1 className="text-center mb-10 text-4xl">
          <span className="text-shadow-black ">Flexi</span>{" "}
          <span className="relative text-lime-500 shadow-md top-8">Learn</span>
        </h1>
        <p className="text-slate-400">
          "Flexi Learn: The online platform that allows you to learn in a
          flexible and personalized way with courses taught by experts in
          different areas, from the comfort of your home and at your own pace,
          so that you can achieve your goals and continue to grow personally and
          professionally."
        </p>
      </div>
      <IsStudent>
        <ListOfProducts />
      </IsStudent>
      <CoursesList />
    </div>
  );
}

export default Home;
