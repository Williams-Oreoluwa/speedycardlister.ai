import { useState } from "react";
import axios from "axios";

const uploadToEbay = async (url, token, postData) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
