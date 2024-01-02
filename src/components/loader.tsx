import BackgroundComponent from "./background";
import "./loader-style.css";

const Loader = () => {
  return (
    <>
      <BackgroundComponent />
      <div className="loading flex inset-0 justify-center items-center h-screen w-screen relative z-10 bg-transparent">
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
      </div>
    </>
  );
};

export default Loader;
