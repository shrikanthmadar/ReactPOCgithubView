import { useEffect, useState } from "react";
import Header from "./header/header";
import { Outlet, Route, Routes, useParams } from "react-router-dom";

function Home() {
  const { owner, name } = useParams();

  let [title, setTitle] = useState("GitHub Repositories");
  useEffect(() => {
    if (owner && name) {
      setTitle("Repository Details");
    } else {
      setTitle("GitHub Repositories");
    }
  }, [owner, name]);
  return (
    <>
      <div style={{ backgroundColor: "#F6F8FA" }}></div>
      <div style={{ padding: "10px" }}>
        <Header title={title} />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
