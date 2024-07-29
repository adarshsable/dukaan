import logo from "@/assests/images/loading.gif";

const LoadingSpinner = ({ text = "" }: { text: string }) => {
  const isText = text?.trim().length > 0;

  /**
   * TSX
   */
  return (
    <div
      className={`${
        !isText ? "w-[4rem]" : "px-4 py-2 text-xl"
      } h-fit bg-white rounded-md shadow-md text-mediumDark border border-extraLightDark`}
    >
      {!isText ? <img src={logo} alt="" /> : text}
    </div>
  );
};

export default LoadingSpinner;
