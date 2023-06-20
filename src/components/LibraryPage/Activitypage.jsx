import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../store";
import Navbar from "../navbar/Navbar";
import UploadNow from "./Uploadimage";

function Librarypg() {
  const classname1 = useStore((state) => state.className);
  const notify = () => toast("image deleted");
  const seenStatus = useStore((state) => state.seenStatus);
  seenStatus();
  const [userImages, setUserImages] = useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const userID = JSON.parse(localStorage.getItem("userID"));
    async function fetchUserData() {
      const localurl = `http://localhost:3000/pages/data/${userID}`;
      const response = await axios.get(localurl, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUserImages(response.data.allimages);
    }
    fetchUserData();
  }, []);

  const removeLike = (image_id) => {
    const removeIndex = userImages.findIndex((data) => data._id === image_id);
    userImages.splice(removeIndex, 1);
    setUserImages([...userImages]);

    const response = axios
      .delete(`http://localhost:3000/pages/data/${image_id}`)
      .then((response) => {
        console.log(`Deleted post with ID ${image_id}`);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(image_id);
  };

  var classMode = JSON.parse(localStorage.getItem("classMode"));

  return (
    <>
      <div className={classMode}>
        <Navbar />
        <ToastContainer
          position="bottom-left"
          autoClose={100}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={classname1}
        />

        <div className="dark:bg-slate-700 min-h-screen">
          <h1 className="flex justify-center text-lime-500 p-1">
            You have liked following images:
          </h1>
          <div className="md:grid md:grid-cols-3 md:gap-4 flex flex-col gap-2 mx-4">
            {userImages.map((data, ind) => {
              return (
                <div className="relative md:flex flex-row " key={ind}>
                  <div
                    onClick={() => {
                      removeLike(data._id), notify();
                    }}
                    className="z-10 absolute right-0 p-3 m-3 cursor-pointer bg-red-500 text-white flex justify-center items-center h-2 w-2 rounded-full "
                  >
                    X
                  </div>
                  <img
                    src={data.url}
                    className="w-full h-[12rem] object-cover rounded-xl z-0 md:h-full "
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 m-5  ">
        <UploadNow />
      </div>
    </>
  );
}

export default Librarypg;
