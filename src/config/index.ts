import config from "./app";

const checkAuthToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return true;
    }
    return false;
};

export { config, checkAuthToken };
