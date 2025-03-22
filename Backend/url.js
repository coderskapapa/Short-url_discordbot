const axios = require('axios');

// Function to shorten URL (replace with your backend logic)
async function shortenUrl(url, customShortId) {
    console.log(url);
    try {
        // Prepare the request payload
        const payload = { url };
        if (customShortId) {
            payload.customShortId = customShortId; // Add customShortId to the payload if provided
        }
        console.log(payload);
        // Make a POST request to your backend API
        const response = await axios.post('https://shatty.onrender.com/', payload);
        console.log(response.data);
        // Return the shortened URL
        return response.data.shortUrl; // Assuming your API returns a JSON with a `shortUrl` field
    } catch (error) {
        // Handle errors from the backend API
        if (error.response) {
            // Backend returned an error response (e.g., 400 Bad Request)
            const { status, data } = error.response;
            if (status === 400) {
                return `Error: ${data.message}`; // Assuming your API returns a `message` field for errors
            }
        } else if (error.request) {
            // The request was made but no response was received
            return 'Error: Could not connect to the backend. Please try again later.';
        } else {
            // Something else went wrong
            return 'Error: Something went wrong. Please try again later.';
        }
    }
}

module.exports = {shortenUrl, };
