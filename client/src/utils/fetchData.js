import axios from "axios";

export const fetchData = async (method, url, data) => {
  const res = await axios({
    method: method,
    url: `pokemon-marketplace-api.vercel.app${url}`,
    data: data,
  });
  return res.data;
};
