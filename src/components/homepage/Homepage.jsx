import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import useStore from "../store";
import { BsSearch } from "react-icons/Bs";
import Cards from "./Cards";

const baseURL = "https://api.quotable.io/quotes/random?maxLength=50";

function Homepage() {
  const classname = useStore((state) => state.className);
  const [quotes, setQuotes] = useState();
  const [author, setAuthor] = useState();

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setQuotes(response.data[0].content);
      setAuthor(response.data[0].author);
    });
  }, []);

  const [classMode1, setMode] = useState();

  useEffect(() => {
    var classMode = JSON.parse(localStorage.getItem("classMode"));
    if (classMode) {
      setMode(classMode);
    }
  }, [classname]);

  const searchnow = useStore((state) => state.searchnow);
  const [search1, setSearch1] = useState();
  const search = (event) => {
    event.preventDefault();
    searchnow(search1);
  };
  return (
    <>
      <main className={classMode1}>
        <div className=" dark:bg-slate-900 dark:h-screen">
          <Navbar />

          <div className="dark:text-yellow-50 pt-5">
            <div className="flex gap-3 dark:text-cyan-500 text-orange-400">
              <h1> " {quotes} "</h1>
              <h3 className="flex flex-row items-end text-amber-600 dark:text-sky-600">
                -- {author}
              </h3>
            </div>
            <div>
              <form onSubmit={search}>
                <div className=" ">
                  <div className=" p-3 relative mb-4 flex w-full flex-wrap items-stretch gap-2">
                    <input
                      type="search"
                      name="seachbar"
                      className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent  px-3 py-[0.25rem]   dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200  "
                      placeholder="Search: Anything"
                      onChange={(e) => setSearch1(e.target.value)}
                    />
                    <button className="">
                      <BsSearch size="1.7em" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Cards />
        </div>
      </main>
    </>
  );
}
export default Homepage;
