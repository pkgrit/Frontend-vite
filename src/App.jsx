import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Librarypg from "./components/LibraryPage/activitypage";
import Loginpage from "./components/login/login";
import Registerpage from "./components/login/Register.jsx/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="library" element={<Librarypg />} />
        <Route path="login" element={<Loginpage />} />
        <Route path="register" element={<Registerpage />} />
      </Routes>
    </>
  );
}

export default App;
