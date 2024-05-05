import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import pokemonSvg from "../assets/15.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import axios from "axios";
import { useAuth } from "@/utils/Auth/AuthContext";

const NavbarLayout = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [query, setQuery] = useState();
  const [queryData, setQueryData] = useState([]);
  console.log(queryData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    navigate(`/explore/${query}`);
    // const res = await axios.get(
    //   `http://localhost:5010/product/products/search/?q=${q}`
    // );
  };

  const getDataByQuery = async (q) => {
    if (q !== undefined && q !== "") {
      const res = await axios.get(
        `http://localhost:5010/product/products/search/?q=${q}`
      );
      setQueryData(res.data);
    }
  };
  useEffect(() => {
    getDataByQuery(query);
  }, [query]);

  return (
    <div className="z-10 flex flex-row justify-center items-center w-full h-fit bg-white border-b  fixed top-0 py-2 px-2 bg-white/40 backdrop-blur-lg">
      <div className="flex flex-row justify-between items-center w-full max-w-screen-xl">
        <div className="flex flex-row gap-4 items-center justify-center cursor-pointer font-medium text-sm">
          <img
            onClick={() => navigate("/")}
            src={pokemonSvg}
            alt="pokemon-logo"
            className="w-10"
          />
          <h3
            onClick={() => navigate("/explore/all")}
            className="hover:opacity-50 transition-all"
          >
            Explore
          </h3>
          <h3
            onClick={() => navigate("/users")}
            className="hover:opacity-50 transition-all"
          >
            Users
          </h3>
        </div>
        <div className="flex flex-row gap-5 items-center relative">
          <form className="" onSubmit={(e) => handleSubmit(e)}>
            <Input
              type={"text"}
              placeholder="Search Cards"
              className="bg-white border-gray-200 border"
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          {queryData.length != 0 && query !== "" ? (
            <div className="absolute top-14 left-0 border w-full h-fit bg-white  shadow-md rounded-lg p-5 flex flex-col gap-4">
              {queryData.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-row w-full justify-between items-center"
                  >
                    <div
                      className="flex flex-row gap-2 items-center"
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                      }}
                    >
                      <img
                        alt="product-image"
                        src={`http://localhost:5010/${item.img_path}`}
                        className="w-10"
                      />
                      <h3 className="truncate">{item.name}</h3>
                    </div>
                    <h3 className="truncate">{item.price}</h3>
                  </div>
                );
              })}
            </div>
          ) : null}

          {token ? (
            <Button
              onClick={() => navigate("/profile")}
              className="text-current bg-transparent hover:bg-gray-100 rounded-2xl p-2"
            >
              <img
                src={avatar}
                alt="avatar-img"
                className="w-10 rounded-full"
              />
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
          {/* {token ? (
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default NavbarLayout;
