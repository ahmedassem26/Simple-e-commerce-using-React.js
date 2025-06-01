import { Outlet } from "react-router";

function About() {
  return (
    <>
      <h1 className="flex justify-center m-5 text-5xl">
        Welcome to about page
      </h1>
      <Outlet />
    </>
  );
}

export default About;
