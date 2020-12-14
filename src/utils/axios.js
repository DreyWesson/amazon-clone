import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5001/fir-1425e/us-central1/api",
  baseURL: "https://us-central1-fir-1425e.cloudfunctions.net/api",
});
export const getClientSecret = async (key, fetchParam) => {
  return await instance({
    method: "post",
    // Stripes expect the total in subunit
    url: `/payments/create?total=${fetchParam}`,
  });
};
export default instance;
