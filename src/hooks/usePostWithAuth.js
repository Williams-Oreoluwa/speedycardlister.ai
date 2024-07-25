import { useState } from "react";
import axios from "axios";

const usePostWithAuth = (url, token) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (postData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(url, postData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Response data:", response.data); // Log response data
            setData(response.data);
        } catch (err) {
            console.error("Error occurred:", err); // Log the error
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, postData };
};

export default usePostWithAuth;
