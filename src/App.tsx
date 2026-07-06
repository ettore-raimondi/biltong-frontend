import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import Home from "./pages/Home";
import BatchView from "./components/BatchView";
import HomeContent from "./components/HomeContent";
import { Help } from "./pages/Help";

function App() {
  const toast = useRef(null);

  return (
    <>
      <Toast ref={toast} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<HomeContent />} /> {/* default */}
          <Route path="view-batch/:batchId" element={<BatchView />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
