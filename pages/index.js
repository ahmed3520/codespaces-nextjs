import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import ClickCount from "../components/ClickCount";
import styles from "../styles/home.module.css";
import Sidebar from "../components/Sidebar";
function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  );
}

function Home() {
  return <></>;
}

export default Home;
