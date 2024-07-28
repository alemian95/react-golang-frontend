import client from "./axios";

const csrf = () => client.get("auth/csrf")

export default csrf