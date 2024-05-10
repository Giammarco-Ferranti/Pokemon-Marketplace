import { useAuth } from "@/utils/Auth/AuthContext";
import { fetchData } from "@/utils/fetchData";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegistrationLogic = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();

  const mutationSubmit = useMutation({
    mutationFn: async () => {
      try {
        const payload = {
          username: username,
          email: email,
          password: password,
        };
        const res = await fetchData("post", "/user/signup", payload);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/");
        setToken(res.token);
      } catch (error) {
        console.log(error);
        setToken(null);
        toast(`${error.response.data}`, {
          className: "text-red-200",
        });
      }
    },
  });

  return {
    setEmail,
    setPassword,
    setUsername,
    mutationSubmit,
  };
};
