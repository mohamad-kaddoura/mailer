import axios from "axios";
const api_location = `${window.location.origin}`;

const request = async (method,path,body) => {
  const response = await axios({
    method,
    url: `${api_location}/${path}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(body)
  });
  return response.data;
};

export default request;