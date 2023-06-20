import React, { useState } from "react";
import axios from "axios";

function Loginpage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    async function submit() {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          email: email,
          password: password,
        });
        console.log(response);
        if (response.statusText === "Created") {
          console.log(response.data.user._id);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem(
            "userID",
            JSON.stringify(response.data.user._id)
          );
          alert("User loggedin");
        } else {
          alert("User can not loggedin");
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    }
    submit();
  };

  return (
    <>
      <div className=" bg-black text-white h-screen">
        <h1 className="flex justify-center p-2">Login</h1>
        <form onSubmit={handleSubmit} className="flex justify-center pt-10">
          <div className="flex flex-col gap-2 w-60 ">
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

export default Loginpage;
