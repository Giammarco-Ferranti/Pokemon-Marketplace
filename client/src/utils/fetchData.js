import axios from "axios";

export const fetchData = async (method, url, data) => {
  const res = await axios({
    method: method,
    url: `${import.meta.env.VITE_BASE_URL}${url}`,
    data: data,
  });
  return res.data;
};
