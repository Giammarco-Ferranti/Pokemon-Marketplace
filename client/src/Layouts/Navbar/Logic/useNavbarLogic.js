import { fetchData } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useNavbarLogic = () => {
  const navigate = useNavigate();
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

  return {
    query,
    setQuery,
    scrolling,
    handleSubmit,
    getDataByQuery,
  };
};
