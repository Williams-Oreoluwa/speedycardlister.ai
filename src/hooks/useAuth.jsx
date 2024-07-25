export const useAuth = () => {
    //getting token from local storage
    const user = localStorage.getItem("accessToken");

    const googleUser = localStorage.getItem("googleToken");
    //checking whether token is preset or not
    if (user || googleUser) {
        return true;
    } else {
        return false;
    }
};
