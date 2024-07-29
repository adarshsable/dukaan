import logo from "@/assests/images/loading.gif";

const FullScreenLoader = () => {
  /**
   * TSX
   */
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <div className="w-[4rem] h-fit bg-white rounded-md shadow-md">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default FullScreenLoader;
