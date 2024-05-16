import React from "react";
import { Input } from "@/components/ui/input";
import pokemonSvg from "../../../assets/15.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import avatar from "../../../assets/avatar.jpg";
import { useAuth } from "@/utils/Auth/AuthContext";
import * as S from "./Navbar.classes.js";
import { useNavbarLogic } from "../Logic/useNavbarLogic";
import verifiedIcon from "../../../assets/hexagon-check.svg";

const NavbarLayout = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { query, setQuery, scrolling, handleSubmit, getDataByQuery } =
    useNavbarLogic();

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
              className={S.navbarSearch}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          {query !== "" &&
          query !== undefined &&
          getDataByQuery.data !== undefined ? (
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
                          setQuery("");
                        }}
                      >
                        <img
                          src={`${import.meta.env.VITE_SUPABASE_BUCKET_URL}${
                            item.img_path
                          }`}
                          alt="product-image"
                          className={S.navbarLogo}
                        />
                        <h3 className={S.navbarSearchSuggestionsTitle}>
                          {item.name}{" "}
                          <img
                            src={verifiedIcon}
                            alt="verified"
                            className="w-4"
                          />
                        </h3>
                      </div>
                      <h3 className={S.navbarSearchSuggestionsPrice}>
                        {item.price} €
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
