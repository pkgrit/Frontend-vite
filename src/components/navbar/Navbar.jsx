import React, { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/Lu";
import useStore from "../store";
import axios from "axios";

function Navbar() {
  var classname = useStore((state) => state.className);
  const darkmode = useStore((state) => state.darkmode);

  function saveactivity() {
    var store = null;
    classname === "light" ? (store = "dark") : (store = "light");
    localStorage.setItem("classMode", JSON.stringify(store));
  }

  const setnotification = useStore((state) => state.setnotification);
  const seenCount = useStore((state) => state.countSeen);
  const setSeenCount = useStore((state) => state.setCountSeen);
  const [count, setCount] = useState();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const userID = JSON.parse(localStorage.getItem("userID"));

    async function Notification() {
      const localurl = `http://localhost:3000/pages/data/status/${userID}`;
      const response = await axios.get(localurl, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      let countnum = response.data.count;
      if (countnum > 0) {
        setSeenCount(countnum);
      }
      // console.log(countnum);
      // setCount(countnum);
    }
    Notification();
  }, []);

  useEffect(() => {
    if (seenCount > 0) {
      setnotification("visible");
    } else {
      setnotification("invisible");
    }
  }, [seenCount]);

  var classMode = JSON.parse(localStorage.getItem("classMode"));
  classMode === "dark" ? (classname = "dark") : (classname = "light");

  const notification = useStore((state) => state.notification);
  return (
    <>
      <nav className="w-screen px-10 dark:bg-slate-800 py-5">
        <div className="flex items-center lg:flex-row sm:flex-col  sm:gap-2  sm:justify-between justify-center">
          <div className="sm:flex sm:justify-center">
            <img src="./Pratiklogo.png" alt="logo" className="h-10" />
          </div>

          <div className="sm:flex sm:justify-center flx items-end">
            <ul className="flex gap-20 pl-20 sm:pl-0 dark:text-yellow-50 text-lg ">
              <li className="hover:text-cyan-600 cursor-pointer font-medium">
                <a href="/">Home</a>
              </li>
              <li className="hover:text-cyan-600 cursor-pointer font-medium">
                About
              </li>
              <li className="hover:text-cyan-600 cursor-pointer font-medium">
                <div className="flex">
                  <a href="Library">Library</a>
                  <span
                    className={`ml-1 flex h-3 w-3 pointer-events-none ${notification}`}
                  >
                    <span className="-ml-1 -mt-1 animate-ping absolute inline-flex  h-[30px] w-[30px] rounded-full bg-pink-400 opacity-75 justify-center"></span>
                    <span className=" absolute inline-flex rounded-full  h-[20px] w-[20px] bg-pink-500 justify-center">
                      <div className="flex justify-center">
                        <p className="flex text-sm">{seenCount}</p>
                      </div>
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="sm:flex gap-5 sm:justify-center items-center">
            <a href="/register">
              <button className="rounded-full text-orange-500 border-2 dark:text-white-500 border-orange-500 dark:border-white  w-24 h-9">
                Sign Up
              </button>
            </a>
            <a href="/login">
              <button className="rounded-full bg-orange-500  w-24 h-9 text-white">
                Login
              </button>
            </a>

            <div
              onClick={() => {
                darkmode(), saveactivity();
              }}
            >
              {classname === "dark" ? (
                <LuSun size={"2em"} color="#FFF222" />
              ) : (
                <LuMoon size={"2em"} />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
