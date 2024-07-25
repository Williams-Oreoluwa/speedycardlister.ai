import { useState } from "react";
import axios from "axios";

const useDelete = (url, token) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async (payload) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // "Content-Type": "application/json",
                },
                data: payload,
            });
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, deleteData };
};

export default useDelete;
