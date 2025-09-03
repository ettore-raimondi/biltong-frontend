import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import apiClient from "../services/api-service";
import type { LoginPayload } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/Toast";
import { setAuthToken } from "../helpers/auth-helpers";

function Login() {
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: registerUser,
  });

  async function registerUser(user: LoginPayload) {
    try {
      const loginResult = await apiClient.post("/auth/login", user);
      setAuthToken(loginResult.data.token);
      toast.show("success", "Logged In!", "You have successfully logged in.");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch {
      toast.show("error", "Error", "There was an error logging you in.");
    }
  }

  return (
    <>
      <div
        className="flex-center"
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <h1 style={{ marginBottom: 0 }}>Login</h1>
        <FloatLabel>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </FloatLabel>
        <Button
          label="Register"
          onClick={() => loginMutation.mutate({ email, password })}
        />
      </div>
    </>
  );
}

export default Login;
