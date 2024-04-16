import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5010/login", {
        email,
        password,
      });
      console.log(res.data);
      localStorage.setItem("token", res.data);
      navigate("/dashboard");
      dispatch({ type: "LOGIN", payload: res.data });
    } catch (error) {
      console.log(error);
      setToken(null);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
