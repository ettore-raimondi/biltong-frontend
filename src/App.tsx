import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import Home from "./pages/Home";

function App() {
  const toast = useRef(null);

  return (
    <>
      <Toast ref={toast} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
