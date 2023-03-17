import CoursesList from "../components/CoursesList";
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
          "Flexi Learn: La plataforma en línea que te permite aprender de forma
          flexible y personalizada con cursos impartidos por expertos en
          diferentes áreas, desde la comodidad de tu hogar y a tu propio ritmo,
          para que puedas alcanzar tus metas y seguir creciendo personal y
          profesionalmente."
        </p>
      </div>
      <ListOfProducts />
      <CoursesList />
    </div>
  );
}

export default Home;
