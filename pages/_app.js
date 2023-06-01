import "../global.css";
import Sidebar from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import App from "next/app";
import { useState } from "react";

function MyApp({ Component, pageProps, data }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  console.log("data=>", data);
  return (
    <div className="main-app-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="sidebar-comp">
        <Sidebar
          data={data.response}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/get-items/1`
  );
  const data = await res.json();
  return { ...appProps, data };
};

export default MyApp;
