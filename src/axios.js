import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5001/fir-1425e/us-central1/api",
  baseURL: "https://us-central1-fir-1425e.cloudfunctions.net/api",
});
export default instance;
