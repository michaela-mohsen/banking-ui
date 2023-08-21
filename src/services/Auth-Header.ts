export default function authHeader() {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token, "Access-Control-Allow-Origin": "*" };
    } else {
        return { Authorization: '', "Access-Control-Allow-Origin": "*" };
    }
}