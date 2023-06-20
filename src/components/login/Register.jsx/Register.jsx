import React, { useState } from "react";
import axios from "axios";

function Registerpage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    async function submit() {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/register",
          {
            email: email,
            password: password,
            name: name,
          }
        );
        console.log(response);
        if (response.statusText === "Created") {
          // console.log(response.data.user._id);
          notify();
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem(
            "userID",
            JSON.stringify(response.data.user._id)
          );
          alert("User Registered");
        } else {
          alert("User can not Registered");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    submit();
  };

  return (
    <>
      <div className=" text-white bg-slate-900 h-screen">
        <h1 className="flex justify-center p-2">Lets SignUp</h1>
        <form onSubmit={handleSubmit} className="flex justify-center pt-10">
          <div className="flex flex-col gap-2 w-60 ">
            <label> Full Nameame</label>
            <input
              type="text"
              name="name"
              className="text-black"
              placeholder=" Name"
              onChange={(e) => setName(e.target.value)}
            />
            <label> Username</label>
            <input
              type="text"
              name="email"
              className="text-black"
              placeholder=" Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              className="text-black"
              placeholder=" Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center pt-10">
              <div className=" w-20 bg-cyan-500 rounded-full flex justify-center">
                <input type="submit" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Registerpage;
