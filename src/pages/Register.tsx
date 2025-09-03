import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import type { RegisterUserPayload } from "../types/auth";
import apiClient from "../services/api-service";
import { useToast } from "../context/Toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: registerUser,
  });

  async function registerUser(user: RegisterUserPayload) {
    try {
      await apiClient.post("/auth/register", user);
      toast.show(
        "success",
        "Registered!",
        "Your account has been created successfully."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      toast.show("error", "Error", "There was an error creating your account.");
    }
  }

  return (
    <>
      <div
        className="flex-center"
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <h1 style={{ marginBottom: 0 }}>Register</h1>
        <FloatLabel>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">Name</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <label htmlFor="surname">Surname</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <FloatLabel>
          <Password
            inputId="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </FloatLabel>
        <Button
          label="Register"
          onClick={() =>
            registerMutation.mutate({ name, surname, email, password })
          }
        />
      </div>
    </>
  );
}

export default Register;
