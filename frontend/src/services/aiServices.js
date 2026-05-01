const API_BASE_URL = "http://localhost:5000";

export const generatePost = async (data) => {
    const res = await fetch(`${API_BASE_URL}/generate-post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
};