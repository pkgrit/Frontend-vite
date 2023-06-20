import { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";

var classMode = JSON.parse(localStorage.getItem("classMode"));
const notify = () => toast("image Uploaded");

function UploadNow() {
  var classMode = JSON.parse(localStorage.getItem("classMode"));

  const [image1, setImage] = useState();
  function handleImage(e) {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  function handleApi() {
    const formData = new FormData();
    formData.append("image", image1);
    axios
      .post("http://localhost:3000/pages/data/upload", formData)
      .then((res) => {
        if (res.status === 200) {
          notify();
        }
        console.log(res);
      });
  }

  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <>
      <div className={classMode}>
        <div className=" hover:scale-110  hover:animate-spin cursor-pointer  hover:text-black h-[60px] w-[60px] rounded-full bg-slate-300 flex justify-center items-center  text-5xl text-green-700 border-2 border-orange-500 border-x-indigo-500 ">
          <div className="mb-2.5" onClick={open}>
            +
          </div>
        </div>

        <div className="dark:text-white text-slate-600">Upload</div>
        <br />
        <div className="flex gap-1 dark:text-white text-slate-600 ">
          or
          <div className="h-[10px] hover:text-yellow-300 cursor-pointer hover:text-xl ">
            View Uploads
          </div>
        </div>

        <Modal
          opened={opened}
          onClose={close}
          title="Select your image"
          overlayProps={{
            color:
              classMode === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[2],
            opacity: 0.55,
            blur: 3,
          }}
        >
          {/* Modal content */}
          <div>
            <input type="file" name=" image" onChange={handleImage} />
            <button
              onClick={() => {
                handleApi(), close();
              }}
              className=" bg-orange-500 p-1 px-4 rounded-lg "
            >
              Upload
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default UploadNow;
