import axios from "./axios";

const csrf = () => axios.get("/auth/csrf")

export default csrf