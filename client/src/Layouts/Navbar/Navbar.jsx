import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import pokemonSvg from "../../assets/15.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
import { useAuth } from "@/utils/Auth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetchData";
import * as S from "./Navbar.classes.js";

const NavbarLayout = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [query, setQuery] = useState();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query === undefined || query === "") {
      navigate(`explore/all`);
    } else {
      navigate(`/explore/${query}`);
      setQuery("");
    }
  };

  const getDataByQuery = useQuery({
    queryKey: ["get-data-by-query", query],
    queryFn: () => {
      if (query !== undefined && query !== "") {
        return fetchData("get", `/product/products/search/?q=${query}`);
      }
    },
    enabled: query !== undefined && query !== "",
  });

  return (
    <nav className={scrolling ? `border-b ${S.navbar}` : S.navbar}>
      <div className={S.navbarContent}>
        <div className={S.navbarLogoAndLinksWrapper}>
          <img
            onClick={() => navigate("/")}
            src={pokemonSvg}
            alt="pokemon-logo"
            className={S.navbarLogo}
          />
          <h3
            onClick={() => navigate("/explore/all")}
            className={S.navbarLinks}
          >
            Explore
          </h3>
          <h3 onClick={() => navigate("/users")} className={S.navbarLinks}>
            Users
          </h3>
        </div>
        <div className={S.navbarSearchAndButtonWrapper}>
          <form className="" onSubmit={(e) => handleSubmit(e)}>
            <Input
              type={"text"}
              placeholder="Search Cards"
              className=""
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          {query !== "" && getDataByQuery.data !== undefined ? (
            <div className={S.navbarSearchSuggestionsWrapper}>
              {getDataByQuery.data.length > 0 ? (
                getDataByQuery.data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={S.navbarSearchSuggestionsContent}
                    >
                      <div
                        className={S.navbarSearchSuggestionsLogoHolder}
                        onClick={() => {
                          navigate(`/product/${item.id}`);
                        }}
                      >
                        <img
                          alt="product-image"
                          src={`http://localhost:5010/${item.img_path}`}
                          className={S.navbarLogo}
                        />
                        <h3 className={S.navbarSearchSuggestionsText}>
                          {item.name}
                        </h3>
                      </div>
                      <h3 className={S.navbarSearchSuggestionsText}>
                        {item.price}
                      </h3>
                    </div>
                  );
                })
              ) : (
                <h1>No Products</h1>
              )}
            </div>
          ) : null}

          {token ? (
            <Button
              onClick={() => navigate("/profile")}
              className={S.navbarAvatar}
            >
              <img
                src={avatar}
                alt="avatar-img"
                className={`${S.navbarLogo} rounded-full`}
              />
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarLayout;
