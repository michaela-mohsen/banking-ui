import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8006/api",
    headers: {
        "Content-type": "application/json"
    }
});