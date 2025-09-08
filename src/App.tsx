import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import Home from "./pages/Home";
import ActiveBatch from "./components/ActiveBatch";
import HomeContent from "./components/HomeContent";

function App() {
  const toast = useRef(null);

  return (
    <>
      <Toast ref={toast} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<HomeContent />} /> {/* default */}
          <Route path="active-batch" element={<ActiveBatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
