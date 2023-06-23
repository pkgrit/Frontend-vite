import axios from "axios";
import { useEffect, useState } from "react";
import * as FormData from "form-data";
import { Buffer } from "buffer";

var userid = JSON.parse(localStorage.getItem("userID"));

function ViewUploads() {
  const imgUrl = [];
  const [name, setImg] = useState();

  const [gotimg, setGotimg] = useState([]);

  const [imagesToPreview, setImagesToPreview] = useState([]);
  useEffect(() => {
    getuploads();
  }, []);

  function getuploads() {
    axios
      .get(`http://localhost:3000/pages/data/upload/${userid}`)
      .then((res) => {
        const file = res.data;
        setImagesToPreview(res.data);
        // // working but gives only url
        // const len = res.data.readuploads.length;
        // setImg(res.data.readuploads.map((d) => d.imageaddress));
      });
  }

  return (
    <>
      {/* {name.map((nameurl) => {
        return ( */}
      <div>
        {/* <div>Image_Location : {nameurl}</div> */}

        {/* <img src={gotimg} alt="upload" /> */}
      </div>
      {/* );
      })} */}
      <div>
        {imagesToPreview ? (
          imagesToPreview.map((image, ind) => {
            return <img key={ind} src={`data:image/jpeg;base64,${image}`} />;
          })
        ) : (
          <>Sorry, no images found</>
        )}
      </div>
    </>
  );
}

export default ViewUploads;
