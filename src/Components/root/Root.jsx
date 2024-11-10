import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Root = () => {
  return (
    <div data-theme="aqua" className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Root;
