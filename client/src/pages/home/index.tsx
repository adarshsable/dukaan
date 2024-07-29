import { pageData } from "@/data/Home";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  /**
   * TSX
   */
  return (
    <div className="w-[97%] mx-auto flex gap-10 text-mediumDark mt-10">
      {pageData.map((item) => (
        <div
          key={item.label}
          onClick={() => navigate(item.link)}
          className="flex flex-col bg-white shadow-md px-6 py-8 gap-4 w-[25rem] rounded-md hover:scale-[1.05] cursor-pointer ease-in-out duration-200"
        >
          <div className="text-blue-500 text-2xl">{item.label}</div>
          <div className="text-xl">{item.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default Home;
