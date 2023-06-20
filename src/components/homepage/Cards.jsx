import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcNext } from "react-icons/FC";
import { AiTwotoneHeart } from "react-icons/Ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../store";

const ApiKey = "37070742-f2c03651a260c05375e209e64";

function Cards() {
  const classname1 = useStore((state) => state.className);
  const [imgtags, settags] = useState([]);
  const notify = () => toast("image saved");

  const [imgurl, setUrl] = useState([]);

  const search = useStore((state) => state.search);
  const setSeenCount = useStore((state) => state.setCountSeen);

  const [invisible, setInvisible] = useState("invisible");

  useEffect(() => {
    const imageUrl = `https://pixabay.com/api/?key=37070742-f2c03651a260c05375e209e64&q=${search}&image_type=photo `;
    // console.log("call api with keyword:" + search);
    axios.get(imageUrl).then((response) => {
      setInvisible("show");
      for (let i = 0; i < 5; i++) {
        let num = Math.floor(Math.random() * 20);
        var j = num;
        let imageurl = response.data.hits[j].webformatURL;
        let imagetags = response.data.hits[j].tags;
        imgurl[i] = imageurl;
        setUrl([...imgurl]);
        imgtags[i] = imagetags;
        settags([...imgtags]);

        i === 4 ? setInvisible("invisible") : setInvisible("show");
      }
    });
  }, [search]);

  async function SendData(tags, img) {
    await axios
      .post("http://localhost:3000/pages/data", {
        url: img,
        tags: tags,
        userid: JSON.parse(localStorage.getItem("userID")),
        // seen: false,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          setSeenCount();
        }
        toast("image saved");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function refressPage() {
    window.location.reload();
  }

  let circleCommonClasses = "h-2.5 w-2.5  bg-cyan-600 rounded-full";

  return (
    <>
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
      <main>
        <div className=" pb-5">
          <div className={`flex justify-center ${invisible}`}>
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div
              className={`${circleCommonClasses} mr-1 animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
          </div>
        </div>

        <div className="md:flex gap-10 flex-col md:flex-row justify-center ">
          <div className=" duration-500 hover:scale-110">
            <img
              src={imgurl[0]?.previewURL ?? imgurl[0]}
              alt={imgtags[0]}
              className="rounded-lg object-cover md:h-[500px] md:w-[250px] h-50 w-50  "
            />
            <div
              className="relative -mt-10 pl-3 animate-pulse space-x-1"
              // onClick={notify}
            >
              <AiTwotoneHeart
                color="red"
                size={25}
                onClick={() => SendData(imgtags[0], imgurl[0])}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-4  ">
            <div className="duration-500 hover:scale-110">
              <img
                src={imgurl[1]}
                alt="image"
                className="rounded-lg md:w-[620px] md:h-[250px] object-cover h-50 w-50   "
                tags={imgtags[1]}
              />
              <div
                className=" -mt-10 pl-3  animate-pulse space-x-1"
                // onClick={notify}
              >
                <AiTwotoneHeart
                  color="red"
                  size={25}
                  onClick={() => SendData(imgtags[1], imgurl[1])}
                />
              </div>
            </div>

            <div className="md:flex gap-4 pt-6 ">
              <div className="duration-500 hover:scale-110">
                <img
                  src={imgurl[2]}
                  alt="image"
                  className="rounded-lg md:h-[230px] md:w-[302px] object-cover h-50 w-50 "
                  tags={imgtags[2]}
                />
                <div
                  className="relative -mt-10 pl-3 animate-pulse flex space-x-1"
                  // onClick={notify}
                >
                  <AiTwotoneHeart
                    color="red"
                    size={25}
                    onClick={() => SendData(imgtags[2], imgurl[2])}
                  />
                </div>
              </div>
              <div className="duration-500 hover:scale-110 ">
                <img
                  src={imgurl[3]}
                  alt="image"
                  className="rounded-lg md:h-[230px] md:w-[302px] object-cover h-50 w-50"
                  tags={imgtags[3]}
                />
                <div
                  className="relative -mt-10 pl-3  animate-pulse flex space-x-1 "
                  // onClick={notify}
                >
                  <AiTwotoneHeart
                    color="red"
                    size={25}
                    onClick={() => SendData(imgtags[3], imgurl[3])}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="duration-500 hover:scale-110 ">
            <img
              src={imgurl[4]}
              alt="image"
              className="rounded-lg md:h-[500px] md:w-[250px]  object-cover  h-50 w-50"
              tags={imgtags[4]}
            />
            <div
              className="relative -mt-10 pl-3 animate-pulse flex space-x-4"
              // onClick={notify}
            >
              <AiTwotoneHeart
                color="red"
                size={25}
                onClick={() => SendData(imgtags[4], imgurl[4])}
              />
            </div>
          </div>

          <FcNext
            className="self-center -m-10 animate-bounce"
            size={"2em"}
            onClick={refressPage}
          />
        </div>

        <p className="flex justify-center mt-5 dark:text-slate-400">
          Click the Heart icon to save your liked images
        </p>
      </main>
    </>
  );
}

export default Cards;
